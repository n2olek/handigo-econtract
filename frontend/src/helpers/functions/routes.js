import { store } from 'reducers';
import { ROUTE_PATH, setLocalstorage } from 'helpers';
import { setReduxUserAuth } from 'actions';

export const redirect = path => {
	store.getState().thisRoute.push(path);
};

export const logout = () => {
	setLocalstorage('user', {});
	store.dispatch(setReduxUserAuth({}));
	redirect(ROUTE_PATH.LOGIN);
};

export const checkUserLoginSession = (user) => {
	if (!user || !user.last_login) return false;

	let now = new Date();
	let timeout = 24 * 60 * 60 * 1000

	return (now - user.last_login) <= timeout;
}
