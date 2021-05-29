import React, { useEffect, useState } from "react";
import axios from "axios";
import {Modal} from "react-bootstrap";
import { useParams } from "react-router";
import ProjectItem from "./projectItem";

const Getprojects = () => {

    const [project, setProject] = useState([]);
    const [projectName, setProjectName] = useState([]);
    const [facultyName, setFacultyName] = useState([]);
    const [domainName, setDomainName] = useState([]);
    const [stu1, setStu1] = useState([]);
    const [stu2, setStu2] = useState([]);
    const [stu3, setStu3] = useState([]);

    const [facultyList, updateFacultyList] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://localhost:5000/app/projects/${id}`);
            setProject(res.data);
        }
        fetchData();
    }, []);
    
    const [show, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(prev => !prev);
    }
    const handleClose = () => {
        setShowModal(false);
        window.location.reload(false);
    }
    const handleName = (event) => {
        setProjectName(event.target.value);
    }

    const handleDomain = async(event) => {
        updateFacultyList([]);
        setDomainName(event.target.value);
        const response = await axios.get("http://localhost:5000/app/get-faculties", {
            params : {
                domain: event.target.value
            }
        });
        const facultyData = response.data;
        const dt = facultyData.map(items => {
            let fac = {
                value: items.facultyid,
                label: items.fullname
            }
            return fac;
        });
        updateFacultyList(dt);
    }

    const handleFaculty = (event) => {
        console.log(event.target.value);
        setFacultyName(event.target.value);
    }

    const handleStudentOne = async(event) => {
        setStu1(event.target.value);
    }

    const handleStudentTwo = async(event) => {
        setStu2(event.target.value);
    }
    
    const handleStudentThree = async(event) => {
        setStu3(event.target.value);
    }

    let optionItems = facultyList.map((item) =>
        <option value={item.value}>{item.label}</option>
    );

    let projectItems = project.map((item) =>
        <ProjectItem pitem={item} />
    );

    const onSubmitClick = async(event) => {
        event.preventDefault();
        let projectModel = {
            projectName: projectName,
            domainName: domainName,
            facultyid: facultyName,
            teamMemberCount: 3,
            teamMembers : [stu1, stu2, stu3]
        };

        console.log(projectModel);

        const res1 = await axios.get("http://localhost:5000/app/get-student-details", {
            params : {
                eid: stu1
            }
        });

        const res2 = await axios.get("http://localhost:5000/app/get-student-details", {
            params : {
                eid: stu2
            }
        });

        const res3 = await axios.get("http://localhost:5000/app/get-student-details", {
            params : {
                eid: stu3
            }
        });

        console.log(stu1);
        console.log(stu2);
        console.log(stu3);

        if(res1.data === "FALSE") {
            alert("Could not find Student 1, please try again");
        }
        else if(res2.data === "FALSE") {
            alert("Could not find Student 2, please try again");
        }
        else if(res3.data === "FALSE") {
            alert("Could not find Student 3, please try again");
        }
        else {
            const response = await axios.post("http://localhost:5000/app/add-project", projectModel);
            console.log(response);
            alert("Project Added Successfully");
            const abc = handleClose;
            setDomainName("");
            setStu1("");
            setStu2("");
            setStu3("");
            setFacultyName("");
            setProjectName("");
        }


    }

    return(
        <div className="main-container" style={{height: '100%'}}>
            <div className="top-container">
                <h3>Your Project/(s) List</h3>
                <div>
                    {projectItems}
                </div>
            </div>
            <div className="add-div">
                <button onClick={openModal} className="plus-button">+</button>
            </div>

            <Modal show={show} onHide={handleClose} dialogClassName="modal-80w">
            <Modal.Header>
            <Modal.Title>Add Project</Modal.Title>
            <a><i class="fas fa-times close-modal" onClick={handleClose}></i></a>
            </Modal.Header>
            <Modal.Body>
                <div className="Modalbody">
                <form onSubmit={onSubmitClick}>             
                    <div className="mb-2">
                        <label htmlFor="project-name" className="form-label">Project Name</label>
                        <input type="text" className="form-control input-control" placeholder="Enter Project Name" id="project-name" name="project-name" value={projectName} onChange={handleName} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="domain-name" className="form-label">Select Domain Name </label>
                        <br></br>
                        <select name="domain-name" id="domain-name" value={domainName} onChange={handleDomain} placeholder="Select Domain">
                            <option value="AI">Artificial Intelligence</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Android Development">Android/IOS Development</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="faculty-name" className="form-label">Select Faculty Name</label>
                        <br></br>
                        <select name="faculty-name" id="faculty-name" onChange={handleFaculty} placeholder="Select Faculty">
                            {optionItems}
                        </select>
                    </div>
                    

                    <div className="mb-2">
                        <label htmlFor="stu-1" className="form-label">Student 1 Enrollment ID</label>
                        <input type="text" className="form-control input-control" value={stu1} placeholder="Student 1 EID" id="stu-1" name="stu-1" onChange={handleStudentOne} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="stu-2" className="form-label">Student 2 Enrollment ID</label>
                        <input type="text" className="form-control input-control" value={stu2} placeholder="Student 2 EID" id="stu-2" name="stu-2" onChange={handleStudentTwo} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="stu-3" className="form-label">Student 3 Enrollment ID</label>
                        <input type="text" className="form-control input-control" value={stu3} placeholder="Student 3 EID" id="stu-3" name="stu-3" onChange={handleStudentThree} />
                    </div>
                    <input type="submit" style={{marginTop: "10px"}} className="btn btn-primary sign-up-button input-control" value="Submit" />
                </form>
                </div>
            </Modal.Body>
            </Modal>
        </div>
    );
}

export default Getprojects;