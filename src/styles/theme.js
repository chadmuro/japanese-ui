import { createTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import yellow from '@material-ui/core/colors/yellow';
import cyan from '@material-ui/core/colors/cyan';

export const theme = createTheme({
	palette: {
		background: {
			paper: blueGrey[900],
		},
		primary: {
			main: cyan[200],
		},
		secondary: {
			main: yellow[500],
		},
		text: {
			primary: cyan[50],
		},
	},
	overrides: {
		MuiInputLabel: {
			outlined: {
				color: cyan[50],
			},
		},
	},
});
