import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import AdminPage from './adminPage';
import { API_URL } from '../constants';
import { useAuth } from '../authprovider';
import AdminProduct from './adminProduct';
import { Table, Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';

let pageIndex = 0;
function AdminProductList() {

    const { userToken } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [last, setLast] = useState(false);

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
        setShowModal(false);
    }

    return (
        <AdminPage>
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
        </AdminPage>
    )
}

export default AdminProductList;