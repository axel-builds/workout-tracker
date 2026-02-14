import { IconButton, type IconButtonProps } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DeleteButton = (props: IconButtonProps) => {
  return (
    <IconButton
      edge="end"
      aria-label="delete"
      {...props}
      sx={{ color: 'text.secondary', ...props.sx }}
    >
      <DeleteOutlineIcon />
    </IconButton>
  );
};

export default DeleteButton;
