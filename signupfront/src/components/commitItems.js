import React from "react";
import "../stylesheets/styles.css";

class commitItem extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
      const {pitem} = this.props;
      return (
        <div>
            <button className="project-button">
                <h5>Commit Message : {pitem.commitMessage}</h5>
                <p>Project Update : </p>
                <p>{pitem.projectUpdate}</p>
            </button>
        </div>
      );
  }

}

export default commitItem;
