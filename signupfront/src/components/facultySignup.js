import React from "react";
import axios from "axios";
import "../stylesheets/styles.css";

class facultySignup extends React.Component {
    constructor() {
        super();
        this.changeFullName = this.changeFullName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeFID = this.changeFID.bind(this);
        this.changeDomain = this.changeDomain.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateFacultyId = this.validateFacultyId.bind(this);
        this.validateFullName = this.validateFullName.bind(this);
    }

    state = {
        isEmail: 1,
        isPassword: 1,
        isFacultyId: 1,
        isFullName: 1,
        fullname : "",
        email : "",
        password : "",
        domainname: "",
        facultyid: ""
    }

    changeFullName(event) {
        this.setState ({
            fullname: event.target.value
        });
    }
    
    changeEmail(event) {
        this.setState ({
            email: event.target.value
        });
    }

    changeFID(event) {
        this.setState ({
            facultyid: event.target.value
        });
    }

    changeDomain(event) {
        this.setState ({
            domainname: event.target.value
        });
    }

    changePassword(event) {
        this.setState ({
            password: event.target.value
        });
    }


    async onSubmit(event) {
        event.preventDefault();
        if(this.state.isEmail === 1 && this.state.isFullName === 1 && this.state.isFacultyId === 1 && this.state.isFacultyId === 1) {
        let registered = {
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password,
            domainname: this.state.domainname,
            facultyid: this.state.facultyid,
        };

        console.log(registered);

        const response = await axios.post("http://localhost:5000/app/facultysignup", registered);
        console.log(response);
        console.log(response.data);

        if(response.data === "EMAIL" || response.data === "FID") {
            if(response.data === "EMAIL") {
                alert("This E-Mail ID is already in use, please try another one.");
            }
            else if(response.data === "FID") {
                alert("This Faculty ID is already associated with another account, please Login.");
            }
        }
        else {
            this.setState ({
                fullname: "",
                email: "",
                password: "",
                facultyid: ""
            });
            alert("Sign Up Successful");
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
            return(<p className="error-message">Invalid E-Mail.</p>);
        }
        this.state.isEmail = 1;
    }

    validatePassword() {
        if(this.state.password.length < 6) {
            this.state.isPassword = 0;
            return(<p className="error-message">Password Cannot be Less than 6 characters.</p>);
        }
        this.state.isPassword = 1;
    }

    validateFullName() {
        const regularexp = /^[a-zA-Z\s]+$/;
        const fullName = this.state.fullname;
        if(fullName == "") {
            this.state.isFullName = 0;
            return(<p className="error-message">Full Name cannot be empty.</p>);
        }
        if(!regularexp.test(fullName)) {
            this.state.isFullName = 0;
            return(<p className="error-message">Invalid Input.</p>);
        }
        this.state.isFullName = 1;
    }

    validateFacultyId() {
        const facid = this.state.facultyid;
        if(facid.length === 0) {
            this.state.isFacultyId = 0;
            return(<p className="error-message">Faculty ID cannot be empty.</p>);
        }
        this.state.isFacultyId = 1;
    }

    render() {
        return (
            <div className="main-container">
                <div class-name="top-container">
    
                <div className="signup-container">
                <form onSubmit = {this.onSubmit}>
                    <h3>PICT Faculty Signup</h3>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="form-label">Full Name</label>
                        <input type="text" className="form-control input-control" placeholder="Full Name" id="fullname" name="fullname" onChange={this.changeFullName} value={this.state.fullname} />
                        {this.validateFullName()}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="facultyid" className="form-label">Faculty ID</label>
                        <input type="text" className="form-control input-control" placeholder="PICT-FID"  id="facultyid" name="facultyid" onChange={this.changeFID} value={this.state.facultyid} />
                        {this.validateFacultyId()}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">EMail-ID</label>
                        <input type="email" className="form-control input-control" placeholder="email" id="email" name="email" onChange={this.changeEmail} value={this.state.email} />
                        {this.validateEmail()}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="domain-name" className="form-label">Select Domain Name </label>
                        <br></br>
                        <select name="domain-name" id="domain-name" onChange={this.changeDomain} value={this.state.domainname}>
                            <option value="AI">Artificial Intelligence</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Android Development">Android/IOS Development</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control input-control" placeholder="password" id="password" name="password" onChange={this.changePassword} value={this.state.password} />
                        {this.validatePassword()}
                    </div>

                    <input type="submit" className="btn btn-primary sign-up-button input-control" value="Submit"/>
                </form>
                </div>
                </div>
            </div>
        );
    }
}

export default facultySignup;