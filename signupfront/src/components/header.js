import react from "react";
import "../stylesheets/styles.css"

class Header extends react.Component {
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="http://localhost:3000">Daily Dose of Numair</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul className="navbar-nav ml-auto">
                                <li><a className="nav-link" aria-current="page" href="http://localhost:3000/sign-up">signup</a></li>
                                <li><a className="nav-link" aria-current="page" href="http://localhost:3000/log-in">login</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;