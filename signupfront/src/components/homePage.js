import React from "react";

class homePage extends React.Component {
    render() {
        return (
        <div className="main-container2" style={{height: '100%'}}>
            <div>
                <h2>Welcome</h2>
                <h3>To</h3>
                <h2>PICT's</h2>
                <h3>Project Management System</h3>
            </div>
            <div className="button-container">
                <a class="btn intro-button btn-dark" href="http://localhost:3000/faculty-signup" role="button">Faculty Signup</a>
                <a class="btn intro-button btn-dark" href="http://localhost:3000/sign-up" role="button">Student Signup</a>
            </div>
        </div>
        );
    }
}

export default homePage;