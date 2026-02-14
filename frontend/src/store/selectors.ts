import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

const selectSetsById = (state: RootState) => state.sets.byId;

export const makeSelectSets = (setIds: string[]) =>
  createSelector([selectSetsById], (byId) => setIds.map((id) => byId[id]));
