import React from "react"

class Input extends React.Component {
	constructor(props) {
		super(props)
		this.onChange_TBInput = this.onChange_TBInput.bind(this)
	}

	onChange_TBInput(e) {
		this.props.onChange(e.target.value)
	}

	render() {
		return (
			<input value={this.props.value} onChange={this.onChange_TBInput} />
		)
	}
}

export default Input
