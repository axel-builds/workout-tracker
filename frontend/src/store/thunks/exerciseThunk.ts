import type { SetEntry } from '../../types';
import {
  addSetIdToExercise,
  deleteAllSetIdsFromExercise,
  deleteSetIdFromExercise,
} from '../slices/exercisesSlice';
import { addSet, deleteSet, deleteSets } from '../slices/setsSlice';
import type { AppThunk } from '../store';

export const addSetToExercise =
  (exerciseId: string, setInstance: SetEntry): AppThunk =>
  (dispatch) => {
    dispatch(addSet(setInstance));
    dispatch(addSetIdToExercise({ exerciseId, setId: setInstance.id }));
  };

export const removeSetFromExercise =
  (exerciseId: string, setId: string): AppThunk =>
  (dispatch) => {
    dispatch(deleteSet(setId));
    dispatch(deleteSetIdFromExercise({ exerciseId, setId }));
  };

export const removeAllSetsFromExercise =
  (exerciseId: string): AppThunk =>
  (dispatch, getState) => {
    const setIds = getState().exercises.byId[exerciseId].setIds;
    dispatch(deleteSets(setIds));
    dispatch(deleteAllSetIdsFromExercise({ exerciseId }));
  };
