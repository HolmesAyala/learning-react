import React from "react";

/**
 * Function component
 */
// function App() {
// 	let user = {
// 		firstName: "Holmes",
// 		lastName: "Ayala",
// 	};

// 	let element = (
// 		<h1>
// 			Hello {user.firstName} {user.lastName}
// 		</h1>
// 	);

// 	return element;
// }

/**
 * Class component
 */
class App extends React.Component {

	render() {
		return (
			<h1>
				Hello {this.props.firstName} {this.props.lastName}
			</h1>
		);
	}
}

export default App;
