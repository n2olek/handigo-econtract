import axios from 'axios';
import { BASE_API, BASE_PATH_API } from './apiConfig';
// import { toast } from 'react-toastify';

const getConfig = token => {
  const config = {
    baseURL: BASE_API + BASE_PATH_API,
    headers: {}
  };
  return config;
};

const axiosSuccess = result => {
  return result.data;
};

const axiosError = (error, xhr, status) => {
  console.log('error', error);
	// toast.error('Something error, please try again later.');
  return error;
};

const axiosService = (type, url, params, isFullUrl) => {
  let config = getConfig();

  switch (type) {
    case 'get':
      let urlWithQuery = url + '?';
      Object.keys(params).forEach(key => {
        urlWithQuery += key + '=' + (typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]) + '&';
      });
      urlWithQuery = urlWithQuery.substr(0, urlWithQuery.length - 1);

      return axios
        .get(urlWithQuery, config)
        .then(axiosSuccess)
        .catch(axiosError);

    case 'post':
      return axios
        .post(url, params, config)
        .then(axiosSuccess)
        .catch(axiosError);

    case 'put':
      return axios
        .put(url, params, config)
        .then(axiosSuccess)
        .catch(axiosError);

    case 'delete':
      return axios
        .delete(url, params, config)
        .then(axiosSuccess)
        .catch(axiosError);

    case 'postFormData':
      let formData = new FormData();
  		Object.keys(params).map(key => {
        let value = params[key];
        if (typeof value === "object" && value.length > 0) {
          return value.map((subValue) => {
      			return formData.append(key, subValue);
      		});
        } else return formData.append(key, params[key]);
  		});
      return axios({
        method: 'post',
        url: isFullUrl ? url : BASE_API + BASE_PATH_API + url,
        data: formData,
        config: {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      })
        .then(axiosSuccess)
        .catch(axiosError);

    default:
      return false;
  }
};

export default {
  get: (url, params) => axiosService('get', url, params),
  post: (url, params) => axiosService('post', url, params),
  put: (url, params) => axiosService('put', url, params),
  delete: (url, params) => axiosService('delete', url, params),
  postFormData: (url, params, isFullUrl) => axiosService('postFormData', url, params, isFullUrl)
};
