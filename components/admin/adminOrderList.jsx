import React, { useState, useRef, useEffect } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";
import AdminPage from "./adminPage";
import axios from "axios";
import { API_URL } from "../constants";
import { useAuth } from "../authprovider";

const pageSize = 10;
function AdminOrderList() {

  let last = useRef(false);
  let pageIndex = useRef(0);

  let { userToken } = useAuth();

  const [loading, setLoading] = useState();
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState({ showing: false });

  useEffect(() => {
    loadOrders(0);
  }, []);

  async function loadOrders(index) {
    if (last.current) {
      return;
    }
    setLoading(true);
    await axios.get(`${API_URL}/admin/orders?size=${pageSize}&page=${index}`, {
      headers: {
        Authorization: `Bearer ${userToken.token}`
      }
    })
      .then(res => {
        if (res.data.last) {
          last.current = true;
        }
        setOrders([...orders, ...res.data.content]);
      })
      .catch(err => {
        console.log(err);
      });
    setLoading(false);
  }

  function showMore() {
    loadOrders(pageIndex.current += 1);
  }

  function handleClose() {
    setShowModal({ showing: false });
  }

  function openPdf(id) {
    window.open(`${API_URL}/api/orderPdf/${id}?token=${userToken.token}`, "_blank");
  }

  return (
    <AdminPage>
      <div className="w-100 d-flex justify-content-center mt-3 mb-3">
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Datum</th>
            <th>Kunde</th>
            <th>Preis</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order) => {
              return (
                <tr key={order.order.id} style={{ backgroundColor: order.order.payed ? '#aaffaa' : '#ffaaaa' }}>
                  <td style={{ cursor: 'pointer' }} onDoubleClick={() => openPdf(order.order.id)}>{order.order.id}</td>
                  <td>{new Date(order.order.orderdate).toLocaleDateString()}</td>
                  <td onClick={() => setShowModal({ showing: true, user: order.user })}>{order.user.firstname} {order.user.lastname}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>

      {!last.current && (
        <Button variant="dark" onClick={showMore}>
          {loading ? "Lade..." : "Mehr laden"}
        </Button>
      )}

      <Modal
        show={showModal.showing}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Name: {showModal.user?.firstname} {showModal.user?.lastname}
          <br />
          Email: {showModal.user?.email}
          <br />
          Telephone: {showModal.user?.telephonenumber}
        </Modal.Body>
      </Modal>
    </AdminPage>
  );
}

export default AdminOrderList;
