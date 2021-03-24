import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';

const App = () => {
	const date = new Date();
	const hours = date.getHours();
	let timeOfDayGreeting;
	let emoji;

	// Set the time of day and emoji.
	if (hours >= 5 && hours < 12) {
		timeOfDayGreeting = 'Good morning';
		emoji = '🌅';
	} else if (hours >= 12 && hours < 16) {
		timeOfDayGreeting = 'Good afternoon';
		emoji = '☀️';
	} else if (hours >= 16 && hours < 20) {
		timeOfDayGreeting = 'Good evening';
		emoji = '🌆'
	} else if ((hours >= 0 && hours < 5) || hours >= 20) {
		timeOfDayGreeting = 'Good evening';
		emoji = '🌙'
	} else {
		// Fallback.
		timeOfDayGreeting = 'Hello';
		emoji = '👋🏼'
	}

	return (
		<main>
			<Header />

			<h1>{`${emoji} ${timeOfDayGreeting}.`}</h1>

			<h2>Task List</h2>

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