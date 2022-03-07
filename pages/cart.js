import React, { useEffect, useRef, useState } from 'react'
import { Container, Spinner, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../components/authprovider'
import { useRouter } from 'next/router';
import ShoppingCartItem from "../components/shoppingCartItem.jsx";
import axios from 'axios';
import { API_URL } from "../components/constants";
import FadeInView from '../components/animation/inview';

export default function ShoppingCart() {

    const [order, setOrder] = useState();
    const { user, userToken } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();


    useEffect(async () => {
        setLoading(true);
        await axios.get(`${API_URL}/api/cart`, {
            headers: {
                'Authorization': `Bearer ${userToken.token}`,
            },
        }).then(res => {
            console.log(res.data)
            setOrder(res.data);
        }).catch(err => {
            setError("Ihr Warenkorb konnte nicht geladen werden.");
        });
        setLoading(false);
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
                                <div className="justify-content-center">
                                    <h2 className="fw-bold">Warenkorb</h2>
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th width={"200px"} > Bild</th>
                                            <th width={"200px"} >Produkt</th>
                                            <th width={"300px"} >Wunsch</th>
                                            <th width={"50px"} > Stückanzahl</th>
                                            <th width={"20px"} > Löschen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order && order.order.orderContents.map((item, index) => {
                                            return (
                                                <ShoppingCartItem
                                                    name={item.product.name}
                                                    quantity={item.amount}
                                                    extra={item.extrawurscht}
                                                    image={item.product.images[0].id} />
                                            );
                                        })}
                                        {/* <ShoppingCartItem name="Erstes Produkt" image="1" quantity={"2"} change={"Link"}
                                extra="das extrawürstel" />
                            <ShoppingCartItem name="Zweites Produkt" image="2" quantity={"5"} change={"Link"}
                                extra="das extradgsadg adga dg  adawürstel" /> */}
                                    </tbody>
                                </table>

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
                                    <div onClick={alert} role="button">Alle Einträge löschen</div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </FadeInView>
            }
        </>
    );

}
