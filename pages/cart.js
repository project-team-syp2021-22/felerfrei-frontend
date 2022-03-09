import React, { useEffect, useRef, useState } from 'react'
import { Container, Spinner, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../components/authprovider'
import ShoppingCartItem from "../components/shoppingCartItem.jsx";
import axios from 'axios';
import { API_URL } from "../components/constants";
import FadeInView from '../components/animation/inview';
import Divider from '../components/divider';
import Link from 'next/link';
import { isMetaProperty } from 'typescript';

export default function ShoppingCart() {

    const [order, setOrder] = useState();
    const { user, userToken } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();


    async function deleteAll() {
        axios.put(`${API_URL}/api/clearCart`,{}, {
            headers: {
                'Authorization': `Bearer ${userToken.token}`,
            },
        }).then(async (res) => {
            await loadCart();
        }).catch(err => {
            setError("Wir konnten deinen Warenkorb nicht leeren. Bitte versuche es später noch einmal.");
        });
    }

    async function loadCart() {
        setLoading(true);
        axios.get(`${API_URL}/api/cart`, {
            headers: {
                'Authorization': `Bearer ${userToken.token}`,
            },
        }).then(res => {
            setOrder(res.data);
        }).catch(err => {
            setError("Ihr Warenkorb konnte nicht geladen werden.");
        });
        setLoading(false);
    }

    useEffect(async () => {
        await loadCart();
    }, []);

    return (
        <>
            {loading &&
                <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                    <div>
                        <Spinner />
                    </div>
                </div>
            }
            {!loading &&
                <FadeInView>
                    <div className="d-flex d-table justify-content-center align-items-center h-100 mt-5">
                        <div className="w-100 d-table-cell align-middle" style={{
                            display: "table-cell",
                            verticalAlign: "middle",
                        }}>
                            <Container>
                                <div className="justify-content-center border-bottom border-dark mb-3">
                                    <h2 className="fw-bold">Warenkorb</h2>
                                </div>
                                {order && !order.empty && order.order.orderContents.map((item, index) => {
                                    return (
                                        <ShoppingCartItem
                                            key={item.id}
                                            name={item.product.name}
                                            quantity={item.amount}
                                            extra={item.extrawurscht}
                                            image={item.product.images[0].id}
                                            price={item.product.price}
                                            id={item.id}
                                        />
                                    );
                                })}
                                {
                                    order && order.empty &&
                                    <>
                                        <div className="w-100 d-flex flex-column justify-content-center">

                                            <Alert variant="warning" className="w-75 rounded-0">
                                                Dein Warenkorb ist leer.
                                            </Alert>
                                            <div>
                                                <Link href="/shop">
                                                    Besuche unseren Shop.
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                }
                                {/* <ShoppingCartItem name="Erstes Produkt" image="1" quantity={"2"} change={"Link"}
                                extra="das extrawürstel" />
                            <ShoppingCartItem name="Zweites Produkt" image="2" quantity={"5"} change={"Link"}
                                extra="das extradgsadg adga dg  adawürstel" /> */}
                                {order && !order.empty &&
                                    <>
                                        <div className="w-100 d-flex justify-content-center">

                                            <Button onClick={alert}
                                                className="w-50 rounded-0 mt-4"
                                                variant="dark"
                                                size={"md"}

                                                style={{ transition: '0.5s' }}>
                                                Bestellen
                                            </Button>
                                        </div>

                                        <div className="mt-4">
                                            <div onClick={deleteAll} role="button">Alle Artikel löschen</div>
                                        </div>
                                    </>
                                }
                            </Container>
                        </div>
                    </div>
                </FadeInView>
            }
        </>
    );

}
