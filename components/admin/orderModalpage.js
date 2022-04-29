import {Button, Form, Modal} from "react-bootstrap";
import React from "react";

export default function OrderModalPage({show, order, onHide}) {

    const [delivery, setDelivery] = React.useState(true);

    function orderNow() {
        alert("Order Placed");
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            size={'lg'}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Produkte bestellen
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>
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
                                <Form>
                                    <Form.Group controlID="deliveryAddress">
                                        <Form.Label>
                                            Lieferadresse
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Lieferadresse"
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                            :
                            <div>
                                <Form>
                                    <Form.Group controlID="pickupAddress">
                                        <Form.Label>
                                            Selbstabholung
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Selbstabholung"
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex flex-column w-100">
                    <Button variant="dark" onClick={orderNow}>
                        Bestellen
                    </Button>
                    //error message
                    }
                </div>
            </Modal.Footer>
        </Modal>
    )

}