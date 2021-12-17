import React from "react"
import Eris from "eris"

import Icon from "../icon.svg"

export default class Login extends React.Component {
    handleChange = event => {
        this.setState({token: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()

        if (!this.state.token) return

        const client = new Eris(this.state.token, {
            restMode: true,
            autoreconnect: false
        })

        const handleDisconnect = () => {
            console.log("That didn't work.")
            client.disconnect({reconnect: false})
            this.setState({disabled: false})
        }

        client
            .once("ready", () => {
                console.log("Client is ready...")
                client.off("disconnect", handleDisconnect)
                this.props.onLogin(client)
            })
            .once("disconnect", handleDisconnect)
        
        this.setState({disabled: true})

        console.log("Connecting...")
        client.connect()
    }

    constructor(props) {
        super(props)
        this.state = {
            token: "",
            disabled: false
        }
    }

    render() {
        // this.props.onLogin
        return <div id="login">
            <img src={Icon} width="128" height="128" />
            <h1>ChaosHeart</h1>
            <form onSubmit={this.handleSubmit}>
                <input
                    type="password"
                    id="token"
                    placeholder="enter bot token"
                    onChange={this.handleChange}
                    disabled={this.state.disabled}
                />
                <input type="submit" id="submit" />
            </form>
        </div>
    }
}