import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';

const App = () => {

	const firstName = 'Joseph';
	const lastName = 'Anderson';

	return (
		<main>
			<Header />

			<h5>Hi {firstName + ' ' + lastName}!</h5>

			<h1>Task List</h1>

			<p>
				<input type="checkbox"></input>
				<span>Eat breakfast</span>
			</p>
			<p>
				<input type="checkbox"></input>
				<span>Eat lunch</span>
			</p>
			<p>
				<input type="checkbox"></input>
				<span>Eat dinner</span>
			</p>
		</main>
	);
}

export default App;