import Axios from "axios";
import qs from "querystring";

export const SERVER_HOST = "http://localhost:3500";
export const SERVER_HOST_API = `${SERVER_HOST}/api`;
export const SERVER_HOST_STATIC = `${SERVER_HOST}/static/`;
export const SERVER_HOST_USER_IMAGES = `${SERVER_HOST_STATIC}/users/images/`;

export const axios = Axios.create({
	baseURL: `${SERVER_HOST_API}/`,
	timeout: 5000,
});

export const get = (path: string, data: any = {}) => {
	return axios.get(`${path}?${qs.stringify(data)}`, {
		withCredentials: true,
	});
};

export const put = (path: string, data: any = {}) => {
	return axios.put(
		`${path}?${qs.stringify(data)}`,
		{},
		{
			withCredentials: true,
		}
	);
};

export const post = (path: string, data: object = {}) => {
	return axios.post(path, data, {
		withCredentials: true,
	});
};
