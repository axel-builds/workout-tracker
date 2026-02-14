import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SetEntry, SetsState } from '../../types';

const initial: SetsState = {
  byId: {},
  allIds: [],
};

const setsSlice = createSlice({
  name: 'sets',
  initialState: initial,
  reducers: {
    addSet: (state, action: PayloadAction<SetEntry>) => {
      const set = action.payload;
      state.byId[set.id] = set;
      state.allIds.push(set.id);
    },
    deleteSet: (state, action: PayloadAction<string>) => {
      const setId = action.payload;
      delete state.byId[setId];
      state.allIds = state.allIds.filter((id) => id !== setId);
    },
    deleteSets: (state, action: PayloadAction<string[]>) => {
      const setIds = action.payload;
      setIds.forEach((sId) => {
        delete state.byId[sId];
      });
      state.allIds = state.allIds.filter((id) => !setIds.includes(id));
    },
    updateSet: (state, action: PayloadAction<SetEntry>) => {
      const set = action.payload;
      state.byId[set.id] = set;
    },
  },
});

export const { addSet, deleteSet, deleteSets, updateSet } = setsSlice.actions;
export default setsSlice.reducer;
