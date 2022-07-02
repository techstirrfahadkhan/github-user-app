import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Spinner } from 'reactstrap';
import { getUserDetail, getUsers, usersSelector } from '../../redux/users';
import ListItem from '../ListItem/ListItem';

const List = () => {
	//! INSTANCES
	let dispatch = useDispatch();

	//! LIFE CYCLE METHODS
	useEffect(() => {
		dispatch(getUsers());
	}, []);

	//! SELECTORS
	const { loading, error, users } = useSelector(usersSelector);

	const getDetailsOfUser = userName => {
		dispatch(getUserDetail(userName));
	};

	return (
		<Col md='12' sm='12' className='d-flex flex-wrap justify-content-center'>
			{error ? (
				error
			) : loading ? (
				<div className='text-center mt-3'>
					<Spinner />
				</div>
			) : (
				users?.map(user => (
					<ListItem
						key={user?.id}
						user={user}
						getDetailsOfUser={getDetailsOfUser}
					/>
				))
			)}
		</Col>
	);
};

export default List;
