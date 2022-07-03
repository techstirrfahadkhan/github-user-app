import axios from 'axios';
import {
	gettingUserDetail,
	gettingUserDetailSuccess,
	gettingUserDetailFailure,
	gettingUserDetailSuccessWithSearch,
} from './../../redux/users';

export const getUserDetail = (name, term) => async dispatch => {
	dispatch(gettingUserDetail());
	try {
		let resp = await axios.get(
			`https://${process.env.REACT_APP_BASE_URL}users/${name}`,
			{
				headers: {
					Authorization: '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',
				},
			}
		);

		if (term === 'search') {
			if (resp?.status === 200) {
				dispatch(gettingUserDetailSuccessWithSearch(resp?.data));
			}
			return;
		}
		if (resp?.status === 200) {
			dispatch(gettingUserDetailSuccess(resp?.data));
		}
	} catch ({ message }) {
		dispatch(gettingUserDetailFailure(message));
	}
};
