import type { Exercise } from '../types';

const EXERCISES: Exercise[] = [
  // Chest
  { id: 'bench_press', name: 'Bench Press', muscleGroup: 'chest' },
  {
    id: 'incline_bench_press',
    name: 'Incline Bench Press',
    muscleGroup: 'chest',
  },
  {
    id: 'decline_bench_press',
    name: 'Decline Bench Press',
    muscleGroup: 'chest',
  },
  { id: 'dumbbell_press', name: 'Dumbbell Press', muscleGroup: 'chest' },
  { id: 'chest_fly', name: 'Chest Fly', muscleGroup: 'chest' },
  { id: 'push_up', name: 'Push-up', muscleGroup: 'chest' },

  // Back
  { id: 'deadlift', name: 'Deadlift', muscleGroup: 'back' },
  { id: 'romanian_deadlift', name: 'Romanian Deadlift', muscleGroup: 'back' },
  { id: 'pull_up', name: 'Pull-up', muscleGroup: 'back' },
  { id: 'lat_pulldown', name: 'Lat Pulldown', muscleGroup: 'back' },
  { id: 'barbell_row', name: 'Barbell Row', muscleGroup: 'back' },
  { id: 'seated_row', name: 'Seated Row', muscleGroup: 'back' },
  { id: 'face_pull', name: 'Face Pull', muscleGroup: 'back' },

  // Legs
  { id: 'squat', name: 'Squat', muscleGroup: 'legs' },
  { id: 'front_squat', name: 'Front Squat', muscleGroup: 'legs' },
  { id: 'leg_press', name: 'Leg Press', muscleGroup: 'legs' },
  { id: 'lunge', name: 'Lunge', muscleGroup: 'legs' },
  { id: 'walking_lunge', name: 'Walking Lunge', muscleGroup: 'legs' },
  { id: 'leg_extension', name: 'Leg Extension', muscleGroup: 'legs' },
  { id: 'leg_curl', name: 'Leg Curl', muscleGroup: 'legs' },
  { id: 'calf_raise', name: 'Calf Raise', muscleGroup: 'legs' },

  // Shoulders
  { id: 'overhead_press', name: 'Overhead Press', muscleGroup: 'shoulders' },
  { id: 'arnold_press', name: 'Arnold Press', muscleGroup: 'shoulders' },
  { id: 'lateral_raise', name: 'Lateral Raise', muscleGroup: 'shoulders' },
  { id: 'front_raise', name: 'Front Raise', muscleGroup: 'shoulders' },
  { id: 'rear_delt_raise', name: 'Rear Delt Raise', muscleGroup: 'shoulders' },
  { id: 'upright_row', name: 'Upright Row', muscleGroup: 'shoulders' },
  { id: 'barbell_shrug', name: 'Barbell Shrug', muscleGroup: 'shoulders' },
  { id: 'dumbbell_shrug', name: 'Dumbbell Shrug', muscleGroup: 'shoulders' },
  { id: 'shrug', name: 'Shrug', muscleGroup: 'shoulders' },

  // Arms
  { id: 'bicep_curl', name: 'Bicep Curl', muscleGroup: 'arms' },
  { id: 'hammer_curl', name: 'Hammer Curl', muscleGroup: 'arms' },
  { id: 'preacher_curl', name: 'Preacher Curl', muscleGroup: 'arms' },
  { id: 'tricep_pushdown', name: 'Tricep Pushdown', muscleGroup: 'arms' },
  { id: 'skullcrusher', name: 'Skullcrusher', muscleGroup: 'arms' },
  { id: 'dips', name: 'Dips', muscleGroup: 'arms' },

  // Core
  { id: 'plank', name: 'Plank', muscleGroup: 'core' },
  { id: 'crunch', name: 'Crunch', muscleGroup: 'core' },
  { id: 'hanging_leg_raise', name: 'Hanging Leg Raise', muscleGroup: 'core' },
  { id: 'ab_wheel', name: 'Ab Wheel Rollout', muscleGroup: 'core' },
  { id: 'russian_twist', name: 'Russian Twist', muscleGroup: 'core' },

  // Full body
  { id: 'burpee', name: 'Burpee', muscleGroup: 'full_body' },
  {
    id: 'kettlebell_swing',
    name: 'Kettlebell Swing',
    muscleGroup: 'full_body',
  },
  { id: 'farmer_carry', name: 'Farmer Carry', muscleGroup: 'full_body' },
  { id: 'sled_push', name: 'Sled Push', muscleGroup: 'full_body' },
];

export const EXERCISE_NAMES = EXERCISES.map((e) => e.name);

const exerciseNameById = Object.fromEntries(
  EXERCISES.map((e) => [e.id, e.name])
);

const exerciseIdByName = Object.fromEntries(
  EXERCISES.map((e) => [e.name, e.id])
);

export function getExerciseIdByName(name: string): string | undefined {
  if (Object.prototype.hasOwnProperty.call(exerciseIdByName, name)) {
    return exerciseIdByName[name];
  }
  return undefined;
}

export function getExerciseNameById(id: string): string | undefined {
  if (Object.prototype.hasOwnProperty.call(exerciseNameById, id)) {
    return exerciseNameById[id];
  }
  return undefined;
}
