import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import AdminPage from './adminPage';
import { API_URL } from '../constants';
import { useAuth } from '../authprovider';
import AdminProduct from './adminProduct';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';

let pageIndex = 0;
function AdminProductList() {

    const { userToken } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [last, setLast] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    async function loadProjects(index) {
        if (last) {
            return;
        }
        setLoading(true);
        axios.get(`${API_URL}/admin/products?size=20&page=${index}`, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                // setProducts(res.data);
                if (res.data.last) {
                    setLast(true);
                }
                console.log(res.data.content, pageIndex);
                setProducts([...products, ...res.data.content]);
            })
        setLoading(false);
    }

    function showMore() {
        loadProjects(pageIndex += 1);
    }

    useEffect(() => {
        loadProjects(pageIndex);
    }, []);

    function handleClose() {
        setShowAddModal(false);
    }

    return (
        <AdminPage>
            <div className="w-100 d-flex justify-content-center mt-3 mb-3">
                <Button variant="dark" onClick={() => setShowAddModal(true)}>
                    Neues Produkt
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Veröffentlicht</th>
                        <th>Preis</th>
                        <th>Material</th>
                    </tr>
                </thead>
                <tbody>

                    {products.map((product) => (
                        <>
                            <AdminProduct
                                key={product.id}
                                id={product.id}
                                material={product.material}
                                name={product.name}
                                price={product.price}
                                published={product.published}
                            />
                        </>
                    ))}
                </tbody>
            </Table>
            {!last &&

                <Button variant='dark' onClick={showMore}>
                    {loading ? 'Lade...' : 'Mehr laden'}
                </Button>
            }

            <Modal
                show={showAddModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Neues Produkt
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control className="rounded-0 border-0 border-bottom" type="text" placeholder="Name" />
                        <Form.Control className="rounded-0 border-0 border-bottom mt-3" type="textarea" placeholder="description" />
                        <Form.Control className="rounded-0 border-0 border-bottom mt-3" type="number" placeholder="Price" />
                        <Form.Control className="rounded-0 border-0 border-bottom mt-3" type="text" placeholder="Material" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark">
                        Hinzufügen
                    </Button>
                </Modal.Footer>
            </Modal>
        </AdminPage>
    )
}

export default AdminProductList;