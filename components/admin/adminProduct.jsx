import React, {useState} from 'react'
import styles from '../../styles/admin/admin.module.css';
//import AdminModifyProdukt from "./adminModifyProdukt";
import {images} from "next/dist/build/webpack/config/blocks/images";

function AdminProduct({id, name, description, published, price, material, images}) {

    const [showAddModal, setShowAddModal] = useState(false);

    function handleClose() {
        setShowAddModal(false);
    }

    debugger;

    return (<>
        <tr onClick={() => {
            setShowAddModal(true)
        }}>
            <td>{id}</td>
            <td>{name}</td>
            <td>
                {published ? 'Ja' : 'Nein'} {/* add a checkbox here */}
            </td>
            <td>€ {price}</td>
            <td>{material}</td>
        </tr>
        {/*{showAddModal &&
            <AdminModifyProdukt id={id} name={name} price={price} description={description} material={material}
                                images={images} published={published} handleClose={handleClose}/>}*/}
    </>)
}

export default AdminProduct;