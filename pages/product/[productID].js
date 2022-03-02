import {useRouter} from 'next/router'
import ProductDetail from "../../components/productDetail";
import {useEffect, useState} from "react";

const ProductID = () => {
    const router = useRouter()
    const {productID} = router.query
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(productID);
        setLoading(false);
    })

    //return <ProductDetail productID={pid}/>

    return <div> {!loading && <ProductDetail productID={productID}/>}</div>
}

export default ProductID