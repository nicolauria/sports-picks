import React, { Component } from 'react';
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Games from "../components/Games";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Game from "../components/Game";
import Picks from "../components/Picks"

class App extends Component {
    constructor(props) {
      super(props);
      this.state = JSON.parse(localStorage.getItem('state')) ? 
                   JSON.parse(localStorage.getItem('state')) : 
       { 
        isLoggedIn: false,
        email: ""
       };
    }
    
    handleLogin = (response) => {
        this.setState({
            isLoggedIn: true,
            email: response.data.email
        })
        localStorage.setItem('state', JSON.stringify(this.state));
        window.location.href = "/games";
    }

    logout = () => {
        this.setState({
            isLoggedIn: false,
            email: ""
        })
        localStorage.removeItem('state');
        window.location.href = "/";
    }
    
    render() {
      return (
        <div>
           <Router>
               <NavBar loggedIn={this.state.isLoggedIn} logout={this.logout} />
               <Switch>
                   <Route exact path="/" render={props => (<Home {...props} isLoggedIn={this.state.isLoggedIn} />)} />
                   <Route exact path="/games" render={props => (<Games {...props} isLoggedIn={this.state.isLoggedIn} />)} />
                   <Route exact path="/login" render={props => (<Login {...props} handleLogin={this.handleLogin} />)} />
                   <Route exact path="/signup" render={props => (<Signup {...props} handleLogin={this.handleLogin} />)} />
                   <Route exact path="/game/:id" render={props => (<Game {...props} isLoggedIn={this.state.isLoggedIn} email={this.state.email} />)} />
                   <Route exact path="/picks" render={props => (<Picks {...props} isLoggedIn={this.state.isLoggedIn} />)} />
               </Switch>
           </Router>
        </div>
      );
    }
}
  
export default App;