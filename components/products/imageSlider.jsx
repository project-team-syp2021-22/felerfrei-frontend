import React from "react";
import {Carousel} from "react-bootstrap"

//images sind die komplette URL

export default function ImageSlider({images}) {

    return <Carousel className="imageSlider" interval={30000}>
        {images.map((value, index) =>
            <Carousel.Item key={index}>
                <img className="d-block images" src={value} alt="Bild von Produkt"/>
            </Carousel.Item>
        )}
    </Carousel>
}