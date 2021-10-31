import React from "react"
import ReactDOM from "react-dom"

import Login from "./Login.jsx"

class App extends React.Component {
    handleLogin = client => {
        this.setState({client})
    }

    handleDisconnect = () => {
        this.setState({client: null})
    }

    constructor(props) {
        super(props)
        this.state = {client: null}
    }

    render() {
        const client = this.state.client
        if (client) {
            //return <Dashboard client={client} onDisconnect={this.handleDisconnect} />
            return client.user.username + "#" + client.user.discriminator
        } else {
            return <Login onLogin={this.handleLogin} />
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("main")
)