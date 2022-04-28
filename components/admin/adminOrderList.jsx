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
                  <td>{order.order.id}</td>
                  <td>{new Date(order.order.orderdate).toLocaleDateString()}</td>
                  <td>{order.user.firstname} {order.user.lastname}</td>
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
    </AdminPage>
  );
}

export default AdminOrderList;
