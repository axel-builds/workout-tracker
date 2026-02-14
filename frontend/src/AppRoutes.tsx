import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import Layout from './components/Layout';
import WorkoutsPage from './pages/WorkoutsPage';
import WorkoutPage from './pages/WorkoutPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/workouts" element={<WorkoutsPage />}></Route>
        <Route path="/workouts/:workoutId" element={<WorkoutPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
