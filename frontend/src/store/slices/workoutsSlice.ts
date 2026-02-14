import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Workout, WorkoutsState } from '../../types';

const initial: WorkoutsState = {
  byId: {},
  allIds: [],
};

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: initial,
  reducers: {
    addWorkout: (state, action: PayloadAction<Workout>) => {
      const workout = action.payload;
      state.byId[workout.id] = workout;
      state.allIds.push(workout.id);
    },
    deleteWorkout: (state, action: PayloadAction<string>) => {
      const workoutId = action.payload;
      delete state.byId[workoutId];
      state.allIds = state.allIds.filter((id) => id !== workoutId);
    },
    editWorkoutName: (
      state,
      action: PayloadAction<{ workoutId: string; newName: string }>
    ) => {
      const { workoutId, newName } = action.payload;
      state.byId[workoutId].name = newName;
    },
    addExerciseIdToWorkout: (
      state,
      action: PayloadAction<{ workoutId: string; exerciseId: string }>
    ) => {
      const { workoutId, exerciseId } = action.payload;
      state.byId[workoutId].exerciseIds.push(exerciseId);
    },
    removeExerciseIdFromWorkout: (
      state,
      action: PayloadAction<{ workoutId: string; exerciseId: string }>
    ) => {
      const { workoutId, exerciseId } = action.payload;
      state.byId[workoutId].exerciseIds = state.byId[
        workoutId
      ].exerciseIds.filter((id) => id !== exerciseId);
    },
  },
});

export const {
  addWorkout,
  deleteWorkout,
  editWorkoutName,
  addExerciseIdToWorkout,
  removeExerciseIdFromWorkout,
} = workoutsSlice.actions;
export default workoutsSlice.reducer;
