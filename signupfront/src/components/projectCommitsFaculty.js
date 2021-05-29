import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import CommitItem from "./commitItems";

const ProjectCommits = () => {

    const [project, setProject] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            console.log(id);
            const res = await axios.get("http://localhost:5000/app/get-project-commit", {
                params: {
                    projectid: id
                }
            });
            setProject(res.data);
        }
        fetchData();
    }, []);

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
        </div>
    );
}

export default ProjectCommits;