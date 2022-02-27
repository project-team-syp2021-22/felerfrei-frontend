import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from '../components/constants';
import Project from '../components/project';
import Divider from '../components/divider';
import Footer from '../components/footer';

function ProjectList() {

    let pageIndex = 0;
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [last, setLast] = useState(false);

    async function loadProjects(index) {
        if (last) {
            return;
        }
        setLoading(true);
        await axios.get(API_URL + '/api/projects?size=3&page=' + index)
            .then(res => {
                if (res.data.last) {
                    setLast(true);
                }
                console.log(res.data.content, pageIndex);
                setProjects([...projects, ...res.data.content]);
            })
            .catch(err => {
                console.log(err);
            });
        setLoading(false);
    }

    function showMore() {
        loadProjects(pageIndex += 1);
    }


    useEffect(() => {
        loadProjects(0);
    }, []);

    return (
        <div>
            <div className="w-100 d-flex justify-content-center">
                <div className="d-flex flex-column w-100">
                    <div className="d-flex flex-column w-100 justify-content-center">
                        {projects.map((project, index) => {
                            return (
                                <>
                                    <div className="d-flex w-100 mb-3 mt-5 justify-content-center">
                                        <Project key={index} project={project} />
                                    </div>
                                    <Divider />
                                </>
                            );
                        })}

                    </div>
                    <div className="w-100 d-flex justify-content-center">
                        <div className="mt-5 mb-5">
                            {!last &&
                                <Button
                                    disabled={loading}
                                    variant="outline-dark"
                                    className="w-100 rounded-0"
                                    size={"md"}
                                    style={{ transition: '0.5s' }}
                                    onClick={showMore}>Mehr Anzeigen</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProjectList;