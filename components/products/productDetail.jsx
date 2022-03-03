import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ImageSlider from "./imageSlider";
// import styles from '../../styles/productListStyles.module.css';
import styles from '../../styles/productListStyles.module.css';
//todo kannst du die productListStyles einbinden? ich schaff das irgendwie nd
export default function ProductDetail({ product }) {

    return (
        <div>
            <div className={styles.productDetailBox}>
                <div className={styles.productDetailImages}>
                    <ImageSlider images={product.images} className={styles.productDetailImages} />
                </div>
                <div className={styles.productDetailContent}>
                    <h1 className={styles.productDetailHeader}>{product.name}</h1>
                    <p className={styles.productDetailDescription}>{product.description}</p>
                </div>

                <div className={`d-flex justify-content-between ${styles.productDetailBottomBox}`}>
                    <Container className={`${styles.productDetailBottomContainer} ps-4`}>
                        <h1 className={`${styles.productDetailBottomPrice} m-0`}>{product.price.toFixed(2)} €</h1>
                        <Button variant={"outline-dark"} className={styles.productDetailBottomButton}>in den Warenkorb</Button>
                    </Container>
                </div>
            </div>
        </div>

    );
}