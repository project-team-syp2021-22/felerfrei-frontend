import React from 'react'
import { Carousel } from 'react-bootstrap'
import { API_URL } from './constants'
import styles from "../styles/project.module.css";

function Project(props) {

    return (
        <div className={styles.parent}>
            <div>
                <h3>{props.project.title}</h3>
            </div>
            <div>
                <Carousel>
                    {props.project.images.map((image, index) => {
                        return (
                            <Carousel.Item key={image.id}>
                                <img
                                    className="d-block w-100"
                                    src={`${API_URL}/api/image/${image.id}`}
                                />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
            <div>
                <div>
                    {new Date(props.project.date).toLocaleDateString()}
                </div>
                <div className={styles.description}>
                    <p>{props.project.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Project