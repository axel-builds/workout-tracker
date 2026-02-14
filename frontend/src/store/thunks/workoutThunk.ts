import type { ExerciseEntry } from '../../types';
import { addExercise, deleteExercise } from '../slices/exercisesSlice';
import { deleteSet } from '../slices/setsSlice';
import {
  addExerciseIdToWorkout,
  deleteWorkout,
  removeExerciseIdFromWorkout,
} from '../slices/workoutsSlice';
import type { AppThunk } from '../store';
import { removeAllSetsFromExercise } from './exerciseThunk';

export const addExerciseToWorkout =
  (workoutId: string, exercise: ExerciseEntry): AppThunk =>
  (dispatch) => {
    dispatch(addExercise(exercise));
    dispatch(addExerciseIdToWorkout({ workoutId, exerciseId: exercise.id }));
  };

export const deleteExerciseFromWorkout =
  (workoutId: string, exerciseId: string): AppThunk =>
  (dispatch) => {
    dispatch(removeAllSetsFromExercise(exerciseId));
    dispatch(deleteExercise(exerciseId));
    dispatch(removeExerciseIdFromWorkout({ workoutId, exerciseId }));
  };

export const deleteWorkoutFully =
  (workoutId: string): AppThunk =>
  (dispatch, getState) => {
    const workout = getState().workouts.byId[workoutId];
    if (!workout) {
      console.error('Failed to delete workout, not found.');
    }

    workout.exerciseIds.forEach((exId) => {
      const exercise = getState().exercises.byId[exId];
      const setIds = exercise.setIds;
      setIds.forEach((sId) => {
        dispatch(deleteSet(sId));
      });
      dispatch(deleteExercise(exId));
    });

    dispatch(deleteWorkout(workoutId));
  };
