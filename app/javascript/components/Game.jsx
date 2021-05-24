import React, { Component } from "react";
import axios from "axios";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: []
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            axios.get(`/api/v1/game/${this.props.match.params.id}`).then(response => {
                let game = response.data.results;
                this.setState({game: game})
            })
        } else {
            this.props.history.push('/')
        }
    }

    render() {
        let game = this.state.game[0];
        console.log(game);

        if (!game) {
            return <p>Loading...</p>
        }
        
        return (
            <div className="container" style={{maxWidth: "600px", marginTop: "200px"}}>
                <div className="jumbotron">
                    <h1 className="display-4">{game.summary}</h1>
                    <p className="lead">{game.details.league}</p>
                    <hr className="my-4" />
                    <p>{game.odds[0].spread.current.home} Home | {game.odds[0].spread.current.away} Away</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" style={{marginRight: "20px"}} href="#" role="button">Select Home</a>
                        <a className="btn btn-primary btn-lg" href="#" role="button">Select Away</a>
                    </p>
                </div>
            </div>
        )
    }
}

export default Game;