import React from "react"
import ReactDOM from "react-dom"
import {
    HashRouter,
    Switch,
    Route, 
    Link
} from "react-router-dom"
import {Client} from "discord.js"

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path="/test">
                <Link to="/">
                    <p>Just a test.</p>
                </Link>
            </Route>
            <Route path="/">
                <Link to="/test">
                    <p>Hiya!</p>
                </Link>
            </Route>
        </Switch>
    </HashRouter>,
    document.getElementById("main")
)