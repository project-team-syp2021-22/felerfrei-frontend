import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ImageSlider from "./imageSlider";
// import styles from '../../styles/productListStyles.module.css';
import styles from '../../styles/products/productListStyles.module.css';
import { motion } from "framer-motion";

export default function ProductDetail({ product }) {

    console.log(product);

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="m-5 w-100">
                <div className="d-flex justify-content-center">
                    <motion.div

                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            transition: {
                                duration: 1,
                                delay: 0.5,
                            }
                        }}
                        className="w-50"
                    >
                        <ImageSlider images={product.images} className={styles.productDetailImages} />
                    </motion.div>

                    <div className="ms-4 d-flex w-25 flex-column justify-content-between">
                        <motion.div className=""
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    duration: 1,
                                    delay: 0.6,
                                }
                            }}
                        >
                            <h1>{product.name}</h1>
                            <p >{product.description}</p>
                            <p><b>Material:</b> {product.material}</p>
                        </motion.div>

                        <motion.div

                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    duration: 1,
                                    delay: 0.6,
                                }

                            }}
                            className="d-flex flex-row"
                        >
                            <h1 className="m-0 text-nowrap">€ {product.price.toFixed(2)}</h1>
                            <Button variant={"dark"} className="rounded-0 ms-5"
                                style={{ transitionDuration: "0.5s" }}>
                                in den Warenkorb
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>

    );
}