import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import EditAndDeleteButtons from './Buttons/EditAndDeleteButtons';
import { DAYS } from '../shared/time';
import type { Workout } from '../types';

interface WorkoutsListItemProps {
  workout: Workout;
  onEdit: () => void;
  onDelete: () => void;
}

const WorkoutsListItem = ({
  workout,
  onEdit,
  onDelete,
}: WorkoutsListItemProps) => {
  const { id, name, date, weekDay } = workout;
  return (
    <ListItem
      secondaryAction={
        <EditAndDeleteButtons onEdit={onEdit} onDelete={onDelete} />
      }
      sx={{ pr: 10 }}
    >
      <ListItemButton component={Link} to={`/workouts/${id}`}>
        <ListItemText
          primary={<Typography noWrap>{name}</Typography>}
          secondary={`${date} ${DAYS[weekDay]}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default WorkoutsListItem;
