function importAll(r) {
	let files = {};
	r.keys().forEach((item, index) => {
		files[item.replace('./', '')] = r(item);
	});
	return files;
}

export const Images = importAll(
	require.context('./images', false, /\.(png|jpe?g|gif|svg)$/)
);
export const Contents = importAll(
	require.context('./images/contents', false, /\.(png|jpe?g|gif|svg)$/)
);
export const Icons = importAll(
	require.context('./images/icons', false, /\.(png|jpe?g|gif|svg)$/)
);
export const Logos = importAll(
	require.context('./images/logos', false, /\.(png|jpe?g|gif|svg)$/)
);
