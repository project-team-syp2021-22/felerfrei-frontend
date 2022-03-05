import { Card } from "react-bootstrap";
import React from "react";
import API_URL from '../constants.js';
import { useRouter } from 'next/router'
import styles from '../../styles/products/productItem.module.css'

export default function ProductItem({ product }) {
    let router = useRouter();

    return (
        <div className={styles.item}
            onClick={() => router.push(`/shop/${product.id}`)}
        >
            <Card className="rounded-0">
                <Card.Img variant="top" className={styles.cardImage}
                    src={`http://localhost:8080/api/image/${product.images[0].id}`} alt="Produkt Bild" />
                <Card.Body className="d-flex flex-column">
                    <Card.Title className={`m-0 ${styles.cardTitle}`}><b>{product.name}</b></Card.Title>
                    <div className="d-flex justify-content-start">
                        <Card.Text className={`ms-auto m-0 ${styles.cardSubtitle}`}>{Number(product.price).toFixed(2)} €</Card.Text>
                    </div>
                    <Card.Text className={styles.cardText}>
                        {product.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}