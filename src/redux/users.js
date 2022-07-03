import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	loading: false,
	error: null,
	users: [],
	userDetailLoading: false,
	user: null,
	searchedUser: null,
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
			state.error = null;
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
			state.error = null;
		},
		gettingUserDetailFailure: (state, action) => {
			state.userDetailLoading = false;
			state.error = action.payload;
		},
		gettingUserDetailSuccessWithSearch: (state, action) => {
			state.userDetailLoading = false;
			state.searchedUser = action.payload;
			state.error = null;
		},
		fetchMoreDataSuccess: (state, action) => {
			state.users = [...state.users, ...action.payload];
		},
	},
});

//! Action creators are generated for each case reducer function
export const {
	gettingUsers,
	gettingUsersSuccess,
	gettingUsersFailure,
	gettingUserDetail,
	gettingUserDetailSuccess,
	gettingUserDetailFailure,
	gettingUserDetailSuccessWithSearch,
	fetchMoreDataSuccess,
} = counterSlice.actions;

export const usersSelector = state => state.users;

export default counterSlice.reducer;
