import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import signupPage from "./components/signupPage";
import Header from "./components/header";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/sign-up/" component = {signupPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;