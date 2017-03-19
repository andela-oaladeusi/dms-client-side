import dotenv from 'dotenv';

dotenv.config();

export default function setUrl(name) {
	const BASE_URL = process.env.BASE_URL;
	switch(name) {
		case 'login':
			return `${BASE_URL}/users/${name}`;
		default:
		 return baseUrl;
	}
};
