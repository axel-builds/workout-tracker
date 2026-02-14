import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const HomePage = () => {
  return (
    <Box>
      <PageTitle title="Welcome to Gym Tracker" />
      <Typography variant="body1" pb={2}>
        Head to workouts to start tracking:
      </Typography>
      <Button component={Link} to="/workouts" variant="contained">
        Go to Workouts
      </Button>
    </Box>
  );
};

export default HomePage;
