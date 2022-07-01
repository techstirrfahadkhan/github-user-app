import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
	loading: false,
	error: null,
	users: [],
};
// axios.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';
export const counterSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		gettingUsers: state => {
			state.loading = true;
		},
		gettingUsersSuccess: (state, action) => {
			state.loading = false;
			state.users = action.payload;
		},
		gettingUsersFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

//! Action creators are generated for each case reducer function
const { gettingUsers, gettingUsersSuccess, gettingUsersFailure } =
	counterSlice.actions;

export const mealsSelector = state => state.users;

//! ACTIONS -ASYNC
export const getUsers = () => async dispatch => {
	dispatch(gettingUsers());
	try {
		let resp = await axios.get(`https://${process.env.REACT_APP_BASE_URL}`);
		console.log('resp', resp);
		if (resp?.status === 200) {
			dispatch(gettingUsersSuccess(resp?.data));
		}
	} catch ({ message }) {
		dispatch(gettingUsersFailure(message));
	}
};

export default counterSlice.reducer;
