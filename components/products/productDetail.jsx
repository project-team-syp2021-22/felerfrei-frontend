import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import ImageSlider from "./imageSlider";
import axios from "axios";
import {API_URL} from "../constants";

export default function ProductDetail({productID}) {

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState()

    useEffect(() => {
        loadProduct(productID);
    }, []);

    async function loadProduct(index) {
        setLoading(true);
        await axios.get(API_URL + '/api/products/' + index)
            .then(res => {
                console.log(res.data.content, index);
                setProduct(res.data.content);
            })
            .catch(err => {
                console.log(err);
            });
        setLoading(false);
    }

    return <div> {!loading &&
        <div className="productDetailBox">

            {/*<div className="productDetailImages">
                <ImageSlider images={product.images} className="productDetailImages"/>
            </div>*/}
            <div className="productDetailContent">
                <h1 className="productDetailHeader">{product.name}</h1>
                <p className="productDetailDescription">{product.description}</p>
            </div>

            <div className="d-flex justify-content-between productDetailBottomBox">
                <Container className="productDetailBottomContainer ps-4">
                    <h1 className="productDetailBottomPrice m-0">{product.price.toFixed(2)} €</h1>
                    <Button variant={"outline-dark"} className="productDetailBottomButton">in den Warenkorb</Button>
                </Container>
            </div>
        </div>
    }
    </div>
}