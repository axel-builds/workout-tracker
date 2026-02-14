import { Divider, Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <>
      <Typography variant="h6" pb={2}>
        {title}
      </Typography>
      <Divider sx={{ mb: 1 }} />
    </>
  );
};

export default PageTitle;
