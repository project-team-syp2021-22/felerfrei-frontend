import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ImageSlider from "./imageSlider";
// import styles from '../../styles/productListStyles.module.css';
import styles from '../../styles/products/productListStyles.module.css';
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../constants";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../authprovider";

export default function ProductDetail({ product }) {

    const { userToken } = useAuth();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    function handleClose() {
        setShowModal(false);
    }

    async function addTooCart() {
        setError(null);
        setSuccess(null);

        axios.put(`${API_URL}/api/addTooCart`, {
            productId: product.id,
            amount: 1,
            extra: null,
        }, {
            headers: {
                'Authorization': `Bearer ${userToken.token}`
            },
        })
            .then(res => {
                setSuccess("Proukt wurde zum Warenkorb hinzugefügt");
            })
            .catch(err => {
                setError("Produkt konnte nicht zum Warenkorb hinzugefügt werden");
            })
            .then(() => setShowModal(true));
    }

    return (
        <>
            <div className="w-100 d-flex justify-content-center mb-5" style={{ height: "90vh" }}>
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
                                className="d-flex flex-column"
                            >
                                <h1 className="m-0 text-nowrap">€ {product.price.toFixed(2)}</h1>
                                <Button
                                    variant={"dark"}
                                    className="rounded-0 w-100"
                                    style={{ transitionDuration: "0.5s" }}
                                    onClick={addTooCart}
                                >
                                    in den Warenkorb
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{success ? 'Erfolgreich hinzugefügt!' : 'Fehler!'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {success ?? error}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => {handleClose(); router.push("/cart")}}>
                        Warenkorb
                    </Button>
                    <Button variant="dark" onClick={() => { handleClose(); router.push("/shop") }}>
                        Zurück zum Shop
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}