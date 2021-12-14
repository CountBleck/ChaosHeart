import React from "react"

import DashboardHeader from "./DashboardHeader.jsx"
import CommandPanel from "./CommandPanel.jsx"
import { TouchBarScrubber } from "electron"

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
        const {guild, user} = this.props

        if (!guild) {
            const username = user.username + "#" + user.discriminator
            return <div id="page">
                <DashboardHeader title="Welcome">
                    <p>You are currently logged in as <b>{username}</b>.</p>
                    <p>Select a guild from the left to get started.</p>
                    <p>Then, you can execute commands on the dashboard.</p>
                </DashboardHeader>
            </div>
        }

        const {member} = this.state
        const admin = member 
            ? member.permissions.has("administrator")
            : true

        return <div id="page">
            <DashboardHeader title={guild.name}>
                <p>Select a command below, and have fun!</p>
                {
                    !admin && <p>
                        <b>
                            Warning: you are not an administrator.
                            You might lack necessary permissions.
                        </b>
                    </p>
                }
            </DashboardHeader>
            <CommandPanel guild={guild} />
        </div>
    }
}