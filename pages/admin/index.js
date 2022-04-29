import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AdminPage, { redirectIfNotAdmin } from '../../components/admin/adminPage';
import AdminProductList from '../../components/admin/adminProductList';

function Admin() {

    const [key, setKey] = useState('products');

    return (
        <AdminPage>
            <div className="mt-5 ms-5">
                <div>
                    <h1>Admin - Dashboard</h1>
                </div>
                <div className="p-5">
                    <Tabs
                        variant='tabs'
                        id="controlled-tab"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        <Tab eventKey="products" title="Manage Products">
                            <AdminProductList />
                        </Tab>
                        <Tab eventKey="orders" title="Bestellungen">
                            <AdminOrderList />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </AdminPage>
    )
}

export async function getServerSideProps(context) {
    let token = context.req.cookies.token;
    return redirectIfNotAdmin(token);
}

export default Admin;