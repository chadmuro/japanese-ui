import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	titleWrap: {
		flexGrow: 1,
	},
	title: {
		cursor: 'pointer',
		width: 'fit-content',
	},
	nav: {
		'& > *': {
			cursor: 'pointer',
			marginRight: theme.spacing(4),
		},
	},
	buttonWrap: {
		'& > *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

const Header = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<AppBar position="static" color="inherit" elevation={0}>
			<Toolbar>
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
						Categories
					</Link>
				</nav>
				<div className={classes.buttonWrap}>
					<Button color="secondary" variant="outlined">
						Login
					</Button>
					<Button color="secondary" variant="contained">
						Sign up
					</Button>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
