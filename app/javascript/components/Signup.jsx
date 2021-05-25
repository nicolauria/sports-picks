import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: []
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        let user = {email, password};
        
        axios.post("/api/v1/signup", user).then(result => {
            this.props.handleLogin(result);
        }).catch(err => {
            this.setState({errors: err.response.data});
        })
    }

    render() {
        return (
            <div className="container" style={{maxWidth: "600px", marginTop: "250px"}}>
                <h1>Sign Up</h1>
                {this.state.errors.map(err => {
                    return <li style={{color: 'red', listStyleType: 'none'}}>{err}</li>
                })}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" 
                               name="email" 
                               className="form-control" 
                               id="exampleInputEmail1" 
                               aria-describedby="emailHelp" 
                               placeholder="Enter email" 
                               onChange={this.handleChange} 
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" 
                               name="password" 
                               className="form-control" 
                               id="exampleInputPassword1" 
                               placeholder="Password" 
                               onChange={this.handleChange} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup;