import React, {useEffect, useState} from "react";
import ProductItem from "../../components/products/productItem";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import {API_URL} from "../../components/constants";
import {Button} from "react-bootstrap";


export default function ProductList() {
    const [loading, setLoading] = useState(true);
    const [last, setLast] = useState(false);
    const [products, setProducts] = useState([]);
    let pageIndex = 0;

    async function loadProducts(index) {
        if (last) {
            return;
        }
        setLoading(true);
        await axios.get(API_URL + '/api/products?size=3&page=' + index)
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

    useEffect(() => {
        loadProducts(pageIndex);
    }, []);

    return <div style={{
        margin: "min(30px, 5vw)",
        justifyContent: "center",
        padding: "10px",
        display: "flex",
        flexWrap: "wrap",
        zIndex: "1"
    }}>
        {products.filter((product) => product.published)
            .map((product) => (
                    <ProductItem key={product.id} product={product}/>
                )
            )}
        {!last &&
            <Button
                disabled={loading}
                variant="outline-dark"
                className="w-100 rounded-0"
                size={"md"}
                style={{transition: '0.5s'}}
                onClick={showMore}>Mehr Anzeigen</Button>
        }
    </div>
}