import {
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';
import workoutsReducer from './slices/workoutsSlice';
import exercisesReducer from './slices/exercisesSlice';
import setsReducer from './slices/setsSlice';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    exercises: exercisesReducer,
    sets: setsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
