import { Box } from '@mui/material';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

interface EditAndDeleteButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const EditAndDeleteButtons = ({
  onEdit,
  onDelete,
}: EditAndDeleteButtonsProps) => {
  return (
    <Box display="flex" gap={1}>
      <EditButton onClick={onEdit} />
      <DeleteButton onClick={onDelete} />
    </Box>
  );
};

export default EditAndDeleteButtons;
