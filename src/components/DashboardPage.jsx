import React from "react"

import DashboardHeader from "./DashboardHeader.jsx"

export default class DashboardPage extends React.Component {
    render() {
        const {guild, client} = this.props

        if (!guild) {
            const username = client.user.username + "#" + client.user.discriminator
            return <div id="page">
                <DashboardHeader title="Welcome">
                    <p>You are currently logged in as <b>{username}</b>.</p>
                    <p>Select a guild from the left to get started.</p>
                    <p>Then, you can execute commands on the dashboard.</p>
                </DashboardHeader>
            </div>
        }

        return <div id="page">
            <DashboardHeader title={guild.name}>
                <p>Select a command below, and have fun!</p>
            </DashboardHeader>
            <div>
                <p>To be continued...</p>
            </div>
        </div>
    }
}