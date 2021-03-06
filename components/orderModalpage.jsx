import {
    Accordion, Alert,
    Button,
    Card,
    Form,
    FormControl,
    ListGroup,
    Modal,
    OverlayTrigger,
    Popover,
    Row,
} from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/cart/orderpage.module.css";
import Link from "next/link";
import { API_URL } from "./constants";
import axios from "axios";
import { useRouter } from "next/router";

export default function OrderModalPage({ show, onHide, userToken }) {

    const [delivery, setDelivery] = useState(true);
    const ortRef = useRef();
    const postleitzahlRef = useRef();
    const strasseRef = useRef();
    const hausnummerRef = useRef();
    const [loading, setLoading] = useState();
    const [order, setOrder] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    let router = useRouter();

    function orderNow() {
        if (success) {
            return router.reload();
        }
        setError(null);
        setSuccess(null);
        if (delivery) {
            if (ortRef.current.value === "" || postleitzahlRef.current.value === "" || strasseRef.current.value === "" || hausnummerRef.current.value === "") {
                return setError("Bitte alle Felder ausfüllen!");
            }
        }
        axios.post(`${API_URL}/api/order`, {
            delivery,
            street: delivery ? strasseRef.current.value : "",
            houseNumber: delivery ? hausnummerRef.current.value : "",
            city: delivery ? ortRef.current.value : "",
            zip: delivery ? postleitzahlRef.current.value : ""
        }, {
            headers: {
                Authorization: `Bearer ${userToken.token}`,
            }
        }).then((res) => {
            show = false;
            setSuccess("Bestellung erfolgreich abgeschickt!");
        })
            .catch((err) => setError("Bestellung konnte nicht abgeschickt werden!"));
    }

    async function loadCart() {
        setLoading(true);
        await axios.get(`${API_URL}/api/cart`, {
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

    function handleClose() {
        onHide();
        if (success) {
            return router.push("/");
        }
    }

    useEffect(async () => {
        await loadCart();
    }, [show]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            keyboard={false}
            size={'xl'}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Produkte bestellen
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <div className="w-100 h-100 justify-content-between">
                    {/* <div className="d-flex justify-content-xl-between"> */}
                    <div className={styles.parent}>
                        <div className={styles.column}>
                            <Form>
                                <Form.Group controlID="deliveryOrNot">
                                    <Form.Label>
                                        <Form.Check
                                            id="formHorizontalRadios1"
                                            className={'m-3'}
                                        >
                                            <Form.Check.Input
                                                type="radio"
                                                selected
                                                defaultChecked={delivery}
                                                name={'formHorizontalRadios'}
                                                onClick={() => {
                                                    setDelivery(true)
                                                    setError(null);
                                                }}

                                            />
                                            <Form.Check.Label>
                                                Lieferung
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Form.Label>
                                    <Form.Label>
                                        <Form.Check
                                            id="formHorizontalRadios2"
                                            className={'m-3'}
                                        >
                                            <Form.Check.Input
                                                type="radio"
                                                name={'formHorizontalRadios'}
                                                defaultChecked={!delivery}
                                                onClick={() => {
                                                    setDelivery(false)
                                                    setError(null);
                                                }}
                                            />
                                            <Form.Check.Label>
                                                Selbstabholung
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Form.Label>
                                </Form.Group>
                            </Form>
                            {delivery ?
                                <div className={styles.deliveryParent}>
                                    <h3 className="mt-0 text-center">
                                        Lieferung
                                    </h3>
                                    <h6 className="text-center">
                                        Bitte alle Felder ausfüllen
                                    </h6>
                                    <Form className="p-1">
                                        <Form.Group controlID="address">
                                            <FormControl
                                                className="rounded-0 border-0 border-bottom  border-dark text-xl-start"
                                                ref={ortRef}
                                                placeholder={'Ort'}
                                                required
                                            />
                                            <br />
                                            <br />
                                            <FormControl
                                                className="rounded-0 border-0 border-bottom border-dark"
                                                ref={postleitzahlRef}
                                                placeholder={'Postleitzahl'}
                                                required
                                            />
                                            <br />
                                            <br />
                                            <FormControl
                                                className="rounded-0 border-0 border-bottom border-dark"
                                                ref={strasseRef}
                                                placeholder={'Straße'}
                                                required
                                            />
                                            <br />
                                            <br />
                                            <FormControl
                                                className="rounded-0 border-0 border-bottom border-dark"
                                                placeholder="Hausnummer, Stiege, Etage, Türnummer"
                                                ref={hausnummerRef}
                                                required
                                            />
                                        </Form.Group>
                                    </Form>
                                </div>
                                :
                                <div className="text-center" style={{ maxHeight: "350px" }}>
                                    <h3>
                                        Selbstabholung
                                    </h3>
                                    <h6>
                                        Bitte vor der Abholung telefonisch einen Termin vereinbaren!
                                    </h6>
                                    <div>
                                        <Card className="p-2">
                                            <h3 className={styles.textCentering}><b>FELERFREI</b></h3>
                                            <h5 className={styles.textCentering}>Unter der Woche täglich,</h5>
                                            <h5 className={styles.textCentering}>von 7-12 und von 13-16 Uhr</h5>
                                            <span className="mt-3" />
                                            <h5 className={styles.textCentering}>Unterm Tisch 3</h5>
                                            <h5 className={styles.textCentering}>1234 Irgendwo</h5>
                                            <span className="mt-3" />
                                            <h5 className={styles.linking}>
                                                <span className={styles.hoverUnderlineAnimation}>
                                                    T:
                                                    <Link href="tel:0664 1234567">
                                                        0664 1234567
                                                    </Link>
                                                </span>
                                            </h5>
                                            <h5 className={styles.linking}>
                                                <span className={styles.hoverUnderlineAnimation}>
                                                    E:
                                                    <Link href="mailto:office@felerfrei.at">
                                                        office@felerfrei.at
                                                    </Link>
                                                </span>
                                            </h5>
                                        </Card>
                                    </div>
                                </div>
                            }
                            <br />
                        </div>
                        <div className="w-auto p-3">
                            {!loading && order && <Card>
                                <Accordion className={styles.accordion}>
                                    <Accordion.Item eventKey={"0"}>
                                        <Accordion.Header className="m-0 p-3">
                                            <h3 style={{ margin: "0" }}>
                                                {(order ? order.totalPrice : 0).toFixed(2)} €
                                            </h3>
                                        </Accordion.Header>
                                        <Accordion.Body className="p-1 ps-3">
                                            <ListGroup style={{
                                                margin: "0",
                                                padding: "0",
                                                maxHeight: "200px",
                                                overflow: "scroll",
                                                overflowX: "hidden"
                                            }}>
                                                {order && order.order ? order.order.orderContents.map((product, index) => (
                                                    <OverlayTrigger
                                                        placement="right"
                                                        key={product.id}
                                                        overlay={
                                                            <Popover>
                                                                <Popover.Header>
                                                                    <h6>{product.product.name}</h6>
                                                                </Popover.Header>
                                                                <Popover.Body>
                                                                    <div>
                                                                        <img
                                                                            src={`${API_URL}/api/image/${product.product.images[0].id}`}
                                                                            width={"120px"} />
                                                                        <br />
                                                                        {product.product.extra}
                                                                        <br />
                                                                    </div>
                                                                </Popover.Body>
                                                            </Popover>
                                                        }>
                                                        <ListGroup.Item key={index}>
                                                            <Row>
                                                                <h6 style={{ display: "inline" }}>
                                                                    {product.product.name} x {product.amount} = {(product.amount * product.retailPrice).toFixed(2)} €
                                                                </h6>
                                                                {product.extrawurscht &&
                                                                    <p style={{
                                                                        color: "grey",
                                                                        display: "inline",
                                                                        marginBottom: "0"
                                                                    }}>
                                                                        {product.extrawurscht.substring(0, 20)} {product.extrawurscht.length > 20 && "..."}
                                                                    </p>
                                                                }
                                                            </Row>
                                                        </ListGroup.Item>
                                                    </OverlayTrigger>
                                                )) : "Error"}
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <h5 className="p-3 pb-0">
                                    MwSt: {((order.totalPrice - (order.totalPrice / 1.2))).toFixed(2)} €
                                </h5>
                                <h2 className="ps-3">
                                    Gesamtpreis: {order.totalPrice} €
                                </h2>
                            </Card>
                            }
                        </div>
                    </div>

                    <div style={{ verticalAlign: "bottom" }} className="mt-4">
                        {error && <Alert variant="danger" style={{ maxHeight: "70px" }}>{error}</Alert>}
                        {success && <Alert variant="success" style={{ maxHeight: "70px" }}>{success}</Alert>}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex flex-column w-100">
                    <Button variant="dark" onClick={orderNow}>
                        Bestellen
                    </Button>
                </div>
            </Modal.Footer>

        </Modal>
    )

}
// TODO: show order success message