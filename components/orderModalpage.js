import {Accordion, Button, Card, Form, ListGroup, Modal, OverlayTrigger, Popover, Row, Tooltip} from "react-bootstrap";
import React from "react";
import styles from "../styles/contactPage.module.css";
import Link from "next/link";
import * as PropTypes from "prop-types";
import Image from "next/image";
import {API_URL} from "./constants";

export default function OrderModalPage({show, order, onHide}) {

    const [delivery, setDelivery] = React.useState(true);

    function orderNow() {
        alert("Order Placed");
    }

    console.log(order);

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
                <div className="d-flex justify-content-xl-between" style={{height: "55vh"}}>
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
                                        <Form.Label>
                                            Ort:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                        <br/>
                                        <Form.Label>
                                            Postleitzahl:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                        <br/>
                                        <Form.Label>
                                            Straße:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                        />
                                        <br/>
                                        <Form.Label>
                                            Hausnummer:
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Hausnummer, Stiege, Etage, Türnummer"
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                            :
                            <div style={{scale: "0.5"}}  className="text-center">
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
                    <div className="w-auto p-1">
                        <Card className="p-4">
                            <Accordion>
                                <Accordion.Header style={{height: "10vh"}}>
                                    <h3>
                                        {(order ? order.totalPrice : 0).toFixed(2)} €
                                    </h3>
                                </Accordion.Header>
                                <Accordion.Body eventKey={0}>
                                    <Card.Body>
                                        <ListGroup>
                                            {order ? order.order.orderContents.map((product, index) => (
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={
                                                        <Popover>
                                                            <Popover.Header>
                                                                <h6>{product.product.name}</h6>
                                                            </Popover.Header>
                                                            <Popover.Body>
                                                                <img
                                                                    src={`${API_URL}/api/image/${product.product.images[0].id}`}
                                                                    width={"80px"}/>
                                                            </Popover.Body>
                                                        </Popover>
                                                    }>
                                                    <ListGroup.Item key={index}>
                                                        {product.product.name} x {product.amount} = {(product.amount * product.retailPrice).toFixed(2)} €
                                                    </ListGroup.Item>
                                                </OverlayTrigger>
                                            )) : "NIx"}
                                        </ListGroup>
                                    </Card.Body>
                                </Accordion.Body>
                            </Accordion>
                            <h5>
                                plus MwSt: {((order ? order.totalPrice : 0) * 0.2).toFixed(2)} €
                            </h5>
                            <br/>
                            <h2>
                                Gesamtpreis: {((order ? order.totalPrice : 0) * 1.2).toFixed(2)} €
                            </h2>
                        </Card>
                    </div>
                </div>
                //error message
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