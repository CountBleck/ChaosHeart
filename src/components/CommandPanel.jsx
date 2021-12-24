import React from "react"
import CommandRegistry from "../commands/CommandRegistry.js"
import Command from "./Command.jsx"

export default class CommandPanel extends React.Component {
    render() {
        const {guild, tasks, onTaskChange} = this.props

        const commands = CommandRegistry.map(command =>
            <Command
                key={command.id}
                command={command}
                guild={guild}
                tasks={tasks}
                onTaskChange={onTaskChange}
            />
        )

        return <div id="panel">
            {commands}
        </div>
    }
}