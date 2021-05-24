import React, { Component } from "react";
import axios from "axios";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            pick: [],
            pickAlreadyMade: false,
            gameHasEnded: false
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            axios.get(`/api/v1/game/${this.props.match.params.id}`).then(response => {
                let game = response.data.game.results[0];
                this.setState({game: game});
                if (response.data.pickAlreadyMade) {
                    this.setState({pickAlreadyMade: true});
                } else if (game.status == "final") {
                    this.setState({gameHasEnded: true});
                }
            })
        } else {
            this.props.history.push('/');
        }
    }

    selectTeam = (game, team) => {
        let data = {
            game_id: this.props.match.params.id,
            user_email: this.props.email,
            home_or_away: team,
            summary: game.summary,
            league: game.details.league,
            home_odds: game.odds ? game.odds[0].spread.current.home : 0,
            away_odds: game.odds ? game.odds[0].spread.current.away : 0
        }

        axios.post(`/api/v1/picks`, data).then(response => {
            this.setState({pickAlreadyMade: true})
        })
    }

    render() {
        let game = this.state.game;
        
        if (Object.keys(game).length < 1) {
            return <p>Loading...</p>
        }
                
        return (
            <div className="container" style={{maxWidth: "600px", marginTop: "200px"}}>
                <div className="jumbotron">
                    {this.state.pickAlreadyMade && <h2>You've already selected a team.</h2>}
                    {this.state.gameHasEnded && <h2>This game has ended.</h2>}
                    <h1 className="display-4">{game.summary}</h1>
                    <p className="lead">{game.details.league}</p>
                    <hr className="my-4" />
                    <p>{game.odds && game.odds[0].spread.current.home} Home | {game.odds && game.odds[0].spread.current.away} Away</p>
                    <p className="lead">
                        <button className="btn btn-primary btn-lg" disabled={this.state.pickAlreadyMade || this.state.gameHasEnded} style={{marginRight: "20px"}} onClick={() => this.selectTeam(game, "Home")} role="button">Select Home</button>
                        <button className="btn btn-primary btn-lg" disabled={this.state.pickAlreadyMade || this.state.gameHasEnded} onClick={() => this.selectTeam(game, "Away")} role="button">Select Away</button>
                    </p>
                </div>
            </div>
        )
    }
}

export default Game;