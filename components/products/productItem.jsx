import React from 'react'
import API_URL from '../constants.js';
import { useRouter } from 'next/router'
import styles from '../../styles/products/productItem.module.css'

function ProductItem({ product }) {

    let router = useRouter();

    return (
        <div>
            <div className={styles.item}>
                <img className={styles.cardImage} onClick={() => { router.push("/shop/" + product.id) }}
                    src={`http://localhost:8080/api/image/${product.images[0].id}`} />
                <div className="d-flex flex-row justify-content-between" style={{ fontSize: "16pt" }}>
                    <div style={{ fontWeight: "500" }}>
                        {product.name}
                    </div>
                    <div>
                        € {Number(product.price).toFixed(2)}
                    </div>
                </div>
            </ div>
        </div>
    );
}

export default ProductItem