import React from 'react'
import { Carousel } from 'react-bootstrap'
import { API_URL } from './constants'

function Project(props) {

    function formatDate(date) {
    }

    return (
        <div className="w-50">
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
                <div className="mt-3" style={{ fontSize: "15pt" }}>
                    <p>{props.project.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Project