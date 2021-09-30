import React from "react"
import ReactDOM from "react-dom"
import {
    MemoryRouter,
    Switch,
    Route, 
    Link
} from "react-router-dom"
import Eris from "eris"

ReactDOM.render(
    <MemoryRouter>
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
    </MemoryRouter>,
    document.getElementById("main")
)