import React, { useEffect, useState } from "react";
import axios from "axios";
import {Modal} from "react-bootstrap";
import { useParams } from "react-router";
import CommitItem from "./commitItems";

const ProjectCommits = () => {

    const [project, setProject] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("http://localhost:5000/app/get-project-commit", {
                params: {
                    projectid: id
                }
            });
            setProject(res.data);
        }
        fetchData();
    }, []);
    
    const [commitMessage, setCommitMessage] = useState([]);
    const [projectUpdate, setProjectUpdate] = useState([]);    

    const [show, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(prev => !prev);
    }
    const handleClose = () => {
        setShowModal(false);
        window.location.reload(false);
    }

    const handleCommitMessage = (event) => {
        setCommitMessage(event.target.value);
    }

    const handleProjectUpdate = (event) => {
        setProjectUpdate(event.target.value);
    }

    const onSubmitClick = async(event) => {
        event.preventDefault();
        let commitModel = {
            projectid: id,
            commitMessage: commitMessage,
            projectUpdate: projectUpdate
        };
        const response = await axios.post("http://localhost:5000/app/add-project-commit", commitModel);
        if(response.data) {
            alert("Commit Submitted Successfully.");
            setCommitMessage("");
            setProjectUpdate("");
        }
    }

    let commitItems = project.map((item) =>
        <CommitItem pitem={item} />
    );

    return(
        <div className="main-container" style={{height: '100%'}}>
            <div className="top-container">
                <h3>Commit/(s) List</h3>
                <div>
                    {commitItems}
                </div>
            </div>
            <div className="add-div">
                <button onClick={openModal} className="plus-button">+</button>
            </div>

            <Modal show={show} onHide={handleClose} dialogClassName="modal-80w">
            <Modal.Header>
            <Modal.Title>Add Commit</Modal.Title>
            <a><i class="fas fa-times close-modal" onClick={handleClose}></i></a>
            </Modal.Header>
            <Modal.Body>
                <div className="Modalbody">
                <form onSubmit={onSubmitClick}>             
                    <div className="mb-2">
                        <label htmlFor="project-name" className="form-label">Commit Message</label>
                        <input type="text" className="form-control input-control" placeholder="Commit Message" id="commit-msg" name="commit-msg" value={commitMessage} onChange={handleCommitMessage} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="project-update" className="form-label">Project Update</label>
                        <textarea  className="form-control input-control" placeholder="Project Update" id="project-update" name="project-update" cols="40" rows="5" value={projectUpdate} onChange={handleProjectUpdate}></textarea>
                    </div>
                    
                    <input type="submit" style={{marginTop: "10px"}} className="btn btn-primary sign-up-button input-control" value="Submit" />
                </form>
                </div>
            </Modal.Body>
            </Modal>
        </div>
    );
}

export default ProjectCommits;