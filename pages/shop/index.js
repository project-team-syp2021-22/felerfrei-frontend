import React, {useEffect, useState} from "react";
import ProductItem from "../../components/products/productItem";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import {API_URL} from "../../components/constants";
import {Button} from "react-bootstrap";
import {motion} from "framer-motion";
import Footer from "../../components/footer";

let pageIndex = 1;
export default function ProductList({serverProducts}) {
    const [loading, setLoading] = useState(false);
    const [last, setLast] = useState(serverProducts.last);
    const [products, setProducts] = useState(serverProducts.products);

    async function loadProducts(index) {
        if (last) {
            return;
        }
        setLoading(true);
        await axios.get(API_URL + '/api/products?size=1&page=' + index)
            .then(res => {
                if (res.data.last) {
                    setLast(true);
                }
                console.log(res.data);
                setProducts([...products, ...res.data.content]);
            })
            .catch(err => {
                console.log(err);
            });
        setLoading(false);
    }

    function showMore() {
        loadProducts(pageIndex);
        pageIndex++;
    }

    return (
        <div className="d-flex flex-column h-100">
            <div style={{
                margin: "min(30px, 5vw)",
                justifyContent: "center",
                padding: "10px",
                display: "flex",
                flexWrap: "wrap",
                zIndex: "1",
                flexGrow: "1",
            }}>
                {products
                    .map((product) => (
                            <ProductItem key={product.id} product={product}/>
                        )
                    )}
                <br/>
                {!last &&
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
                        <Button
                            disabled={loading}
                            variant="outline-dark"
                            className="w-100 rounded-0"
                            size={"md"}
                            style={{transition: '0.5s'}}
                            onClick={showMore}>Mehr Anzeigen</Button>
                    </motion.div>
                }
            </div>
            <Footer/>
        </div>
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