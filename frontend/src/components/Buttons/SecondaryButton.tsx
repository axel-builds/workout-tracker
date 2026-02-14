import { Button, type ButtonProps } from '@mui/material';

interface SecondaryButtonProps extends ButtonProps {
  destructive?: boolean;
}

const SecondaryButton = ({
  destructive = false,
  sx,
  ...props
}: SecondaryButtonProps) => {
  return (
    <Button
      {...props}
      sx={{
        color: 'text.secondary',
        '&:hover': {
          color: !destructive ? 'text.primary' : 'error.main',
          backgroundColor: 'action.hover',
        },
        ...sx,
      }}
    />
  );
};

export default SecondaryButton;
