import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { EXERCISE_NAMES } from '../../shared/exercises';
import type { SyntheticEvent } from 'react';

interface AutocompleteDialogProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  value: string;
  handleExerciseNameInput: (_e: SyntheticEvent, value: string) => void;
  handleExerciseName: (_e: SyntheticEvent, value: string | null) => void;
  confirmDisabled: boolean;
}

const AutocompleteDialog = ({
  title,
  open,
  onCancel,
  onConfirm,
  value,
  handleExerciseNameInput,
  handleExerciseName,
  confirmDisabled,
}: AutocompleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box p={2} width={300}>
          <Autocomplete
            value={value}
            freeSolo
            options={EXERCISE_NAMES}
            onInputChange={handleExerciseNameInput}
            onChange={handleExerciseName}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={confirmDisabled || !value.trim()}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AutocompleteDialog;
