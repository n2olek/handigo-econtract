import apiService from '../apiService';

const apiPath = '/user';

export const userService = {
	Login: async params => {
		return await apiService.post(`${apiPath}/login`, params);
	}
};
