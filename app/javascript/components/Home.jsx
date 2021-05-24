import React from "react";
import { Link } from "react-router-dom";

export default (props) => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Sports Picks</h1>
        <p className="lead">
          Find sports games to make picks on! You must be logged in to view games.
        </p>
        <hr className="my-4" />
        <Link
          to="/games"
          className="btn btn-lg custom-button home-btn"
          role="button"
        >
          View Games
        </Link>
        {!props.isLoggedIn && <>
          <Link
          to="/login"
          className="btn btn-lg custom-button home-btn"
          role="button"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="btn btn-lg custom-button"
          role="button"
        >
          Signup
        </Link>
        </>}
      </div>
    </div>
  </div>
);