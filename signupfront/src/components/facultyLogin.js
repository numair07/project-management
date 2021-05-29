import React from "react";
import axios from "axios";
import "../stylesheets/styles.css";
import { Redirect } from "react-router-dom";

class facultyLogin extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    state = {
        isEmail: 1,
        isPassword: 1,
        redirect: null,
        email: "",
        password: ""
    }

    changeEmail(event) {
        this.setState ({
            email: event.target.value
        });
    }

    changePassword(event) {
        this.setState ({
            password: event.target.value
        });
    }

    async onSubmit(event) {
        if(this.state.isEmail === 1 && this.state.isPassword === 1) {
        event.preventDefault();

        let registered = {
            email: this.state.email,
            password: this.state.password,
        };

        console.log(registered);

        const response = await axios.post("http://localhost:5000/app/facultylogin", registered);
        console.log(response);
        console.log(response.data);

        if(response.data === "EMAIL" || response.data === "PASSWORD") {
            if(response.data === "EMAIL") {
                alert("Incorrect E-MailID/FID");
            }
            else if(response.data === "PASSWORD") {
                alert("Incorrect Password.");
            }
            
        }
        else {
            this.setState ({
                email: "",
                password: ""
            });
            alert("Login Successful.");
            this.setState({ redirect: "/faculty/"+response.data });
        }
    }

    }

    validateEmail() {
        const regularexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailid = this.state.email;
        if(this.state.email === "") {
            this.state.isEmail = 0;
            return(<p className="error-message">E-Mail cannot be Empty.</p>);
        }
        if(!regularexp.test(emailid)) {
            this.state.isEmail = 0;
            return(<p className="error-message">Invalid E-Mail</p>);
        }
        this.state.isEmail = 1;
    }

    validatePassword() {
        if(this.state.password.length < 5) {
            this.state.isPassword = 0;
            return(<p className="error-message">Password Cannot be Less than 5 characters.</p>);
        }
        this.state.isPassword = 1;
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="main-container">
                <div class-name="top-container">
    
                <div className="login-container">
                <form onSubmit = {this.onSubmit}>
                    <h3>PICT Faculty Login</h3>                
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">EMail-ID</label>
                        <input type="text" className="form-control input-control" placeholder="E-Mail ID" id="email" name="email" onChange={this.changeEmail} value={this.state.email} />
                        {this.validateEmail()}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control input-control" placeholder="password" id="password" name="password" onChange={this.changePassword} value={this.state.password} />
                        {this.validatePassword()}
                    </div>
                    
                    <input type="submit" className="btn btn-primary sign-up-button input-control" value="Submit" onClick={this.setDate}/>

                    <div className="link-div">
                        <a className="forgot-pass link-primary" href="http://localhost:3000/forgot-password">forgot password?</a>
                    </div>

                </form>
                </div>
                </div>
            </div>
        );
    }

}

export default facultyLogin;