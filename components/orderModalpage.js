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
    Tooltip
} from "react-bootstrap";
import React, {useEffect} from "react";
import styles from "../styles/contactPage.module.css";
import Link from "next/link";
import * as PropTypes from "prop-types";
import Image from "next/image";
import {API_URL} from "./constants";
import axios from "axios";

export default function OrderModalPage({show, onHide, userToken}) {

    const [delivery, setDelivery] = React.useState(true);
    const [error, setError] = React.useState();
    const ortRef = React.useRef();
    const postleitzahlRef = React.useRef();
    const strasseRef = React.useRef();
    const hausnummerRef = React.useRef();
    const [loading, setLoading] = React.useState();
    const [order, setOrder] = React.useState();

    function orderNow() {
        alert("Order Placed");
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

    return (
        <Modal
            show={show}
            onHide={onHide}
            keyboard={false}
            size={'xl'}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Produkte bestellen
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-xl-between" style={{height: "450px"}}>
                    <div className="flex-md-column w-50">
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
                                            onClick={() => setDelivery(true)}

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
                                            onClick={() => setDelivery(false)}
                                        />
                                        <Form.Check.Label>
                                            Selbstabholung
                                        </Form.Check.Label>
                                    </Form.Check>
                                </Form.Label>
                            </Form.Group>
                        </Form>
                        {delivery ?
                            <div>
                                <Form className="p-1">
                                    <Form.Group controlID="address">
                                        <FormControl
                                            className="rounded-0 border-0 border-bottom  border-dark text-xl-start"
                                            ref={ortRef}
                                            placeholder={'Ort'}
                                            required
                                        />
                                        <br/>
                                        <br/>
                                        <FormControl
                                            className="rounded-0 border-0 border-bottom border-dark"
                                            ref={postleitzahlRef}
                                            placeholder={'Postleitzahl'}
                                            required
                                        />
                                        <br/>
                                        <br/>
                                        <FormControl
                                            className="rounded-0 border-0 border-bottom border-dark"
                                            ref={strasseRef}
                                            placeholder={'Straße'}
                                            required
                                        />
                                        <br/>
                                        <br/>
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
                            <div style={{scale: "0.5"}} className="text-center">
                                <h3>
                                    Selbstabholung
                                </h3>
                                <h6>
                                    Bitte vor der Abholung telefonisch einen Termin vereinbaren!
                                </h6>
                                <br/>
                                <div>
                                    <Card>
                                        <h4 className={styles.textCentering}><b>FELERFREI</b></h4>
                                        <h5 className={styles.textCentering}>Unter der Woche täglich,</h5>
                                        <h5 className={styles.textCentering}>von 7-12 und von 13-16 Uhr</h5>
                                        <br/>
                                        <h4 className={styles.textCentering}>Unterm Tisch 3</h4>
                                        <h4 className={styles.textCentering}>1234 Irgendwo</h4>
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
                        <br/>
                    </div>
                    <div className="w-auto p-3">
                        {!loading && <Card>
                            <Accordion>
                                <Accordion.Header className="m-0 p-3">
                                    <h3 style={{margin: "0"}}>
                                        {(order ? order.totalPrice : 0).toFixed(2)} €
                                    </h3>
                                </Accordion.Header>
                                    <Accordion.Body eventKey={0} className="p-1 ps-3">
                                        <ListGroup style={{
                                            margin: "0",
                                            padding: "0",
                                            maxHeight: "200px",
                                            overflow: "scroll",
                                            overflowX: "hidden"
                                        }}>
                                            {order ? order.order.orderContents.map((product, index) => (
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={
                                                        <Popover>
                                                            <Popover.Header>
                                                                <h6>{product.product.name}</h6>
                                                            </Popover.Header>
                                                            <Popover.Body>
                                                                <div>
                                                                    <img
                                                                        src={`${API_URL}/api/image/${product.product.images[0].id}`}
                                                                        width={"120px"}/>
                                                                    <br/>
                                                                    {product.product.description}
                                                                    <br/>
                                                                </div>
                                                            </Popover.Body>
                                                        </Popover>
                                                    }>
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <h6 style={{display: "inline"}}>
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
                                            )) : "NIx"}
                                        </ListGroup>
                                    </Accordion.Body>
                            </Accordion>
                            <h5 className="p-3 pb-0">
                                MwSt: {((order ? order.totalPrice : 0) * 0.2).toFixed(2)} €
                            </h5>
                            <h2 className="ps-3">
                                Gesamtpreis: {((order ? order.totalPrice : 0) * 1.2).toFixed(2)} €
                            </h2>
                        </Card>
                        }
                    </div>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
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