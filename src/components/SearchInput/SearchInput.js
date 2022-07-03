import React from 'react';
import { Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { FcSearch } from 'react-icons/fc';
import { throttle } from 'lodash';

//!CUSTOM-COMPONENTS

import { getUserDetail } from '../ListItem/listItemService';
import { gettingUserDetailSuccessWithSearch } from '../../redux/users';
const SearchInput = () => {
	//! INSTANCES
	let dispatch = useDispatch();

	//! METHODS
	const searchUser = value => {
		if (value === '') {
			dispatch(gettingUserDetailSuccessWithSearch(null));
		}
		if (value !== '') {
			let makeCall = () => dispatch(getUserDetail(value, 'search'));

			makeCall();
		}
	};

	const throttleSearch = throttle(searchUser, 1000, {
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
