export type Workout = {
  id: string;
  name: string;
  exerciseIds: string[];
  date: string;
  timestamp: number;
  weekDay: number;
};

export type WorkoutsState = {
  byId: Record<string, Workout>;
  allIds: string[];
};

export type ExerciseEntry = {
  id: string;
  exerciseCatalogId: string;
  setIds: string[];
  note: string;
};

export type ExercisesState = {
  byId: Record<string, ExerciseEntry>;
  allIds: string[];
};

export type SetEntry = {
  id: string;
  weight: number;
  reps: number;
};

export type SetsState = {
  byId: Record<string, SetEntry>;
  allIds: string[];
};

export type EditableSetEntry = {
  id: string | null;
  weight: string;
  reps: string;
};

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'full_body';

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
};
