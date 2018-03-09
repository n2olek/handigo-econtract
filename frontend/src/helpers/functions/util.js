export const setLocalstorage = (name, data) => {
	return localStorage.setItem(name, JSON.stringify(data));
};

export const getLocalstorage = name => {
	return JSON.parse(localStorage.getItem(name));
};

export const getGoogleDriveImagePath = id => {
	if (!id || typeof id !== 'string') return "";

	return 'https://drive.google.com/uc?export=view&id=' + id;
};

export const getPreviewGoogleDrivePdfPath = id => {
	if (!id || typeof id !== 'string') return "";

	return 'https://drive.google.com/file/d/' + id + '/preview';
};

export const getViewGoogleDrivePdfPath = id => {
	if (!id || typeof id !== 'string') return "";

	return 'https://drive.google.com/file/d/' + id + '/view';
};

export const getDownloadGoogleDrivePdfPath = id => {
	if (!id || typeof id !== 'string') return "";

	return 'https://drive.google.com/uc?authuser=0&id=' + id + '&export=download';
};

export const getAttachmentFilename = filename => {
	if (!filename || typeof filename !== 'string') return "";

	let name = filename.split('_');
	name.shift();
	return name.join('_');
}

export const cloneObject = obj => {
	if (typeof obj !== 'object') return obj;

	return JSON.parse(JSON.stringify(obj));
}
