import React from "react"
import CommandPanel from "./CommandPanel.jsx"

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {member: false}
    }

    componentDidMount() {
        const {guild, user} = this.props

        if (guild) {
            guild.getRESTMember(user.id)
                .then(member => {
                    this.setState({member})
                })
        }
    }

    render() {
        const {guild, user, onTaskChange, tasks: allTasks} = this.props

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
        
        if (!allTasks.has(guild.id))
            allTasks.set(guild.id, new Map())
        
        const tasks = allTasks.get(guild.id)
        const progress = [...tasks.keys()].map(id =>
            <div key={id} className="task">
                <b>{id}</b>: Running!
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
            <CommandPanel guild={guild} tasks={tasks} onTaskChange={onTaskChange} />
        </div>
    }
}