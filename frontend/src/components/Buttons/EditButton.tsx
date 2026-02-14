import { IconButton, type IconButtonProps } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditButton = (props: IconButtonProps) => {
  return (
    <IconButton
      edge="end"
      aria-label="edit"
      {...props}
      sx={{ color: 'text.secondary', ...props.sx }}
    >
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
