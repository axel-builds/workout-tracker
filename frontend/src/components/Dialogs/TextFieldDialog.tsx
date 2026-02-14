import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import type { ChangeEvent, FormEvent } from 'react';

interface TextFieldDialogProps {
  title: string;
  label: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  name: string;
  onTextFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formId: string;
  maxLength?: number;
  allowEmpty?: boolean;
  multiline?: boolean;
}

const TextFieldDialog = ({
  title,
  label,
  open,
  onCancel,
  onConfirm,
  name,
  onTextFieldChange: onNameChange,
  formId,
  maxLength,
  allowEmpty = false,
  multiline = false,
}: TextFieldDialogProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={onCancel} disableRestoreFocus>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form id={formId} onSubmit={handleSubmit}>
          <Box p={2}>
            <TextField
              autoFocus
              label={label}
              value={name}
              onChange={onNameChange}
              multiline={multiline}
              slotProps={{
                htmlInput: { ...(!!maxLength && { maxLength }) },
              }}
            />
            {!!maxLength && (
              <Box>
                <Typography variant="caption" color="textSecondary">
                  {name.length} / {maxLength} characters
                </Typography>
              </Box>
            )}
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          type="submit"
          form={formId}
          variant="contained"
          disabled={allowEmpty ? false : !name.trim()}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextFieldDialog;
