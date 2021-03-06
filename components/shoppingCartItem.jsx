import React, { useEffect, useState } from "react";
import { API_URL } from "./constants.js";
import Divider from "./divider";
import styles from "../styles/cart/shoppingCartItem.module.css";
import axios from "axios";
import { useAuth } from "./authprovider";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";

export default function ShoppingCartItem(props) {
    const { userToken } = useAuth();
    const router = useRouter();
    const [quantity, setQuantity] = useState(props.quantity);

    async function changeQuantity(newQuantity) {
        axios.put(`${API_URL}/api/setProductInCart`, {
            orderContentId: props.id,
            amount: newQuantity,
        }, {
            headers: {
                "Authorization": `Bearer ${userToken.token}`,
            },
        }).then(res => {
            let newQuantity = parseInt(res.data["message"]);
            setQuantity(newQuantity);
        }).catch(err => {

        });
    }

    async function handleDelete() {
        axios
            .put(
                `${API_URL}/api/deleteFromCart`,
                {
                    orderContentId: props.id,
                    amount: quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken.token}`,
                    },
                }
            )
            .then((res) => {
                router.reload();
            })
            .catch((err) => { });
    }

    console.log(props);
    return (
        <>
            <div className={styles.listItem}>
                <img
                    className={styles.image}
                    src={`${API_URL}/api/image/${props.image}`}
                    alt={"Mein Bild"}
                />
                <div className={styles.listItemDetails}>
                    <div className={styles.listItemTitle}>
                        <div
                            className={styles.name}
                            onClick={() => router.push(`/shop/${props.productId}`)}
                        >
                            <h4>{props.name}</h4>
                        </div>
                        <div className={styles.extra}>
                            {props.extra && (
                                <>
                                    <h5>Personalisierung:</h5>
                                    {props.extra}
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className={styles.listItemAmountPrice}>
                            <div className="me-3 ms-3">
                                <h5>{Number(props.price).toFixed(2)} ??? </h5>
                            </div>
                            <div className="w-100 d-flex justify-content-center border-0">
                                <Dropdown>
                                    <Dropdown.Toggle className="bg-white border-0" variant="light" id="dropdown-basic">
                                        {quantity}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="light">
                                        {
                                            [...Array(10).keys()].map((i) => (
                                                <Dropdown.Item key={`item${i}`} onClick={() => changeQuantity(i + 1)}>
                                                    {i + 1}
                                                </Dropdown.Item>
                                            ))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                                <span className="mt-2 ms-1">
                                    Stk.
                                </span>
                            </div>
                            <div className="ms-3 me-3 d-flex justify-content-center">
                                <div onClick={handleDelete} className={styles.delete}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="bi bi-trash"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                        />
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
