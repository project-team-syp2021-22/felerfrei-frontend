import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AdminPage from '../components/admin/adminPage';
import AdminProductList from '../components/admin/adminProductList';

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
            <Tab eventKey="home" title="home">
              Content 2
            </Tab>
          </Tabs>
        </div>
      </div>
    </AdminPage>
  )
}

export default Admin;