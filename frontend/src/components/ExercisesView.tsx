import { Box } from '@mui/material';
import ExerciseView from './ExerciseView';
import { useAppSelector } from '../store/store';

interface ExercisesViewProps {
  workoutId: string;
}

const ExercisesView = ({ workoutId }: ExercisesViewProps) => {
  const exerciseIds = useAppSelector(
    (store) => store.workouts.byId[workoutId].exerciseIds
  );

  return (
    <Box pl={1}>
      {exerciseIds.map((id) => (
        <ExerciseView key={id} workoutId={workoutId} exerciseId={id} />
      ))}
    </Box>
  );
};

export default ExercisesView;
