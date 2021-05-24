import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Games extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            axios.get("/api/v1/games").then(response => {
                let games = response.data.results;
                this.setState({games: games})
            })
        } else {
            this.props.history.push('/')
        }
    }

    render() {
        const games = this.state.games.map(game => (
            <div class="card text-center" style={{marginBottom: "50px"}}>
                <div class="card-header">
                    {game.summary}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{game.details.league}</h5>
                    <p class="card-text">{game.odds[0].spread.current.home} Home | {game.odds[0].spread.current.away} Away</p>
                    <Link to={`/game/${game.gameId}`} className="btn btn-primary">View Game</Link>
                </div>
                <div class="card-footer text-muted">
                    {game.schedule.date}
                </div>
            </div>
        ))
        console.log(this.state.games[0])
        return (
            <>
                <h1 style={{textAlign: "center"}}>Games</h1>
                {games}
            </>
        )
    }
}

export default Games;