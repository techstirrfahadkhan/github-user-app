import { Col, Row } from 'reactstrap';

//!CUSTOM-COMPONENTS
import List from '../components/List/List';
import SearchInput from '../components/SearchInput/SearchInput';

const ListView = () => {
	return (
		<Row className='flex-column align-items-center'>
			<Col md='4' className='mt-3'>
				<SearchInput />
			</Col>
			<Col>
				<List />
			</Col>
		</Row>
	);
};
export default ListView;
