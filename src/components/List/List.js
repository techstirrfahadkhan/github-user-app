import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Spinner } from 'reactstrap';

//!CUSTOM-COMPONENTS

import ListItem from '../ListItem/ListItem';
import { getUsers, fetchMoreData } from './listService';
import { usersSelector } from '../../redux/users';
import { getUserDetail } from '../ListItem/listItemService';

const List = () => {
	//! INSTANCES
	let dispatch = useDispatch();

	//! LIFE CYCLE METHODS
	useEffect(() => {
		dispatch(getUsers());
	}, []);

	//! SELECTORS
	const { loading, error, users, searchedUser } = useSelector(usersSelector);

	//! METHODS
	const getDetailsOfUser = userName => {
		dispatch(getUserDetail(userName));
	};

	return (
		<Col md='12' sm='12' className='d-flex flex-wrap justify-content-center'>
			{error ? (
				'No User Found!'
			) : loading ? (
				<div className='text-center mt-3'>
					<Spinner />
				</div>
			) : searchedUser ? (
				<ListItem
					key={searchedUser?.id}
					user={searchedUser}
					getDetailsOfUser={getDetailsOfUser}
				/>
			) : (
				<InfiniteScroll
					dataLength={users?.length}
					next={() => dispatch(fetchMoreData(users?.at(-1)?.id))}
					className='d-flex flex-wrap justify-content-center'
					// inverse={true}
					hasMore={true}
					loader={<div>Loading...</div>}
					scrollableTarget='scrollableDiv'
				>
					{users?.map(user => (
						<ListItem
							key={user?.id}
							user={user}
							getDetailsOfUser={getDetailsOfUser}
						/>
					))}
				</InfiniteScroll>
			)}
		</Col>
	);
};

export default List;
