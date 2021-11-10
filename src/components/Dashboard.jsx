import React from "react"
import {
    MemoryRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom"

import DashboardPage from "./DashboardPage.jsx"

export default class Dashboard extends React.Component {
    handleGuilds = () => {
        this.setState({
            guilds: [...this.props.client.guilds.values()]
        })
    }

    constructor(props) {
        super(props)
        this.state = {guilds: []}
    }

    componentDidMount() {
        this.props.client
            .once("disconnect", this.props.onDisconnect)
            .on("guildCreate", this.handleGuilds)
            .on("guildDelete", this.handleGuilds)
        
        this.handleGuilds()
    }

    render() {
        const {guilds} = this.state
        const navEntries = this.state.guilds.map(guild => {
            return (
                <NavLink key={guild.id} to={guild.id} className="navlink">
                    <h3>{guild.name}</h3>
                </NavLink>
            )
        })

        const client = this.props.client

        return <Router>
            <div id="dashboard">
                <nav>
                    {navEntries}
                </nav>
                <Switch>
                    <Route
                        exact
                        path="/:id"
                        render={({match}) =>
                            <DashboardPage
                                guild={guilds.find(guild => guild.id === match.params.id)}
                                client={client}
                            />
                        }
                    />
                    <Route exact path="/">
                        <DashboardPage client={client} />
                    </Route>
                </Switch>
            </div>
        </Router>
    }
}