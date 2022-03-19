import React from "react"
import CommandPanel from "./CommandPanel.jsx"

export default class DashboardPage extends React.Component {
    onTaskChange = () => {
        this.setState({
            commands: [
                ...this.props.manager
                    .getGuildStatus(this.props.guild)
                    .values()
            ]
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            member: null,
            commands: []
        }
    }

    componentDidMount() {
        const {guild, user, manager} = this.props

        if (guild) {
            manager.onTaskChange = this.onTaskChange
            this.onTaskChange()

            guild.getRESTMember(user.id)
                .then(member => {
                    this.setState({member})
                })
        }
    }

    render() {
        const {guild, user, manager} = this.props

        if (!guild) {
            const username = user.username + "#" + user.discriminator
            return <div id="page">
                <div id="header">
                    <h1>Welcome</h1>
                    <p>You are currently logged in as <b>{username}</b>.</p>
                    <p>Select a guild from the left to get started.</p>
                    <p>Then, you can execute commands on the dashboard.</p>
                </div>
            </div>
        }

        const {member} = this.state
        const admin = member 
            ? member.permissions.has("administrator")
            : true

        const progress = this.state.commands
            .filter(({running}) => running)
            .map(({id, percent, message}) =>
                <div key={id} className="task">
                    <p>
                        <b>{id}</b>: {message}
                    </p>
                    <div className="progress" style={{"--progress": percent * 100 + "%"}}>
                        &nbsp;
                    </div>
                </div>
            )

        return <div id="page">
            <div id="header">
                <h1>{guild.name}</h1>
                <p>Select a command below to get started.</p>
                {
                    !admin && <p>
                        <b>
                            Warning: you are not an administrator.
                            You might lack necessary permissions.
                        </b>
                    </p>
                }
            </div>
            {
                !!progress.length && <div id="tasks">
                    {progress}
                </div>
            }
            <CommandPanel guild={guild} manager={manager} />
        </div>
    }
}