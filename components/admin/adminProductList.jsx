import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminPage from './adminPage';
import { API_URL } from '../constants';
import { useAuth } from '../authprovider';
import AdminProduct from './adminProduct';
import { Table } from 'react-bootstrap';

function AdminProductList() {

    const { userToken } = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/admin/products`, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setProducts(res.data);
            })
    }, []);

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
            </Table>
        </AdminPage>
    )
}

export default AdminProductList;