import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ImageSlider from "./imageSlider";
// import styles from '../../styles/productListStyles.module.css';
import styles from '../../styles/productListStyles.module.css';
//todo kannst du die productListStyles einbinden? ich schaff das irgendwie nd
export default function ProductDetail({ product }) {

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="m-5 w-100">
                <div className="d-flex justify-content-center">
                    <div className="w-50">
                        <ImageSlider images={product.images} className={styles.productDetailImages} />
                    </div>

                    <div className="ms-4 d-flex w-25 flex-column justify-content-between">
                        <div className="">
                            <h1>{product.name}</h1>
                            <p >{product.description}</p>
                        </div>

                        <div className="d-flex flex-row">
                            <h1 className="m-0">€ {product.price.toFixed(2)}</h1>
                            <Button variant={"outline-dark"} className="rounded-0 ms-5"
                                style={{ transitionDuration: "0.5s" }}>
                                in den Warenkorb
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}