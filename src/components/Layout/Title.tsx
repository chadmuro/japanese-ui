import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    padding: theme.spacing(4, 0),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
}));

interface TitleProps {
  label: string;
}

export const Title = ({ label }: TitleProps) => {
  const classes = useStyles();

  return (
    <Typography component="h2" variant="h4" className={classes.title}>
      {label}
    </Typography>
  );
};
