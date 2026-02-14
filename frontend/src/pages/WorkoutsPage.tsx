import { Box, Button, List, Paper } from '@mui/material';
import type { Workout } from '../types';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addWorkout, editWorkoutName } from '../store/slices/workoutsSlice';
import { useMemo, useState } from 'react';

import { truncateString, WORKOUT_NAME_LIMIT } from '../shared/limits';
import { deleteWorkoutFully } from '../store/thunks/workoutThunk';
import DeleteDialog from '../components/Dialogs/DeleteDialog';
import TextFieldDialog from '../components/Dialogs/TextFieldDialog';
import useTextFieldDialog from '../hooks/useTextFieldDialog';
import PageTitle from '../components/PageTitle';
import WorkoutsListItem from '../components/WorkoutsListItem';

const WorkoutsPage = () => {
  const dispatch = useAppDispatch();
  const {
    isOpen: workoutDialogIsOpen,
    value: editingWorkoutName,
    handleChange: handleWorkoutNameChange,
    open: openWorkoutNameDialog,
    close: closeWorkoutNameDialog,
  } = useTextFieldDialog();

  const [editingWorkoutNameId, setEditingWorkoutNameId] = useState('');
  const [isAddingNewWorkout, setIsAddingNewWorkout] = useState(true);

  const [workoutIdToDelete, setWorkoutIdToDelete] = useState<string | null>(
    null
  );
  const [workoutNameToDelete, setWorkoutNameToDelete] = useState('');

  const workoutIds = useAppSelector((state) => state.workouts.allIds);
  const workoutsById = useAppSelector((state) => state.workouts.byId);

  const reversedWorkouts = useMemo(() => {
    const reversedIds = [...workoutIds].reverse();
    return reversedIds.map((id) => workoutsById[id]);
  }, [workoutIds, workoutsById]);

  const addNewWorkout = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const weekDay = now.getDay();
    const truncatedName = truncateString(
      editingWorkoutName,
      WORKOUT_NAME_LIMIT
    );
    const newWorkout: Workout = {
      id: nanoid(),
      name: truncatedName || 'Workout',
      exerciseIds: [],
      date,
      timestamp: now.getTime(),
      weekDay,
    };
    dispatch(addWorkout(newWorkout));
  };

  const updateWorkoutName = () => {
    const truncatedName = truncateString(
      editingWorkoutName,
      WORKOUT_NAME_LIMIT
    );
    dispatch(
      editWorkoutName({
        workoutId: editingWorkoutNameId,
        newName: truncatedName,
      })
    );
  };

  const handleConfirm = () => {
    if (isAddingNewWorkout) {
      addNewWorkout();
    } else {
      updateWorkoutName();
    }
    closeWorkoutNameDialog();
  };

  const setupNameDialog = (name: string, isNewWorkout: boolean) => {
    setIsAddingNewWorkout(isNewWorkout);
    openWorkoutNameDialog(name);
  };

  const handleAddWorkout = () => {
    setupNameDialog('', true);
  };

  const handleEditWorkoutName = (id: string, name: string) => {
    setEditingWorkoutNameId(id);
    setupNameDialog(name, false);
  };

  const handleDelete = (id: string) => {
    setWorkoutIdToDelete(id);
    const name = id ? workoutsById[id].name : '';
    setWorkoutNameToDelete(name);
  };

  const handleCancelDelete = () => {
    setWorkoutIdToDelete(null);
  };

  const handleDeleteWorkout = () => {
    if (!workoutIdToDelete) return;
    dispatch(deleteWorkoutFully(workoutIdToDelete));
    setWorkoutIdToDelete(null);
  };

  return (
    <Box>
      <PageTitle title="Workouts" />
      <Box width="100%" display="flex" justifyContent="center">
        <Paper sx={{ width: '100%' }}>
          <Box pt={2}>
            <Button
              onClick={handleAddWorkout}
              variant="contained"
              sx={{ ml: 2 }}
            >
              Add Workout
            </Button>
            <Box display="flex" flexDirection="column" gap={1} pt={2}>
              <List>
                {reversedWorkouts.map((w) => (
                  <WorkoutsListItem
                    key={w.id}
                    workout={w}
                    onEdit={() => handleEditWorkoutName(w.id, w.name)}
                    onDelete={() => handleDelete(w.id)}
                  />
                ))}
              </List>
            </Box>
          </Box>
        </Paper>
      </Box>
      <TextFieldDialog
        title={`${isAddingNewWorkout ? 'Add' : 'Edit'} Workout`}
        label="Workout name"
        open={workoutDialogIsOpen}
        onCancel={closeWorkoutNameDialog}
        onConfirm={handleConfirm}
        name={editingWorkoutName}
        onTextFieldChange={handleWorkoutNameChange}
        formId="workout-form"
        maxLength={WORKOUT_NAME_LIMIT}
      />
      <DeleteDialog
        open={!!workoutIdToDelete}
        onClose={handleCancelDelete}
        title={`Delete workout: ${workoutNameToDelete}?`}
        onCancel={handleCancelDelete}
        onDelete={handleDeleteWorkout}
      />
    </Box>
  );
};

export default WorkoutsPage;
