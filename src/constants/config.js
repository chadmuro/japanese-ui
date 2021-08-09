const production = {
	url: {
		API_URL: 'https://chadmuro-japanese-api.herokuapp.com',
		FRONT_URL: 'https://japanese-for-developers.netlify.app',
	},
};

const development = {
	url: {
		API_URL: 'http://localhost:5000',
		FRONT_URL: 'http://localhost:3000',
	},
};

let tempConfig = null;
if (process.env.NODE_ENV === 'development') {
	tempConfig = development;
} else {
	tempConfig = production;
}

export const config = tempConfig;
