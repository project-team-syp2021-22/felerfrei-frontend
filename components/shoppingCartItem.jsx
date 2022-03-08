import React, { useEffect } from "react";
import { API_URL } from "constants";
import Divider from "./divider";
import styles from '../styles/cart/shoppingCartItem.module.css';
import axios from "axios";
import { useAuth } from "./authprovider";

export default function ShoppingCartItem(props) {

    const { userToken } = useAuth();

    useEffect(() => {
        // update product
    })

    async function handleDelete() {
        await axios.put(`http://localhost:8080/api/deleteFromCart`, {
            orderContentId: props.id,
            amount: props.quantity
        }, {
            headers: {
                'Authorization': `Bearer ${userToken.token}`,
            }
        });
    }

    console.log(props);
    return (
        <>
            <div className="mt-3 mb-3 w-100 d-flex flex-row">
                <img height="200px" src={`http://localhost:8080/api/image/${props.image}`} alt={"Mein Bild"}></img>
                <div className="ms-3 d-flex flex-row">
                    <div className="d-flex flex-column">
                        <div>
                            <h4>{props.name}</h4>
                        </div>
                        <div>
                            <div className={styles.extra}>
                                {props.extra &&
                                    <>
                                        <h5>
                                            Personalisierung:
                                        </h5>
                                        {props.extra}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex flex-column justify-content-between h-100">
                            <div className="me-3 ms-3">
                                <h5>{Number(props.price).toFixed(2)} € </h5>
                            </div>
                            <div className="ms-3 me-3 d-flex justify-content-center">
                                <div onClick={handleDelete} className={styles.delete}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
        </>
    );
}
