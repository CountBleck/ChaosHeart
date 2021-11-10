import React from "react"

export default class DashboardHeader extends React.Component {
    render() {
        const {title, children} = this.props
        return <div id="header">
            <h1>{title}</h1>
            {children}
        </div>
    }
}