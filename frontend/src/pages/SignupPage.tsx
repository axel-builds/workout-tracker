import { Box, keyframes, Typography } from '@mui/material';
import Cone from '../components/Cone';
import PageTitle from '../components/PageTitle';

const radius = 25;
const coneWidth = 2 * radius;
const time = '1s';
const distance = 200;
const coneGap = 10;
const secondConeLeft = distance + coneWidth + coneGap;
const thirdConeLeft = secondConeLeft + coneWidth + coneGap;

const rollCone = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const moveRight = keyframes`
  0% { left: 0px; }
  100% { left: ${distance}px; }
`;

const SignupPage = () => {
  return (
    <Box>
      <PageTitle title="Sign up" />
      <Box position="relative" width="400px" height="150px">
        <Typography variant="h6" position="absolute" top={20} left={20}>
          Under Construction
        </Typography>
        <Box
          position="absolute"
          top={10}
          left={0}
          sx={{
            animation: `${moveRight} ${time} ease-in-out forwards`,
          }}
        >
          <Box
            width={2 * radius}
            height={2 * radius}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: `${rollCone} ${time} ease-in-out forwards`,
              transformOrigin: 'center center',
            }}
          >
            <Cone />
          </Box>
        </Box>
        <Box
          width={2 * radius}
          height={2 * radius}
          position="absolute"
          left={secondConeLeft}
          top={25}
        >
          <Cone />
        </Box>
        <Box
          width={2 * radius}
          height={2 * radius}
          position="absolute"
          left={thirdConeLeft}
          top={10}
        >
          <Cone />
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
