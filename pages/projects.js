import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from '../components/constants';
import Project from '../components/project';
import Divider from '../components/divider';
import Footer from '../components/footer';
import HeadingAndContent from '../components/headingAndContent';
import FadeInView from '../components/animation/inview';

let pageIndex = 1;
const pageSize = 3;
function ProjectList({ serverProjects }) {

    const [projects, setProjects] = useState(serverProjects.projects);
    const [loading, setLoading] = useState(false);
    const [last, setLast] = useState(serverProjects.last);

    async function loadProjects(index) {
        if (last) {
            return;
        }
        setLoading(true);
        await axios.get(`${API_URL}/api/projects?size=${pageSize}&page=${index}`)
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

    return (
        <div>
            <FadeInView>

                <HeadingAndContent
                    heading="Lorem ipsum"
                    subheading="Unterüberschrift"
                    content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
                />
                <Divider />
            </FadeInView>
            <div className="w-100 d-flex justify-content-center">
                <div className="d-flex flex-column w-100">
                    <div className="d-flex flex-column w-100 justify-content-center">
                        {projects.map((project, index) => {
                            return (
                                <>
                                    <FadeInView>
                                        <div className="d-flex w-100 mb-3 mt-5 justify-content-center">
                                            <Project key={index} project={project} />
                                        </div>
                                        <Divider />
                                    </FadeInView>
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

export async function getServerSideProps(context) {
    let projects = [];
    let last = false;
    await axios.get(`${API_URL}/api/projects?size=${pageSize}&page=0`)
        .then(res => {
            if (res.data.last) {
                last = true;
            }
            projects = res.data.content;
        })
        .catch(err => {
            console.log(err);
        });
    return {
        props: {
            serverProjects: {
                projects,
                last
            }
        }
    };
}

export default ProjectList;