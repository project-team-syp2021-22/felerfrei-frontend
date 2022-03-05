import React from "react";
import { Carousel } from "react-bootstrap"
import { API_URL } from "../constants";
import styles from '../../styles/products/productListStyles.module.css';

// images sind ein Array von den IDs
export default function ImageSlider({ images }) {

    return <Carousel className="imageSlider w-100" interval={30000}>
        {images.map((value, index) =>
            <Carousel.Item key={index}>
                <img className={`${styles.images} d-block`} src={`${API_URL}/api/image/${value.id}`} alt="Bild von Produkt" />
            </Carousel.Item>
        )}
    </Carousel>
}