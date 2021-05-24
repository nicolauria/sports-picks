import React from "react";
import { Link } from "react-router-dom";

export default (props) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Sports Picks</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/games" className="nav-link">Games</Link>
                </li>
                {!props.loggedIn && <><li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signup" className="nav-link">Signup</Link>
                </li></>}
                {props.loggedIn && <>
                <li className="nav-item">
                    <Link to="/picks" className="nav-link">Picks</Link>
                </li>
                <li className="nav-item">
                    <button onClick={props.logout} style={{marginTop: "5px"}}>Logout</button>
                </li></>}
            </ul>
        </div>
    </nav>
)