import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Layout from '../components/Layout/Layout';

const useStyles = makeStyles(theme => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

const Home = () => {
	const classes = useStyles();

	const onSubmit = e => {
		e.preventDefault();
		console.log('submit');
	};

	return (
		<Layout>
			<form onSubmit={onSubmit} className={classes.form}>
				<TextField variant="outlined" label="Japanese" autoFocus />
				<TextField variant="outlined" label="Reading" />
				<TextField variant="outlined" label="English" />
				<Button type="submit" color="primary" variant="contained">
					Submit
				</Button>
			</form>
		</Layout>
	);
};

export default Home;
