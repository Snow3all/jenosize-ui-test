import axios from 'axios';

// @ts-ignore
export const apiCall = async (data) => {
	try {
		const response = await axios({
			method: data.method,
			url: data.url,
			data: data.data
		});
		return response.data;
	} catch (e) {
		return e;
	}
};
