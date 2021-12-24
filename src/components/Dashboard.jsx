import React from "react"
import {
    MemoryRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom"

import DashboardPage from "./DashboardPage.jsx"

export default class Dashboard extends React.Component {
    handleGuilds = async () => {
        const guilds = await this.props.client.getRESTGuilds()
        this.setState({guilds})
    }

    handleTaskChange = () => {
        console.log(this.tasks)
        this.forceUpdate()
    }

    constructor(props) {
        super(props)
        this.state = {guilds: []}
        this.tasks = new Map()
    }

    componentDidMount() {
        this.props.client
            .once("disconnect", this.props.onDisconnect)
            .on("guildCreate", this.handleGuilds)
            .on("guildDelete", this.handleGuilds)
        
        this.handleGuilds()
    }

    render() {
        const {user} = this.props.client
        const {guilds} = this.state

        const navlinks = guilds.map(guild => {
            return (
                <NavLink key={guild.id} to={guild.id} className="navlink">
                    <h3>{guild.name}</h3>
                </NavLink>
            )
        })

        const routes = guilds.map(guild => {
            return (
                <Route exact path={"/" + guild.id} key={guild.id}>
                    <DashboardPage guild={guild} user={user} tasks={this.tasks} onTaskChange={this.handleTaskChange} />
                </Route>
            )
        })

        return <Router>
            <div id="dashboard">
                <nav>
                    {navlinks}
                </nav>
                <Switch>
                    {routes}
                    <Route exact path="/">
                        <DashboardPage user={user} />
                    </Route>
                </Switch>
            </div>
        </Router>
    }
}