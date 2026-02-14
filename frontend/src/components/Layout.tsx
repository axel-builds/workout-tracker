import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <Box>
      <NavBar />
      <main>
        <Box px={1} pt={2}>
          <Outlet />
        </Box>
      </main>
    </Box>
  );
};

export default Layout;
