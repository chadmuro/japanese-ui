import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Layout from '../components/Layout/Layout';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  form: {
    padding: theme.spacing(4, 2, 0),
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

const Home = () => {
  const classes = useStyles();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
  };

  return (
    <Layout>
      <Typography component="h2" variant="h4" className={classes.title}>
        Useful Japanese vocabulary and phrases for developers.
      </Typography>
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField fullWidth variant="outlined" label="Japanese" autoFocus />
        <TextField fullWidth variant="outlined" label="Reading" />
        <TextField fullWidth variant="outlined" label="English" />
        <Button fullWidth type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default Home;
