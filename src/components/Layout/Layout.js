import React from 'react';
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
	},
	main: {
		flex: 1,
	},
});

const Layout = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header />
			<main className={classes.main}>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
