import { createStore, combineReducers } from 'redux';
import { THIS_ROUTE, USER_AUTH } from 'actions/actionTypes';

const thisRoute = (state = {}, action) => {
	switch (action.type) {
		case THIS_ROUTE:
			return action.data;
		default:
			return state;
	}
};

const user = (state = {}, action) => {
	switch (action.type) {
		case USER_AUTH:
			return action.data;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	thisRoute,
	user
});

export const store = createStore(rootReducer);
