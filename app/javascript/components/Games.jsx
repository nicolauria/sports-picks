import React, { Component } from "react";

class Games extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {

        } else {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <h1>Games</h1>
        )
    }
}

export default Games;