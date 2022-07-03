import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap';

//!CUSTOM-COMPONENTS
import { usersSelector } from '../../redux/users';
import GeneralModal from '../GeneralModal/GeneralModal';

function UserCard(props) {
	return (
		<Col className=' item-col  p-0'>
			<div className='text-center'>
				<img
					loading='lazy'
					src={props.user?.avatar_url}
					alt='profile'
					className='profile pointer'
					onClick={() => props.openDetailModal(props.user)}
				/>
			</div>
			<div className='d-flex justify-content-start align-items-start flex-column m-3'>
				<h3
					className='text-capitalize pointer'
					onClick={() => props.openDetailModal(props.user)}
				>
					{props.user?.login}
				</h3>
				<a
					href={props.user?.html_url}
					target='_blank'
					rel='noopener noreferrer'
				>
					View Profile
				</a>
			</div>
		</Col>
	);
}

const ListItem = ({ user, getDetailsOfUser }) => {
	const [modals, setModals] = useState({
		detailModal: false,
	});

	//! SELCTORS
	const { userDetailLoading, user: selectedUser } = useSelector(usersSelector);

	//!METHODS
	const openDetailModal = selectedUser => {
		// setSelectedUser(selectedUser);
		setModals({
			...modals,
			detailModal: true,
		});
		getDetailsOfUser(selectedUser?.login);
	};

	const closeDetailModal = () => {
		setModals({
			...modals,
			detailModal: false,
		});
		// setSelectedUser(null);
	};

	return (
		<Row className=' m-2 item-row p-2' md='12' style={{ width: '300px' }}>
			<GeneralModal
				isOpen={modals.detailModal}
				toggle={closeDetailModal}
				ModalHeader={
					<ModalHeader toggle={closeDetailModal}>User Detail Modal</ModalHeader>
				}
				ModalBody={
					<ModalBody>
						{userDetailLoading ? (
							<div className='text-center'>
								<Spinner />
							</div>
						) : (
							<Row>
								<Col className='text-center p-0'>
									<img
										src={selectedUser?.avatar_url}
										alt='User Profile'
										className='profile-modal'
									/>
								</Col>
								<Col className='m-2'>
									<h2>{selectedUser?.name}</h2>
									<p>
										<strong>Location: </strong>
										{selectedUser?.location === null ? (
											<small>N/A</small>
										) : (
											selectedUser?.location
										)}
									</p>
									<p>
										<strong>Followers: </strong>
										{selectedUser?.followers}
									</p>
									<p>
										<strong>Following: </strong>
										{selectedUser?.following}
									</p>
								</Col>
							</Row>
						)}
					</ModalBody>
				}
			/>
			<UserCard openDetailModal={openDetailModal} user={user}></UserCard>
		</Row>
	);
};

export default ListItem;
