import axios from 'axios';
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { API_URL } from '../components/constants';

function Projects() {

    const [pageIndex, setPageIndex] = useState(0);

    async function loadProjects() {
        await axios.get(API_URL + '/api/projects?size=10&page=' + pageIndex)
            .then(res => {
                console.log(res.data);
            })


    }
    loadProjects();

    return (
        <div>
            <h1>Projects</h1>
            <div className="w-50">
                <Carousel>
                    <Carousel.Item>
                        <img
                            src="http://localhost:8080/api/image/136"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src="http://localhost:8080/api/image/136"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default Projects;