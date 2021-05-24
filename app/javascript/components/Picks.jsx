import React, { Component } from "react";
import axios from "axios";

class Picks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picks: []
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            axios.get("/api/v1/picks").then(response => {
                console.log(response.data);
                this.setState({picks: response.data});
            })
        } else {
            this.props.history.push('/')
        }
    }

    checkIfGameHasEnded = (pick) => {
        axios.get(`/api/v1/game/${pick.game_id}`).then(response => {
            let game = response.data.game.results[0];
            if (game.status == "final") {
                axios.patch("/api/v1/pick", {
                    id: pick.id,
                    home_final: game.scoreboard.score.home,
                    away_final: game.scoreboard.score.away
                }).then(res => {
                    console.log(res);
                })
            }
        })
    }

    render() {
        const picks = this.state.picks.map(pick => {
            this.checkIfGameHasEnded(pick)
            return (
                <div class="card text-center" style={{maxWidth: "800px", margin: "0 auto", marginBottom: "50px"}}>
                    <div class="card-header">
                        {pick.summary}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{pick.league}</h5>
                        <p class="card-text">Home Odds: {pick.home_odds} | Away Odds: {pick.away_odds}</p>
                    </div>
                    <div class="card-footer text-muted">
                    You selected: {pick.home_or_away}<br />
                    Winning team: {pick.winning_team}
                    </div>
                </div>
        )}  )

        return (
            <>
                <h1 style={{textAlign: "center"}}>Picks</h1>
                {picks}
            </>
        )
    }
}

export default Picks;