import "./Calculator.css"

import React from "react"

import CalculatorInput from "./CalculatorInput"

class Calculator extends React.Component {
	constructor(props) {
		super(props)

		this.DEFAULT_RESULT = "Write a expression"

		this.state = {
			result: this.DEFAULT_RESULT,
			input: ""
		}

		this.onChange_Input = this.onChange_Input.bind(this)
	}

	onChange_Input(value) {
		let result = ""

		try {
			result = eval(value)
		} catch (error) {
			result = "Error"
		}

		this.setState({
			result: result || this.DEFAULT_RESULT,
			input: value
		})
	}

	render() {
		return (
			<form className="calculator">
				<div className="result">{ this.state.result }</div>
				<CalculatorInput className="input" value={this.state.input} onChange={this.onChange_Input} />
			</form>
		)
	}
}

export default Calculator
