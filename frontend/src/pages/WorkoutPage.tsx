import { Box, Button, Paper, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import type { ExerciseEntry } from '../types';
import ExerciesesView from '../components/ExercisesView';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addExerciseToWorkout } from '../store/thunks/workoutThunk';
import { editWorkoutName } from '../store/slices/workoutsSlice';
import { Link, useParams } from 'react-router-dom';
import { getExerciseIdByName } from '../shared/exercises';
import TextFieldDialog from '../components/Dialogs/TextFieldDialog';
import useTextFieldDialog from '../hooks/useTextFieldDialog';
import AutocompleteDialog from '../components/Dialogs/AutocompleteDialog';
import useAutocompleteDialog from '../hooks/useAutocompleteDialog';
import EditButton from '../components/Buttons/EditButton';
import { WORKOUT_NAME_LIMIT } from '../shared/limits';
import PageTitle from '../components/PageTitle';

const WorkoutPage = () => {
  const { workoutId } = useParams();
  const dispatch = useAppDispatch();
  const {
    isOpen: workoutNameDialogIsOpen,
    value: editingWorkoutName,
    handleChange: handleWorkoutNameChange,
    open: openWorkoutNameDialog,
    close: closeWorkoutNameDialog,
  } = useTextFieldDialog();

  const workout = useAppSelector((store) =>
    workoutId ? store.workouts.byId[workoutId] : undefined
  );
  const workoutName = workout?.name ?? 'Workout';

  const {
    isOpen: exerciseDialogIsOpen,
    openDialog: openExerciseDialog,
    close: closeExerciseDialog,
    value: exerciseDialogValue,
    handleInputChange: handleExerciseInputChange,
    handleValueChange: handleExerciseChange,
  } = useAutocompleteDialog();

  if (!workoutId) {
    return <Typography>No workout ID.</Typography>;
  }

  if (!workout) {
    return (
      <Box pl={2} pt={2}>
        <Typography>Workout not found.</Typography>
        <Button component={Link} to="/workouts">
          Back to workouts
        </Button>
      </Box>
    );
  }

  const handleAddExercise = () => {
    openExerciseDialog('');
  };

  const handleConfirmExercise = () => {
    if (!exerciseDialogValue) return;

    const exerciseCatalogId =
      getExerciseIdByName(exerciseDialogValue) || exerciseDialogValue;
    const newExercise: ExerciseEntry = {
      id: nanoid(),
      exerciseCatalogId,
      setIds: [],
      note: '',
    };
    dispatch(addExerciseToWorkout(workoutId, newExercise));
    closeExerciseDialog();
  };

  const handleEditWorkoutName = () => {
    openWorkoutNameDialog(workoutName);
  };

  const handleWorkoutNameEditConfirm = () => {
    dispatch(editWorkoutName({ workoutId, newName: editingWorkoutName }));
    closeWorkoutNameDialog();
  };

  return (
    <Box>
      <PageTitle title="Workout" />
      <Paper sx={{ width: '100%', px: 2, pt: 2 }}>
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          component={Link}
          to="/workouts"
        >
          back
        </Button>
        <Box display="flex" alignItems="center" mt={2}>
          <Box display="flex" width="100%" alignItems="center">
            <Typography variant="h6" noWrap>
              {workoutName}
            </Typography>
            <Box ml={2}>
              <EditButton onClick={handleEditWorkoutName} />
            </Box>
          </Box>
        </Box>

        <Box>
          <ExerciesesView workoutId={workoutId} />
        </Box>

        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddExercise}
          sx={{ mt: 4, mb: 1 }}
          variant="outlined"
        >
          Add Exercise
        </Button>

        <TextFieldDialog
          title="Edit Workout"
          label="Workout name"
          open={workoutNameDialogIsOpen}
          onCancel={closeWorkoutNameDialog}
          onConfirm={handleWorkoutNameEditConfirm}
          name={editingWorkoutName}
          onTextFieldChange={handleWorkoutNameChange}
          formId="workout-form"
          maxLength={WORKOUT_NAME_LIMIT}
        />

        <AutocompleteDialog
          title="Add Exercise"
          open={exerciseDialogIsOpen}
          onCancel={closeExerciseDialog}
          onConfirm={handleConfirmExercise}
          value={exerciseDialogValue}
          confirmDisabled={!exerciseDialogValue}
          handleExerciseName={handleExerciseChange}
          handleExerciseNameInput={handleExerciseInputChange}
        />
      </Paper>
    </Box>
  );
};

export default WorkoutPage;
