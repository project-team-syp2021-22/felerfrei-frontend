import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { API_URL } from '../components/constants';
import Project from '../components/project';

function ProjectList() {

    const [pageIndex, setPageIndex] = useState(0);
    const [projects, setProjects] = useState([]);

    async function loadProjects() {
        await axios.get(API_URL + '/api/projects?size=3&page=' + pageIndex)
            .then(res => {
                setProjects([...projects, ...res.data.content]);
            })
    }

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <div>
            <div className="d-flex w-100 justify-content-center mt-5">
                <div className="w-50">
                    {projects.map((project, index) => {
                        return (
                            <Project key={index} project={project} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProjectList;