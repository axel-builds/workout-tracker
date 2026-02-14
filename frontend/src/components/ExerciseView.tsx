import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import type { SetEntry, EditableSetEntry } from '../types';
import { useMemo, useState, type ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { updateSet } from '../store/slices/setsSlice';
import { nanoid } from '@reduxjs/toolkit';
import {
  addSetToExercise,
  removeSetFromExercise,
} from '../store/thunks/exerciseThunk';
import { makeSelectSets } from '../store/selectors';
import {
  editExerciseCatalogId,
  updateNoteForExercise,
} from '../store/slices/exercisesSlice';
import { getExerciseIdByName, getExerciseNameById } from '../shared/exercises';
import DeleteDialog from './Dialogs/DeleteDialog';
import SecondaryButton from './Buttons/SecondaryButton';
import SetDialog from './Dialogs/SetDialog';
import EditButton from './Buttons/EditButton';
import AutocompleteDialog from './Dialogs/AutocompleteDialog';
import useAutocompleteDialog from '../hooks/useAutocompleteDialog';
import SetsView from './SetsView';
import TextFieldDialog from './Dialogs/TextFieldDialog';
import useTextFieldDialog from '../hooks/useTextFieldDialog';
import { NOTE_LIMIT } from '../shared/limits';
import { deleteExerciseFromWorkout } from '../store/thunks/workoutThunk';
import EditAndDeleteButtons from './Buttons/EditAndDeleteButtons';

interface ExerciseViewProps {
  workoutId: string;
  exerciseId: string;
}

const ExerciseView = ({ workoutId, exerciseId }: ExerciseViewProps) => {
  const dispatch = useAppDispatch();
  const exercise = useAppSelector((store) => store.exercises.byId[exerciseId]);
  const exerciseName =
    getExerciseNameById(exercise.exerciseCatalogId) ||
    exercise.exerciseCatalogId;
  const setIds = useAppSelector(
    (store) => store.exercises.byId[exerciseId].setIds
  );
  const selectSets = useMemo(() => makeSelectSets(setIds), [setIds]);
  const sets = useAppSelector(selectSets);

  const {
    isOpen: noteDialogIsOpen,
    value: editingNote,
    handleChange: handleNoteChange,
    open: openNoteDialog,
    close: closeNoteDialog,
  } = useTextFieldDialog();

  const {
    isOpen: exerciseDialogIsOpen,
    openDialog: openExerciseDialog,
    close: closeExerciseDialog,
    value: exerciseDialogValue,
    handleInputChange: handleExerciseInputChange,
    handleValueChange: handleExerciseChange,
  } = useAutocompleteDialog();

  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const [editingSetValue, setEditingSetValue] = useState<EditableSetEntry>({
    id: null,
    weight: '0',
    reps: '0',
  });

  const [setIdToDelete, setSetIdToDelete] = useState<string | null>(null);
  const [deleteExerciseDialogIsOpen, setDeleteExerciseDialogIsOpen] =
    useState(false);

  const handleDeleteSetClick = (id: string | null) => {
    setSetIdToDelete(id);
  };

  const deleteDialogClose = () => {
    setSetIdToDelete(null);
  };

  const handleDeleteSetConfirm = () => {
    if (!setIdToDelete) return;
    dispatch(removeSetFromExercise(exerciseId, setIdToDelete));
    deleteDialogClose();
  };

  const openSetEditing = () => {
    setIsEditingOpen(true);
  };

  const closeSetEditing = () => {
    setIsEditingOpen(false);
  };

  const handleEditSet = (set: SetEntry) => {
    const { id, weight, reps } = set;
    setEditingSetValue({ id, weight: String(weight), reps: String(reps) });
    openSetEditing();
  };

  const handleAddNewSet = () => {
    const lastSet = sets.at(-1);
    if (!lastSet) {
      setEditingSetValue({ id: null, weight: '', reps: '' });
    } else {
      const { weight, reps } = lastSet;
      setEditingSetValue({
        id: null,
        weight: String(weight),
        reps: String(reps),
      });
    }
    openSetEditing();
  };

  const handleSetConfirm = () => {
    const id = editingSetValue.id;
    const weight = Number(editingSetValue.weight) || 0;
    const reps = Number(editingSetValue.reps) || 0;
    if (id) {
      const updatedSet: SetEntry = { id, weight, reps };
      dispatch(updateSet(updatedSet));
    } else {
      const newSet: SetEntry = { id: nanoid(), weight, reps };
      dispatch(addSetToExercise(exerciseId, newSet));
    }
    closeSetEditing();
  };

  const handleEditExerciseName = () => {
    openExerciseDialog(exerciseName);
  };

  const handleDeleteExercise = () => {
    setDeleteExerciseDialogIsOpen(true);
  };

  const closeDeleteExerciseDialog = () => {
    setDeleteExerciseDialogIsOpen(false);
  };

  const handleConfirmDeleteExercise = () => {
    dispatch(deleteExerciseFromWorkout(workoutId, exerciseId));
  };

  const handleConfirmExerciseNameChange = () => {
    if (!exerciseDialogValue) return;

    const newExerciseCatalogId =
      getExerciseIdByName(exerciseDialogValue) || exerciseDialogValue;
    dispatch(
      editExerciseCatalogId({
        exerciseId,
        exerciseCatalogId: newExerciseCatalogId,
      })
    );
    closeExerciseDialog();
  };

  const handleAddNote = () => {
    openNoteDialog(exercise.note);
  };

  const handleConfirmUpdateNote = () => {
    dispatch(updateNoteForExercise({ exerciseId, note: editingNote }));
    closeNoteDialog();
  };

  const handleSetEdit = (value: string, target: keyof EditableSetEntry) => {
    const numberedVal = Number(value);
    if (isNaN(numberedVal)) return;

    setEditingSetValue((prev) => ({ ...prev, [target]: value }));
  };

  const handleWeightEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!/^\d{0,5}\.?\d{0,2}$/.test(newValue)) return;

    handleSetEdit(e.target.value, 'weight');
  };

  const handleRepsEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!/^\d{0,5}$/.test(newValue)) return;

    handleSetEdit(newValue, 'reps');
  };

  return (
    <Box py={1}>
      <Box display="flex" alignItems="center">
        <Typography mr={2}>{exerciseName}</Typography>
        <EditAndDeleteButtons
          onEdit={handleEditExerciseName}
          onDelete={handleDeleteExercise}
        />
      </Box>

      <Box display="flex" alignItems="center">
        <Typography
          sx={{
            wordWrap: 'break-word',
            color: 'text.secondary',
          }}
        >
          {exercise.note}
        </Typography>
        {!exercise.note && (
          <SecondaryButton onClick={handleAddNote}>
            {exercise.note ? 'Update note' : 'Add note'}
          </SecondaryButton>
        )}
        {exercise.note && <EditButton onClick={handleAddNote} />}
      </Box>

      <SetsView
        sets={sets}
        onEdit={handleEditSet}
        onDelete={handleDeleteSetClick}
      />
      <Button
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={handleAddNewSet}
        sx={{ mt: 1 }}
      >
        Add Set
      </Button>

      <AutocompleteDialog
        title="Edit Exercise"
        open={exerciseDialogIsOpen}
        onCancel={closeExerciseDialog}
        onConfirm={handleConfirmExerciseNameChange}
        value={exerciseDialogValue}
        confirmDisabled={!exerciseDialogValue}
        handleExerciseName={handleExerciseChange}
        handleExerciseNameInput={handleExerciseInputChange}
      />
      <TextFieldDialog
        title="Note"
        label="Note"
        open={noteDialogIsOpen}
        onCancel={closeNoteDialog}
        onConfirm={handleConfirmUpdateNote}
        name={editingNote}
        onTextFieldChange={handleNoteChange}
        formId="note-form"
        maxLength={NOTE_LIMIT}
        allowEmpty
        multiline
      />
      <SetDialog
        open={isEditingOpen}
        onConfirm={handleSetConfirm}
        onCancel={closeSetEditing}
        onWeightChange={handleWeightEdit}
        onRepsChange={handleRepsEdit}
        set={editingSetValue}
      />
      <DeleteDialog
        open={!!setIdToDelete}
        onClose={deleteDialogClose}
        title="Delete set?"
        onCancel={deleteDialogClose}
        onDelete={handleDeleteSetConfirm}
      />
      <DeleteDialog
        open={deleteExerciseDialogIsOpen}
        onClose={closeDeleteExerciseDialog}
        title={`Delete ${exerciseName}?`}
        onCancel={closeDeleteExerciseDialog}
        onDelete={handleConfirmDeleteExercise}
      />
    </Box>
  );
};

export default ExerciseView;
