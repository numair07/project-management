import React from "react";
import axios from "axios";
import "../stylesheets/styles.css";

class signupPage extends React.Component {

    constructor() {
        super();
        this.changeFullName = this.changeFullName.bind(this);
        this.changeuserName = this.changeuserName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.setDate = this.setDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    state = {
        fullname : String,
        username : String,
        email : String,
        password : String,
        date : Date
    }

    changeFullName(event) {
        this.setState ({
            fullname: event.target.value
        });
    }
    
    changeuserName(event) {
        this.setState ({
            username: event.target.value
        });
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

    setDate() {
        let newDate = new Date();

        this.setState({
            date: newDate
        });
    }

    async onSubmit(event) {
        event.preventDefault();

        let registered = {
            fullname: this.state.fullname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            date: this.state.date
        };

        const response = await axios.post("http://localhost:5000/app/signup", registered);
        console.log(response);
        console.log(response.data);

        if(response.data === "EMAIL" || response.data === "USERNAME") {
            if(response.data === "EMAIL") {
                alert("This E-Mail ID is already in use, please try another one.");
            }
            else if(response.data === "USERNAME") {
                alert("This username is already in use, please try another one.");
            }
        }
        else {
            this.setState ({
                fullname: "",
                username: "",
                email: "",
                password: ""
            });
            alert("Sign Up Successful");
        }


    }

    render() {
        return (
            <div className="main-container">
                <div class-name="top-container">
    
                <div className="signup-container">
                <form onSubmit = {this.onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="form-label">Full Name</label>
                        <input type="text" className="form-control input-control" placeholder="Full Name" id="fullname" name="fullname" onChange={this.changeFullName} value={this.state.fullname} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="form-label">username</label>
                        <input type="text" className="form-control input-control" placeholder="username"  id="username" name="fullname" onChange={this.changeuserName} value={this.state.username} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">EMail-ID</label>
                        <input type="email" className="form-control input-control" placeholder="email" id="email" name="fullname" onChange={this.changeEmail} value={this.state.email} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control input-control" placeholder="password" id="password" name="fullname" onChange={this.changePassword} value={this.state.password} />
                    </div>

                    <input type="submit" className="btn btn-primary sign-up-button input-control" value="Submit" onClick={this.setDate}/>
                </form>
                </div>
                </div>
            </div>
        );
    }

}

// <form>
//   <div class="mb-3">
//     <label for="exampleInputEmail1" class="form-label">Email address</label>
//     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
//     <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
//   </div>
//   <div class="mb-3">
//     <label for="exampleInputPassword1" class="form-label">Password</label>
//     <input type="password" class="form-control" id="exampleInputPassword1">
//   </div>
//   <div class="mb-3 form-check">
//     <input type="checkbox" class="form-check-input" id="exampleCheck1">
//     <label class="form-check-label" for="exampleCheck1">Check me out</label>
//   </div>
//   <button type="submit" class="btn btn-primary">Submit</button>
// </form>

export default signupPage;