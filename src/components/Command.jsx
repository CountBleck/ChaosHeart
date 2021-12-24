import React from "react"

export default class Command extends React.Component {
    handleClick = () => {
        const {command, guild, tasks, onTaskChange} = this.props

        const result = command.exec(guild)
            .then(() => {
                tasks.delete(command.id)
                this.setState({disabled: false})
                onTaskChange()
            })

        tasks.set(command.id, result)
        this.setState({disabled: true})
        onTaskChange()
    }

    constructor(props) {
        super(props)

        const disabled = this.props.tasks.has(this.props.command.id)
        this.state = {disabled}
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