export const setLocalstorage = (name, data) => {
	return localStorage.setItem(name, JSON.stringify(data));
};

export const getLocalstorage = name => {
	return JSON.parse(localStorage.getItem(name));
};

export const getPreviewGoogleDrivePdfPath = id => {
	return 'https://drive.google.com/file/d/' + id + '/preview';
};

export const getViewGoogleDrivePdfPath = id => {
	return 'https://drive.google.com/file/d/' + id + '/view';
};
