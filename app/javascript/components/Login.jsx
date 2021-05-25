import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: ""
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
        
        axios.post("/api/v1/login", user).then(result => {
            this.props.handleLogin(result);
        }).catch(err => {
            this.setState({errors: err.response.data[0]});
        })
    }

    render() {
        return (
            <div className="container" style={{maxWidth: "600px", marginTop: "250px"}}>
                <h1>Log In</h1>
                <li style={{color: 'red', listStyleType: 'none'}}>{this.state.errors}</li>
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

export default Login;