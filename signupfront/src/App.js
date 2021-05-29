import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import signupPage from "./components/signupPage";
import loginPage from "./components/loginPage";
import Header from "./components/header";
import projects from "./components/projects";
import facultySignup from "./components/facultySignup";
import facultyLogin from "./components/facultyLogin";
import facultyLandingPage from "./components/facultyLandingPage";
import homePage from "./components/homePage";
import projectCommits from "./components/projectCommits";
import projectCommitsFaculty from "./components/projectCommitsFaculty";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/sign-up/" component = {signupPage} />
                    <Route path="/login/" component = {loginPage} />
                    <Route path="/faculty-signup/" component={facultySignup} />
                    <Route path="/faculty-login/" component={facultyLogin} />
                    <Route path="/forgot-password/" />
                    <Route path="/faculty/project/:id" component = {projectCommitsFaculty} />
                    <Route path="/faculty/:id" component={facultyLandingPage} />
                    <Route path="/project/:id" component = {projectCommits} />
                    <Route path="/:id" component={projects} />
                    <Route path="/" component={homePage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;