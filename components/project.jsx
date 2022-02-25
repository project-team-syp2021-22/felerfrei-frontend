import React from 'react'
import { Carousel } from 'react-bootstrap'
import { API_URL } from './constants'

function Project(props) {

    return (
        <div className="mt-5">
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
                <div className="mt-3">
                    <h3>{props.project.title}</h3>
                </div>
                <div>
                    <p>{props.project.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Project