import Typography from '@mui/material/Typography';

interface TitleProps {
  label: string;
}

export const Title = ({ label }: TitleProps) => {
  return (
    <Typography
      component="h2"
      variant="h4"
      sx={{
        textAlign: 'center',
        py: 4,
        px: 1,
        fontSize: {
          xs: 'h6.fontSize',
          sm: 'h4.fontSize',
        },
      }}
    >
      {label}
    </Typography>
  );
};
