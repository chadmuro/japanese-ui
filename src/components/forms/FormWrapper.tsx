import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(0, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

interface FormWrapperProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export const FormWrapper = ({ children, onSubmit }: FormWrapperProps) => {
  const classes = useStyles();

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      {children}
    </form>
  );
};
