import React from "react"

export default class Command extends React.Component {
    handleAbort = () => {
        this.props.manager.abort()
    }
    
    handleExecute = async () => {
        const {command, guild, manager} = this.props
        manager.execute(guild, command.id)
    }

    render() {
        const {id, description, running, aborting} = this.props.command

        const button = running
            ? <button disabled={aborting} className="abort" onClick={this.handleAbort}>abort</button>
            : <button onClick={this.handleExecute}>execute</button>

        return <div className="command">
            <div>
                <h4>{id}</h4>
                <p>{description}</p>
            </div>
            {button}
        </div>
    }
}