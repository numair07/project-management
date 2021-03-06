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
        this.changeEID = this.changeEID.bind(this);
        this.changeRollNumber = this.changeRollNumber.bind(this);
        this.setDate = this.setDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateEnrollmentId = this.validateEnrollmentId.bind(this);
        this.validateFullName = this.validateFullName.bind(this);
        this.validateRollNo = this.validateRollNo.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
    }

    state = {
        isEmail: 1,
        isFullName: 1,
        isRollNo: 1,
        isPassword: 1,
        isEid: 1,
        isUsername: 1,
        fullname : "",
        username : "",
        email : "",
        password : "",
        date : Date,
        enrollmentid: "",
        rollno: ""
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

    changeEID(event) {
        this.setState ({
            enrollmentid: event.target.value
        });
    }

    changeRollNumber(event) {
        this.setState ({
            rollno: event.target.value
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
        if(this.state.isFullName === 1 && this.state.isUsername === 1 && this.state.isRollNo === 1 && this.state.isPassword === 1 && this.state.isEid && this.state.isEmail) {
        let registered = {
            fullname: this.state.fullname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            enrollmentid: this.state.enrollmentid,
            rollno: this.state.rollno,
            date: this.state.date
        };

        console.log(registered);

        const response = await axios.post("http://localhost:5000/app/signup", registered);
        console.log(response);
        console.log(response.data);

        if(response.data === "EMAIL" || response.data === "USERNAME" || response.data === "EID" || response.data === "ROLLNO") {
            if(response.data === "EMAIL") {
                alert("This E-Mail ID is already in use, please try another one.");
            }
            else if(response.data === "USERNAME") {
                alert("This username is already in use, please try another one.");
            }
            else if(response.data === "EID") {
                alert("Enrollment ID is already associated with an account, please Login.");
            }
            else if(response.data === "ROLLNO") {
                alert("Incorrect Roll No.");
            }
        }
        else {
            this.setState ({
                fullname: "",
                username: "",
                email: "",
                password: "",
                enrollmentid: "",
                rollno: ""
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
        const regularexp = /^[a-zA-Z]+$/;
        const fullName = this.state.fullname;
        if(fullName === "") {
            this.state.isFullName = 0;
            return(<p className="error-message">Full Name cannot be empty.</p>);
        }
        if(!regularexp.test(fullName)) {
            this.state.isFullName = 0;
            return(<p className="error-message">Invalid Input.</p>);
        }
        this.state.isFullName = 1;
    }

    validateEnrollmentId() {
        const facid = this.state.enrollmentid;
        if(facid.length === 0) {
            this.state.isEid = 0;
            return(<p className="error-message">Enrollment ID cannot be empty.</p>);
        }
        this.state.isEid = 1;
    }

    validateUsername() {
        const regularexp = /^[a-zA-Z0-9_.-]+$/;
        if(!regularexp.test(this.state.username)) {
            this.state.isUsername = 0;
            return(<p className="error-message">Invalid username.</p>);
        }
        this.state.isUsername=1;
    }

    validateRollNo() {
        const regularexp = /^[0-9]+$/;
        const rollno = this.state.rollno;
        if(!regularexp.test(rollno)) {
            this.state.isRollNo = 0;
            return(<p className="error-message">Invalid Roll No.</p>);
        }
        this.state.isRollNo = 1;
    }

    render() {
        return (
            <div className="main-container">
                <div class-name="top-container">
    
                <div className="signup-container">
                <form onSubmit = {this.onSubmit}>
                    <h3>Student Signup</h3>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="form-label">Full Name</label>
                        <input type="text" className="form-control input-control" placeholder="Full Name" id="fullname" name="fullname" onChange={this.changeFullName} value={this.state.fullname} />
                        {this.validateFullName()}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="form-label">username</label>
                        <input type="text" className="form-control input-control" placeholder="username"  id="username" name="username" onChange={this.changeuserName} value={this.state.username} />
                        {this.validateUsername()}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="enrollmentid" className="form-label">Enrollment ID</label>
                        <input type="text" className="form-control input-control" placeholder="PICT-EID"  id="enrollmentid" name="enrollmentid" onChange={this.changeEID} value={this.state.enrollmentid} />
                        {this.validateEnrollmentId()}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rollno" className="form-label">Roll Number</label>
                        <input type="text" className="form-control input-control" placeholder="PICT Roll-No"  id="rollno" name="Roll NO" onChange={this.changeRollNumber} value={this.state.rollno} />
                        {this.validateRollNo()}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">EMail-ID</label>
                        <input type="email" className="form-control input-control" placeholder="email" id="email" name="email" onChange={this.changeEmail} value={this.state.email} />
                        {this.validateEmail()}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control input-control" placeholder="password" id="password" name="password" onChange={this.changePassword} value={this.state.password} />
                        {this.validatePassword()}
                    </div>

                    <input type="submit" className="btn btn-primary sign-up-button input-control" value="Submit" onClick={this.setDate}/>
                </form>
                </div>
                </div>
            </div>
        );
    }

}

export default signupPage;