import { Modal } from 'reactstrap';

const GeneralModal = ({ isOpen, toggle, ModalHeader, ModalBody }) => {
	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			{ModalHeader}
			{ModalBody}
		</Modal>
	);
};

export default GeneralModal;
