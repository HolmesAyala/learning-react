"use strict";

const createElement = React.createElement;

class CounterButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = { count: 0 };
	}

	onClick_BTNCounter(event) {
		let currentCount = this.state.count + 1;

		this.setState({
			count: currentCount
		});
	}

	render() {
		return createElement("button", {
			onClick: event => {
				this.onClick_BTNCounter(event);
			}
		}, `${this.props.message || "Count"}: ${this.state.count}`);
	}
}

let containers = Array.from(document.getElementsByClassName("counterButtonContainer"));

containers.forEach(container => {
	let props = {
		message: container.dataset.message
	};

	ReactDOM.render(createElement(CounterButton, props), container);
});