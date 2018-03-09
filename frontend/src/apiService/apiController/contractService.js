import apiService from '../apiService';
import { BASE_API, BASE_PATH_API } from '../apiConfig'
import { GOOGLE_SCRIPT_GENERATE_PDF_PATH } from 'helpers';

const apiPath = '/contract';
const fullApiPath = BASE_API + BASE_PATH_API + apiPath;

export const contractService = {
	GeneratePDF: async params => {
		return await apiService.postFormData(GOOGLE_SCRIPT_GENERATE_PDF_PATH, params, true);
	},

	GetContractList: async params => {
		return await apiService.get(`${apiPath}/getContractList`, params);
	},

	GetContract: async params => {
		return await apiService.get(`${apiPath}/view`, params);
	},

	UpdateContract: async params => {
		return await apiService.postFormData(`${apiPath}/edit`, params);
	},

	GetAttachmentPath: filename => {
		return `${fullApiPath}/attachment/${filename}`;
	}
};
