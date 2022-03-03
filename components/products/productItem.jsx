import { Card } from "react-bootstrap";
import React from "react";
import Link from 'next/link'
import API_URL from '../constants.js';

export default function ProductItem({ product }) {
    return (
        <div style={{
            margin: "10px",
            width: "320px",
            height: "400px",
            padding: "8px",
            borderRadius: "3px",
            display: "flex",
            transitionDuration: "0.5s",
        }}>
            {/* <Link href={`/products/${product.id}`}> */}
            <Card>
                <Card.Img variant="top" style={{
                    height: "200px",
                    width: "301px",
                    objectFit: "cover"
                }} src={`http://localhost:8080/api/image/${product.images[0].id}`} alt="Bild von ProductID" />
                <Card.Body className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <Card.Title style={{ display: "inline", fontSize: "xx-large" }}
                            className="m-0"><b>{product.name}</b></Card.Title>
                        <Card.Subtitle className={`ms-auto m-0`}
                            style={{ fontSize: "x-large" }}>{Number(product.price).toFixed(2)} €</Card.Subtitle>
                    </div>
                    <Card.Text style={{
                        textAlign: "justify",
                        display: ['-webkit-box'],
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        transitionDelay: "200ms",
                    }}>
                        {product.description}
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* </Link> */}
        </div>
    );
}