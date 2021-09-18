import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbar: {
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      justifyContent: 'center',
    },
  },
  titleWrap: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      flexGrow: 0,
      justifyContent: 'center',
    },
  },
  title: {
    cursor: 'pointer',
    width: 'fit-content',
  },
  nav: {
    '& > *': {
      cursor: 'pointer',
      marginRight: theme.spacing(4),
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(0, 2),
      },
    },
  },
  // buttonWrap: {
  //   '& > *': {
  //     marginLeft: theme.spacing(2),
  //     [theme.breakpoints.down('xs')]: {
  //       margin: theme.spacing(1),
  //     },
  //   },
  // },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.titleWrap}>
          <Typography component="h1" variant="h6" className={classes.title}>
            Japanese for Developers
          </Typography>
        </div>
        <nav className={classes.nav}>
          <Link color="primary" onClick={() => history.push('/')}>
            Home
          </Link>
          <Link color="primary" onClick={() => history.push('/vocabulary')}>
            Vocabulary
          </Link>
          <Link color="primary" onClick={() => history.push('/category')}>
            Category
          </Link>
        </nav>
        {/* <div className={classes.buttonWrap}>
          <Button color="secondary" variant="outlined">
            Login
          </Button>
          <Button color="secondary" variant="contained">
            Sign up
          </Button>
        </div> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
