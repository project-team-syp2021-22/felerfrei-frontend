import React, { useEffect, useState } from 'react'
import { Container, Spinner, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../components/authprovider'
import ShoppingCartItem from "../components/shoppingCartItem.jsx";
import axios from 'axios';
import { API_URL } from "../components/constants";
import FadeInView from '../components/animation/inview';
import Link from 'next/link';
import styles from '../styles/cart/cart.module.css';
import OrderModalPage from "../components/orderModalpage";
import Footer from "../components/footer";

export default function ShoppingCart() {

    const [order, setOrder] = useState();
    const { userToken } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [showModal, setShowModal] = useState(false);

    async function deleteAll() {
        axios.put(`${API_URL}/api/clearCart`, {}, {
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
            console.log(res.data);
            setOrder(res.data);
        }).catch(err => {
            setError("Ihr Warenkorb konnte nicht geladen werden.");
        });
        setLoading(false);
    }

    useEffect(async () => {
        await loadCart();
    }, []);

    function orderNow() {
        if (order) {
            setShowModal(true);
        }
    }

    return (
        <div style={{ height: "calc(100vh - 83px)", alignContent: "space-evenly" }}>
            <div style={{ height: "calc(100% - 290px)" }}>
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
                                        <div className="d-flex flex-row justify-content-between">
                                            <h2 className="fw-bold">Warenkorb</h2>
                                            <div className={`m-2 ${styles.fitContent}`}>
                                                <div onClick={deleteAll} role="button">Warenkorb leeren</div>
                                            </div>
                                        </div>
                                    </div>
                                    {order && !order.empty && order.order.orderContents.map((item, index) => {
                                        return (
                                            <ShoppingCartItem
                                                key={item.id}
                                                productId={item.product.id}
                                                name={item.product.name}
                                                quantity={item.amount}
                                                extra={item.extrawurscht}
                                                image={item.product.images[0].id}
                                                price={item.product.price}
                                                id={item.id}
                                            />
                                        );
                                    })}

                                    {!loading &&
                                        <OrderModalPage
                                            show={showModal}
                                            userToken={userToken}
                                            onHide={() => setShowModal(false)}
                                        />
                                    }
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

                                    {order && !order.empty &&
                                        <>
                                            <div className="w-100 d-flex justify-content-center">

                                                <Button onClick={orderNow}
                                                    className="w-50 rounded-0 mt-4 mb-4"
                                                    variant="dark"
                                                    size={"md"}

                                                    style={{ transition: '0.5s' }}>
                                                    Bestellen
                                                </Button>
                                            </div>
                                        </>
                                    }
                                </Container>
                            </div>
                        </div>
                    </FadeInView>
                }
            </div>

            <Footer />
        </div>
    );

}


export async function getServerSideProps(context) {
    let token = context.req.cookies.token;
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            },
            props: {},
        };
    }
    return {
        props: {}
    };
}