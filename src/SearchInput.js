import React from 'react';
import { Input } from 'reactstrap';
// import _ from 'lodash';

import { getUserDetail } from '../ListItem/listItemService';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { gettingUserDetailSuccessWithSearch } from '../../redux/users';
import { throttle } from 'lodash';
import { FcSearch } from 'react-icons/fc';
const SearchInput = () => {
	const [userName, setUserName] = useState('');

	//! INSTANCES
	let dispatch = useDispatch();

	const searchUser = value => {
		if (value === '') {
			dispatch(gettingUserDetailSuccessWithSearch(null));
		}
		if (value !== '') {
			let makeCall = () => dispatch(getUserDetail(value, 'search'));

			makeCall();
		}
	};

	const throttleSearch = throttle(searchUser, 1500, {
		leading: false,
		trailing: true,
	});

	return (
		<div className='d-flex align-items-center border '>
			<Input
				placeholder='search username'
				style={{ border: 'none', ':focus': { outline: 'none' } }}
				onChange={e => throttleSearch(e.target.value)}
			/>
			<FcSearch style={{ fontSize: '2rem' }} />
		</div>
	);
};

export default SearchInput;
