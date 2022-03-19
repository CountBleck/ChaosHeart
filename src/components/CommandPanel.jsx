import React from "react"
import Command from "./Command.jsx"

export default class CommandPanel extends React.Component {
    render() {
        const {guild, manager} = this.props

        const commands = [...manager.getGuildStatus(guild).values()]
            .map(command =>
                <Command
                    key={command.id}
                    guild={guild}
                    manager={manager}
                    command={command}
                />
            )

        return <div id="panel">
            {commands}
        </div>
    }
}