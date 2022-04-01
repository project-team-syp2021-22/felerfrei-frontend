import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import AdminPage from '../../../components/admin/adminPage';
import axios from 'axios';
import { API_URL } from '../../../components/constants';
import { useAuth } from '../../../components/authprovider';
import { Form, Alert, Button } from 'react-bootstrap';

function Product() {
    let router = useRouter();
    const { productId } = router.query;

    const { userToken } = useAuth();

    const [images, setImages] = useState([]);
    const [error, setError] = useState();

    let nameRef = useRef();
    let priceRef = useRef();
    let descriptionRef = useRef();
    let materialRef = useRef();
    let publishedRef = useRef();
    let imageRef = useRef([]);


    useEffect(() => {
        setError(null);
        axios.get(`${API_URL}/admin/products/${productId}`, {
            headers: { Authorization: `Bearer ${userToken.token}` }
        })
            .then(res => {
                console.log(res.data);
                nameRef.current.value = res.data.name;
                priceRef.current.value = res.data.price;
                descriptionRef.current.value = res.data.description;
                materialRef.current.value = res.data.material;
                publishedRef.current.checked = res.data.published;
                setImages(res.data.images);
            })
            .catch(err => {
                // setError(err.response.data);
                console.log(err.response)
            });
    }, []);

    function handleChange() {
        axios.put(`${API_URL}/admin/updateProduct/${productId}`, {
            name: nameRef.current.value,
            price: priceRef.current.value,
            description: descriptionRef.current.value,
            material: materialRef.current.value,
            published: publishedRef.current.checked,
        }, {
            headers: { Authorization: `Bearer ${userToken.token}` },
        })
    }

    return (
        <AdminPage>
            {error && <>
                <div className="d-flex justify-content-center">
                    <Alert variant="danger" className="mt-5 w-50">
                        {error}
                    </Alert>
                </div>
            </>}
            {
                !error &&
                <div className="d-flex justify-content-center w-100">
                    <div className="d-flex flex-column mt-5 w-50">
                        <Form.Group>
                            <Form.Control
                                className="rounded-0 border-0 border-bottom"
                                ref={nameRef}
                                type="text"
                                placeholder="Name"
                            />
                            <Form.Control
                                className="rounded-0 border-0 border-bottom mt-3"
                                ref={descriptionRef}
                                as="textarea"
                                rows={3}
                                placeholder="description"
                            />
                            <Form.Check
                                type='checkbox'
                                id={`default-checkbox`}
                                label={`veröffentlicht`}
                                ref={publishedRef}
                            />
                            <Form.Control
                                className="rounded-0 border-0 border-bottom mt-3"
                                ref={priceRef}
                                type="number"
                                placeholder="Price €"
                            />
                            <Form.Control
                                className="rounded-0 border-0 border-bottom mt-3"
                                ref={materialRef}
                                type="text"
                                placeholder="Material"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant='dark' className="mt-3 rounded-0 w-50" onClick={handleChange}>
                                Ändern
                            </Button>
                        </div>
                        <div className="mt-5">
                            {images.map(image => {
                                console.log(`${API_URL}/api/image/${image.id}`)
                                return (
                                    <div className="m-3 d-inline">
                                        <img
                                            style={{ maxWidth: "200px" }}
                                            src={`${API_URL}/api/image/${image.id}`}
                                            alt="Product"
                                        />
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            }
        </AdminPage >
    );
}

export default Product;

export async function getServerSideProps(context) {
    let token = context.req.cookies.token;
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            },
            props: {

            },
        };
    }
    return await axios.get(`${API_URL}/auth/isAdmin`, {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then(_ => {
            return {
                props: {
                },
            };
        })
        .catch(_ => {
            return {
                redirect: {
                    permanent: false,
                    destination: '/'
                },
                props: {

                },
            };
        });
}