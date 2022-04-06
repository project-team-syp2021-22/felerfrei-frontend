import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AdminPage from "./adminPage";
import { API_URL } from "../constants";
import { useAuth } from "../authprovider";
import AdminProduct from "./adminProduct";
import { Table, Button, Modal, Form, Alert, InputGroup } from "react-bootstrap";
import UploadService from "./uploadService.js";
import { useRouter } from "next/router";

let pageIndex = 0;
function AdminProductList() {
  const { userToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let last = useRef(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addError, setAddError] = useState();

  let nameRef = useRef();
  let priceRef = useRef();
  let descriptionRef = useRef();
  let materialRef = useRef();
  let imageRef = useRef();

  let uploadService = new UploadService();

  useEffect(() => {
    if (showAddModal == true) {
      return;
    }
    pageIndex = 0;
    last.current = false;
    loadProducts(pageIndex, true);
  }, [showAddModal]);

  async function loadProducts(index, reload = false) {
    if (last.current && !reload) {
      return;
    }
    setLoading(true);
    await axios
      .get(`${API_URL}/admin/products?size=20&page=${index}`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      })
      .then((res) => {
        // setProducts(res.data);
        if (res.data.last) {
          last.current = true;
        }
        if (reload) {
          console.log("Here reload");
          setProducts([...res.data.content]);
        } else {
          setProducts([...products, ...res.data.content]);
        }
      });
    setLoading(false);
  }

  function showMore() {
    loadProducts((pageIndex += 1));
  }

  function handleClose() {
    setShowAddModal(false);
  }

  function addProduct() {
    let name = nameRef.current.value;
    let price = priceRef.current.value;
    let description = descriptionRef.current.value;
    let material = materialRef.current.value;

    setAddError(null);

    if (!name || !price || !description || !material) {
      setAddError("Please fill out all fields");
      return;
    }

    axios
      .post(
        `${API_URL}/admin/addProduct`,
        {
          name,
          price,
          description,
          material,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      )
      .then((res) => {
        let id = res.data;
        uploadService.uploadImages(imageRef.current.files, userToken.token, id);

        setShowAddModal(false);
      })
      .catch((err) => {
        console.log(err);
        setAddError(err.response);
      });
  }

  return (
    <AdminPage>
      <div className="w-100 d-flex justify-content-evenly mt-3 mb-3">
        <Button
          variant="dark"
          className="rounded-0"
          onClick={() => {
            setShowAddModal(true);
            setAddError(null);
          }}
        >
          Neues Produkt
        </Button>
        <Form>
          <InputGroup>
            <Form.Control
              className="rounded-0 border-0 border-bottom border-dark"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                let value = e.target.value;

                console.log(value.length);
                if (value.length == 0) {
                  loadProducts(0, true);
                  return;
                }

                let filtered = products.filter((p) => {
                  return p.name.toLowerCase().includes(value.toLowerCase());
                });
                setProducts(filtered);
              }}
            />
          </InputGroup>
        </Form>
      </div>
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
            <AdminProduct
              key={product.id}
              id={product.id}
              material={product.material}
              name={product.name}
              price={product.price}
              published={product.published}
            />
          ))}
        </tbody>
      </Table>
      {!last.current && (
        <Button variant="dark" onClick={showMore}>
          {loading ? "Lade..." : "Mehr laden"}
        </Button>
      )}

      <Modal
        show={showAddModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Neues Produkt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              className="rounded-0 border-0 border-bottom"
              ref={nameRef}
              type="text"
              placeholder="Name"
            />
            <Form.Control
              className="rounded-0 border-0 border-bottom mt-3"
              ref={descriptionRef}
              as="textarea"
              rows={3}
              placeholder="description"
            />
            <Form.Control
              className="rounded-0 border-0 border-bottom mt-3"
              ref={priceRef}
              type="number"
              placeholder="Price"
            />
            <Form.Control
              className="rounded-0 border-0 border-bottom mt-3"
              ref={materialRef}
              type="text"
              placeholder="Material"
            />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
            <Form.Label>Bilder</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              className="rounded-0"
              multiple
              ref={imageRef}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-column w-100">
            <Button variant="dark" onClick={addProduct}>
              Hinzufügen
            </Button>
            <br />
            {addError && (
              <Alert className="w-100" variant="danger">
                {addError}
              </Alert>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </AdminPage>
  );
}

export default AdminProductList;
