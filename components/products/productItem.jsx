import React from 'react'
import { API_URL } from '../constants.js';
import { useRouter } from 'next/router'
import styles from '../../styles/products/productItem.module.css'
import { motion } from 'framer-motion';

function ProductItem({ product }) {

    let router = useRouter();


    return (
        <motion.div
            initial={{
                y: 300,
                scale: 0.7,
                opacity: 0.0,
            }}
            animate={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 1,
                }
            }}
        >
            <div className={styles.item}>
                <img className={styles.cardImage} onClick={() => { router.push("/shop/" + product.id) }}
                    src={`${API_URL}/api/image/${product.images[0].id}`} />
                <div className="d-flex flex-row justify-content-between" style={{ fontSize: "16pt" }}>
                    <div style={{ fontWeight: "500" }}>
                        {product.name}
                    </div>
                    <div>
                        € {Number(product.price).toFixed(2)}
                    </div>
                </div>
            </ div>
        </motion.div>
    );
}

export default ProductItem