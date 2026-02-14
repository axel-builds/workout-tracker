import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ExerciseEntry, ExercisesState } from '../../types';

const initial: ExercisesState = {
  byId: {},
  allIds: [],
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: initial,
  reducers: {
    addExercise: (state, action: PayloadAction<ExerciseEntry>) => {
      const exercise = action.payload;
      state.byId[exercise.id] = exercise;
      state.allIds.push(exercise.id);
    },
    deleteExercise: (state, action: PayloadAction<string>) => {
      const exerciseId = action.payload;
      delete state.byId[exerciseId];
      state.allIds = state.allIds.filter((id) => id !== exerciseId);
    },
    addSetIdToExercise: (
      state,
      action: PayloadAction<{ exerciseId: string; setId: string }>
    ) => {
      const { exerciseId, setId } = action.payload;
      state.byId[exerciseId].setIds.push(setId);
    },
    editExerciseCatalogId: (
      state,
      action: PayloadAction<{ exerciseId: string; exerciseCatalogId: string }>
    ) => {
      const { exerciseId, exerciseCatalogId } = action.payload;
      state.byId[exerciseId].exerciseCatalogId = exerciseCatalogId;
    },
    deleteSetIdFromExercise: (
      state,
      action: PayloadAction<{ exerciseId: string; setId: string }>
    ) => {
      const { exerciseId, setId } = action.payload;
      state.byId[exerciseId].setIds = state.byId[exerciseId].setIds.filter(
        (id) => id !== setId
      );
    },
    deleteAllSetIdsFromExercise: (
      state,
      action: PayloadAction<{ exerciseId: string }>
    ) => {
      const { exerciseId } = action.payload;
      state.byId[exerciseId].setIds = [];
    },
    updateNoteForExercise: (
      state,
      action: PayloadAction<{ exerciseId: string; note: string }>
    ) => {
      const { exerciseId, note } = action.payload;
      state.byId[exerciseId].note = note;
    },
  },
});

export const {
  addExercise,
  deleteExercise,
  addSetIdToExercise,
  editExerciseCatalogId,
  deleteSetIdFromExercise,
  deleteAllSetIdsFromExercise,
  updateNoteForExercise,
} = exercisesSlice.actions;
export default exercisesSlice.reducer;
