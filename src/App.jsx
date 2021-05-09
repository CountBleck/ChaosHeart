import React from "react"
import ReactDOM from "react-dom"
import Store from "electron-store"

const store = new Store()
store.set("hiya", "nerd")

ReactDOM.render(
    <div>
        <p>Hello!</p>
        <p>This is some test text.</p>
        <p>Hiya, {store.get("hiya")}!</p>
    </div>,
    document.getElementById("main")
)