import { Alert, Button, Form, Modal } from "react-bootstrap";
import React, { useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";

export default function AdminModifyProdukt({ id, name, description, price, material, images, published, handleClose }) {

    const [addError, setAddError] = useState();

    let nameRef = useRef(name);
    let priceRef = useRef(price);
    let descriptionRef = useRef(description);
    let materialRef = useRef(material);
    let imageRef = useRef(images);

    function modifyProduct() {
        let name = nameRef.current.value;
        let price = priceRef.current.value;
        let description = descriptionRef.current.value;
        let material = materialRef.current.value;


        setAddError(null);

        if (!name || !price || !description || !material) {
            setAddError("Please fill out all fields");
            return;
        }

        axios.post(`${API_URL}/admin/addProduct`, {
            name,
            price,
            description,
            material
        }, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        })
            .then(res => {
                let id = res.data;
                uploadService.uploadImages(imageRef.current.files, userToken.token, id);

                setShowAddModal(false);
            })
            .catch(err => {
                console.log(err);
                setAddError(err.response);
            });
    }

    return <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>
                Produkt ändern
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
                <Form.Control className="rounded-0 border-0 border-bottom" ref={nameRef} type="text" placeholder="Name" />
                <Form.Control className="rounded-0 border-0 border-bottom mt-3" ref={descriptionRef} as="textarea" rows={3} placeholder="description" />
                <Form.Control className="rounded-0 border-0 border-bottom mt-3" ref={priceRef} type="number" placeholder="Price" />
                <Form.Control className="rounded-0 border-0 border-bottom mt-3" ref={materialRef} type="text" placeholder="Material" />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                <Form.Label>Bilder</Form.Label>
                <Form.Control type="file" accept="image/!*" className="rounded-0" multiple ref={imageRef} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <div className="d-flex flex-column w-100">
                <Button variant="dark" onClick={modifyProduct}>
                    Ändern
                </Button>
                <br />
                {addError &&
                    <Alert className="w-100" variant="danger">
                        {addError}
                    </Alert>
                }
            </div>
        </Modal.Footer>
    </Modal>
}
