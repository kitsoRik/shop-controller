import Axios from "axios";

export const SERVER_HOST = "http://localhost:3500";
export const SERVER_HOST_API = `${SERVER_HOST}/api`;

export const axios = Axios.create({
	baseURL: `${SERVER_HOST_API}/`,
	timeout: 5000,
});

export const post = (path: string, data: object = {}) => {
	return axios.post(path, data, {
		withCredentials: true,
	});
};
