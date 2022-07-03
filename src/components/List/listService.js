import axios from 'axios';
import {
	gettingUsers,
	gettingUsersSuccess,
	gettingUsersFailure,
	fetchMoreDataSuccess,
} from '../../redux/users';
export const getUsers = () => async dispatch => {
	dispatch(gettingUsers());
	try {
		let resp = await axios.get(
			`https://${process.env.REACT_APP_BASE_URL}users`,
			{
				headers: {
					Authorization: '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',
				},
			}
		);
		if (resp?.status === 200) {
			dispatch(gettingUsersSuccess(resp?.data));
		}
	} catch ({ message }) {
		dispatch(gettingUsersFailure(message));
	}
};

export const fetchMoreData = lastUserId => async dispatch => {
	// dispatch(gettingUsers());
	try {
		let resp = await axios.get(
			`https://${process.env.REACT_APP_BASE_URL}users?since=${lastUserId}`,
			{
				headers: {
					Authorization: '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',
				},
			}
		);
		if (resp?.status === 200) {
			dispatch(fetchMoreDataSuccess(resp?.data));
		}
	} catch ({ message }) {
		dispatch(gettingUsersFailure(message));
	}
};
