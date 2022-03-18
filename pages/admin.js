import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AdminPage from '../components/admin/adminPage';
import AdminProductList from '../components/admin/adminProductList';
import axios from 'axios';
import { API_URL } from '../components/constants';

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

export default Admin;