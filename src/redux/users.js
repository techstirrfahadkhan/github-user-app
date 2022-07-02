import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
	loading: false,
	error: null,
	users: [],
	userDetailLoading: false,
	user: null,
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
		gettingUserDetail: state => {
			state.userDetailLoading = true;
		},
		gettingUserDetailSuccess: (state, action) => {
			state.userDetailLoading = false;
			state.user = action.payload;
		},
		gettingUserDetailFailure: (state, action) => {
			state.userDetailLoading = false;
			state.error = action.payload;
		},
	},
});

//! Action creators are generated for each case reducer function
const {
	gettingUsers,
	gettingUsersSuccess,
	gettingUsersFailure,
	gettingUserDetail,
	gettingUserDetailSuccess,
	gettingUserDetailFailure,
} = counterSlice.actions;

export const usersSelector = state => state.users;

//! ACTIONS -ASYNC
export const getUsers = () => async dispatch => {
	dispatch(gettingUsers());
	try {
		let resp = await axios.get(
			`https://${process.env.REACT_APP_BASE_URL}users`
		);
		if (resp?.status === 200) {
			dispatch(gettingUsersSuccess(resp?.data));
		}
	} catch ({ message }) {
		dispatch(gettingUsersFailure(message));
	}
};
export const getUserDetail = name => async dispatch => {
	dispatch(gettingUserDetail());
	try {
		let resp = await axios.get(
			`https://${process.env.REACT_APP_BASE_URL}users/${name}`
		);
		if (resp?.status === 200) {
			dispatch(gettingUserDetailSuccess(resp?.data));
		}
	} catch ({ message }) {
		dispatch(gettingUserDetailFailure(message));
	}
};

export default counterSlice.reducer;
