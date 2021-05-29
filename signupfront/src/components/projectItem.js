import React from "react";
import "../stylesheets/styles.css";

class projectItem extends React.Component {

  constructor (props) {
    super(props);
    this.goToProject = this.goToProject.bind(this);
  }

  goToProject() {
    window.location.pathname = `/project/${this.props.pitem._id}`;
  }

  render() {
      const {pitem} = this.props;
      return (
        <div>
            <button className="project-button" onClick = {() => {this.goToProject();}}>
                <h3>{pitem.projectName}</h3>
                <h5>Domain - {pitem.domainName}</h5>
                <p>Project Guide : {pitem.facultyid}</p>
                <p>Member 1 : {pitem.memberOne} </p>
                <p>Member 2 : {pitem.memberTwo} </p>
                <p>Member 3 : {pitem.memberThree} </p>
            </button>
        </div>
      );
  }

}

export default projectItem;
