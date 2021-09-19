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
        px: 0,
        // [theme.breakpoints.down('sm')]: {
        //   fontSize: theme.typography.h6.fontSize,
        // },
      }}
    >
      {label}
    </Typography>
  );
};
