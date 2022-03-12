import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AdminPage from '../components/admin/adminPage';

function Admin() {

  const [key, setKey] = useState('products');

  return (
    <AdminPage>
      <div className="mt-5">
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
              Content Products
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