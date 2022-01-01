import React from "react"

export default class Command extends React.Component {
    handleAbort = () => {
        this.setState({disabled: true, running: true})
    }
    
    handleExecute = async () => {
        const {command, guild, tasks, onTaskChange} = this.props

        const iterator = command.exec(guild)
        const progress = {
            percent: 0,
            message: "Running!"
        }

        tasks.set(command.id, progress)
        this.setState({disabled: false, running: true})
        onTaskChange()

        let aborted = false
        for await (const [percent, message] of iterator) {
            // Check if aborting
            if (this.state.running && this.state.disabled) {
                aborted = true
                break
            }

            progress.percent = isNaN(percent) ? 1 : Math.min(Math.max(percent, 0), 1)
            if (message) progress.message = message
            onTaskChange()
        }

        progress.percent = 1
        progress.message = aborted ? "Aborted" : "Done!"

        this.setState({disabled: true, running: true})
        onTaskChange()

        setTimeout(() => {
            tasks.delete(command.id)
            this.setState({disabled: false, running: false})
            onTaskChange()
        }, 500)
    }

    constructor(props) {
        super(props)

        const running = this.props.tasks.has(this.props.command.id)
        this.state = {
            running,
            disabled: false
        }
    }

    render() {
        const {command} = this.props
        const {disabled} = this.state

        const button = this.state.running
            ? <button disabled={disabled} className="abort" onClick={this.handleAbort}>abort</button>
            : <button disabled={disabled} onClick={this.handleExecute}>execute</button>

        return <div className="command">
            <div>
                <h4>{command.id}</h4>
                <p>{command.description}</p>
            </div>
            {button}
        </div>
    }
}