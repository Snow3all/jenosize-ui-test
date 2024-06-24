// @ts-nocheck
import { apiCall } from '../hooks/axios';
import { endpointUrl, method } from '../configs/http';

export const getCampaign = async () => {
	const axiosData = {
		method: method.get,
		url: `${import.meta.env.VITE_API_URL}${endpointUrl.campaign}`
	};
	const response = await apiCall(axiosData);
	return response;
};

export const getCampaignById = async (id) => {
	const axiosData = {
		method: method.get,
		url: `${import.meta.env.VITE_API_URL}${endpointUrl.campaign}/?id=${id}`
	};
	const response = await apiCall(axiosData);
	return response;
};

export const createCampaign = async (data) => {
	const axiosData = {
		method: method.post,
		url: `${import.meta.env.VITE_API_URL}${endpointUrl.campaign}`,
		data: data
	};
	const response = await apiCall(axiosData);
	return response;
};

export const editCampaign = async (data) => {
	console.log("🚀 ~ editCampaign ~ data:", data)
	const axiosData = {
		method: method.patch,
		url: `${import.meta.env.VITE_API_URL}${endpointUrl.campaign}/?id=${data.id}`,
    data: data.data
	};
	const response = await apiCall(axiosData);
	return response;
};

export const deleteCampaign = async (id) => {
	const axiosData = {
		method: method.delete,
		url: `${import.meta.env.VITE_API_URL}${endpointUrl.campaign}/?id=${id}`
	};
	const response = await apiCall(axiosData);
	return response;
};
