import { useRouter } from 'next/router'
import ProductDetail from "../../components/products/productDetail";
import { useEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from '../../components/constants';
import Footer from '../../components/footer';

function ProductID({ product }) {
    if (product == null) {
        return <div style={{ marginTop: "500px" }}>Product not found</div>;
    }

    return (
        <div>
            <ProductDetail product={product} />

        </div>
    );
}

export async function getServerSideProps(context) {
    let id = context.params.productID;
    let product;
    await axios.get(API_URL + '/api/product/' + id)
        .then(res => {
            product = res.data;
        })
        .catch(err => {
            product = null;
        });
    return {
        props: {
            product
        }
    };
}

export default ProductID