import React, { useEffect, useState } from "react";
import ProductItem from "../../components/products/productItem";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { API_URL } from "../../components/constants";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";

let pageIndex = 1;
export default function ProductList({ serverProducts }) {
    const [loading, setLoading] = useState(true);
    const [last, setLast] = useState(serverProducts.last);
    const [products, setProducts] = useState(serverProducts.products);

    async function loadProducts(index) {
        if (last) {
            return;
        }
        setLoading(true);
        await axios.get(API_URL + '/api/products?size=10&page=' + index)
            .then(res => {
                if (res.data.last) {
                    setLast(true);
                }
                //todo
                //console.log(res.data.content, pageIndex);
                setProducts([...products, ...res.data.content]);
            })
            .catch(err => {
                console.log(err);
            });
        setLoading(false);
    }

    function showMore() {
        loadProducts(pageIndex += 1);
    }

    return (
        <>
            <div style={{
                margin: "min(30px, 5vw)",
                justifyContent: "center",
                padding: "10px",
                display: "flex",
                flexWrap: "wrap",
                zIndex: "1"
            }}>
                {products
                    .map((product) => (
                        <ProductItem key={product.id} product={product} />
                    )
                    )}
                {!last &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 1 } }}
                    >
                        <Button
                            disabled={loading}
                            variant="outline-dark"
                            className="w-100 rounded-0"
                            size={"md"}
                            style={{ transition: '0.5s' }}
                            onClick={showMore}>Mehr Anzeigen</Button>
                    </motion.div>
                }
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    let products = [];
    let last = false;
    await axios.get(API_URL + '/api/products?size=10&page=0')
        .then(res => {
            if (res.data.last) {
                last = true;
            }
            //todo
            //console.log(res.data.content, pageIndex);
            products = res.data.content;
        })
        .catch(err => {
            console.log(err);
        });
    return {
        props: {
            'serverProducts': {
                products,
                last
            }
        }
    };
}