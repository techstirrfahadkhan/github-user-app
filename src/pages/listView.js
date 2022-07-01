import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../redux/users';
const ListView = () => {
	//! INSTANCES
	let dispatch = useDispatch();

	//! LIFE CYCLE METHODS
	useEffect(() => {
		dispatch(getUsers());
	});

	return <h1>List View</h1>;
};

export default ListView;
