import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import SetView from './SetView';
import type { SetEntry } from '../types';

interface SetsViewProps {
  sets: SetEntry[];
  onEdit: (set: SetEntry) => void;
  onDelete: (str: string) => void;
}

const SetsView = ({ sets, onEdit, onDelete }: SetsViewProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Reps</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.map((s, i) => (
            <TableRow key={s.id}>
              <SetView
                key={s.id}
                set={s}
                index={i}
                onEdit={() => onEdit(s)}
                onDelete={() => onDelete(s.id)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SetsView;
