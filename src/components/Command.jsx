import React from "react"

export default class Command extends React.Component {
    handleClick = async () => {
        const {command, guild, tasks, onTaskChange} = this.props

        const iterator = command.exec(guild)
        const progress = {
            percent: 0,
            message: "Running!"
        }

        tasks.set(command.id, progress)
        this.setState({disabled: true})
        onTaskChange()

        for await (const [percent, message] of iterator) {
            progress.percent = isNaN(percent) ? 1 : Math.min(Math.max(percent, 0), 1)
            if (message) progress.message = message
            onTaskChange()
        }

        progress.percent = 1
        progress.message = "Done!"

        setTimeout(() => {
            tasks.delete(command.id)
            this.setState({disabled: false})
            onTaskChange()
        }, 500)
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