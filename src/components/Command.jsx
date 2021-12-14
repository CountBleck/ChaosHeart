import React from "react"

export default class Command extends React.Component {
    handleClick = () => {
        const {command, guild} = this.props

        this.setState({disabled: true})

        command.exec(guild)

        setTimeout(() => {
            this.setState({disabled: false})
        }, 1000)
    }

    constructor(props) {
        super(props)
        this.state = {disabled: false}
    }

    render() {
        const {command} = this.props

        return <div className="command">
            <div>
                <h4>{command.id}</h4>
                <p>{command.description}</p>
            </div>
            <button disabled={this.state.disabled} onClick={this.handleClick}>
                execute
            </button>
        </div>
    }
}