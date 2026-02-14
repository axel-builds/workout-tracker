import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { ChangeEvent, FormEvent } from 'react';
import type { EditableSetEntry } from '../../types';
import NumberInputField from '../NumberInputField';

interface SetDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  set: EditableSetEntry;
  onWeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRepsChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SetDialog = ({
  open,
  onConfirm,
  onCancel,
  set,
  onWeightChange,
  onRepsChange,
}: SetDialogProps) => {
  const { id, weight, reps } = set;
  const confirmDisabled = weight === '' || reps == '';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={onCancel} disableRestoreFocus>
      <DialogTitle>{id ? 'Edit Set' : 'Add Set'}</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form id="set-form" onSubmit={handleSubmit}>
          <Box p={2}>
            <NumberInputField
              autoFocus
              label="Weight"
              value={weight}
              onChange={onWeightChange}
            />
          </Box>
          <Box p={2}>
            <NumberInputField
              label="Reps"
              value={reps}
              onChange={onRepsChange}
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          type="submit"
          form="set-form"
          variant="contained"
          disabled={confirmDisabled}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SetDialog;
