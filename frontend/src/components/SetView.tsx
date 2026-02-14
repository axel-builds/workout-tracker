import { Box, Typography, TableCell } from '@mui/material';
import type { SetEntry } from '../types';
import EditAndDeleteButtons from './Buttons/EditAndDeleteButtons';

interface SetViewProps {
  set: SetEntry;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

const SetView = ({ set, onEdit, onDelete }: SetViewProps) => {
  const { weight, reps } = set;

  return (
    <>
      <TableCell align="right">
        <Typography>{weight}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{reps}</Typography>
      </TableCell>
      <TableCell>
        <Box display="flex" justifyContent="end">
          <EditAndDeleteButtons onEdit={onEdit} onDelete={onDelete} />
        </Box>
      </TableCell>
    </>
  );
};

export default SetView;
