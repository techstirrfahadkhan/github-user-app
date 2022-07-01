import './App.css';
import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';

//! CUSTOM COMPONENTS
import ListView from './pages/listView';

function App() {
	return (
		<Provider store={store}>
			<ListView />
		</Provider>
	);
}

export default App;
