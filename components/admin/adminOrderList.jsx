import React, {useState, useRef, useEffect} from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";
import AdminPage from "./adminPage";

function AdminOrderList() {

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
        <tbody>{/* ordes */}</tbody>
      </Table>
      {/* {!last.current && (
        <Button variant="dark" onClick={showMore}>
          {loading ? "Lade..." : "Mehr laden"}
        </Button>
      )} */}
    </AdminPage>
  );
}

export default AdminOrderList;
