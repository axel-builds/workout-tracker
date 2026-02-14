import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          <Box
            component="img"
            src="/logo.svg"
            alt="Logo"
            sx={{ width: 48, height: 48 }}
          />
          <Typography variant="h6">Workout Tracker</Typography>
        </Box>

        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/workouts">
          Workouts
        </Button>
        <Button component={Link} to="/signup">
          Sign up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
