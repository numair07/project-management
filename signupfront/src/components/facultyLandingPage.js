import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ProjectItem from "./facultyProjectItem";

const Getprojects = () => {

    const [project, setProject] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("http://localhost:5000/app/faculty/projects", {
                params : {
                    facultyid: id
                }
            });
            setProject(res.data);
        }
        fetchData();
    }, []);

    let projectItems = project.map((item) =>
        <ProjectItem pitem={item} />
    );

    return(
        <div className="main-container" style={{height: '100%'}}>
            <div className="top-container">
                <h3>Project/(s) Guiding :</h3>
                <div>
                    {projectItems}
                </div>
            </div>
        </div>
    );
}

export default Getprojects;