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
  const [showCustomerModal, setShowCustomerModal] = useState({
    showing: false,
  });

  useEffect(() => {
    loadOrders(0);
  }, []);

  async function loadOrders(index) {
    if (last.current) {
      return;
    }
    setLoading(true);
    await axios
      .get(`${API_URL}/admin/orders?size=${pageSize}&page=${index}`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      })
      .then((res) => {
        if (res.data.last) {
          last.current = true;
        }
        setOrders([...orders, ...res.data.content]);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }

  function showMore() {
    loadOrders((pageIndex.current += 1));
  }

  function handleClose() {
    setShowCustomerModal({ showing: false });
  }

  function openPdf(id) {
    window.open(
      `${API_URL}/api/orderPdf/${id}?token=${userToken.token}`,
      "_blank"
    );
  }

  return (
    <AdminPage>
      <div className="w-100 d-flex justify-content-center mt-3 mb-3"></div>
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
          {orders.map((order) => {
            return (
              <tr
                key={order.order.id}
                style={{
                  backgroundColor: order.order.payed ? "#aaffaa" : "#ffaaaa",
                }}
              >
                <td
                  style={{ cursor: "pointer" }}
                  onDoubleClick={() => openPdf(order.order.id)}
                >
                  {order.order.id}
                </td>
                <td>{new Date(order.order.orderdate).toLocaleDateString()}</td>
                <td
                  onClick={() =>
                    setShowCustomerModal({
                      showing: true,
                      user: order.user,
                      payed: order.order.payed,
                      orderId: order.order.id,
                    })
                  }
                >
                  {order.user.firstname} {order.user.lastname}
                </td>
                <td className="d-flex justify-content-between">
                  <span>€</span>
                  <span>{order.totalPrice.toFixed(2)}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {!last.current && (
        <Button variant="dark" onClick={showMore}>
          {loading ? "Lade..." : "Mehr laden"}
        </Button>
      )}

      <Modal
        show={showCustomerModal.showing}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Name: {showCustomerModal.user?.firstname}{" "}
          {showCustomerModal.user?.lastname}
          <br />
          Email: {showCustomerModal.user?.email}
          <br />
          Telephone: {showCustomerModal.user?.telephonenumber}
          <br />
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Bezahlt"
              defaultChecked={showCustomerModal.payed}
              onChange={() => {
                // showCustomerModal.payed = !showCustomerModal.payed;
                axios
                  .post(
                    `${API_URL}/admin/payOrder/${showCustomerModal.orderId}`,
                    {
                      payed: !showCustomerModal.payed,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${userToken.token}`,
                      },
                    }
                  )
                  .then((res) => {
                    showCustomerModal.payed = !showCustomerModal.payed;
                    let index = orders.findIndex(
                      (order) => order.order.id === showCustomerModal.orderId
                    );
                    orders[index].order.payed = showCustomerModal.payed;
                    setOrders([...orders]); // just rerender
                  })
                  .catch((err) => console.log(err.response));
              }}
            />
          </Form.Group>
        </Modal.Body>
      </Modal>
    </AdminPage>
  );
}

export default AdminOrderList;
