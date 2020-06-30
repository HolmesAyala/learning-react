import React from "react";
import "./Clock.css";

class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.updateInterval = 1000

		this.state = {
			date: new Date(),
			show: true
		};

	}

	componentDidMount() {
		this.intervalID = setInterval(() => {
			this.onUpdateDate()
		}, this.updateInterval)
	}

	componentWillUnmount() {
		clearInterval(this.intervalID)
	}

	onUpdateDate() {
		this.setState({
			date: new Date()
		})
	}

	onClick_BTNAlternate(e) {
		this.setState({
			show: !this.state.show
		})
	}

	render() {
		let button = (
			<button onClick={this.onClick_BTNAlternate.bind(this)}>
				{this.state.show ? "Hide" : "Show"}
			</button>
		)

		let time = this.state.show 
			? <h1>{this.state.date.toISOString()}</h1>
			: ""

		return (
			<div>
				{button} 
				{time}
			</div>
		);
	}
}

export default Clock;
