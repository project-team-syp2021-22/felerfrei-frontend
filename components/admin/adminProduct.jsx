import React from 'react'
import styles from '../../styles/admin/admin.module.css';

function AdminProduct({ id, name, published, price, material }) {

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>
                {published ? 'Ja' : 'Nein'} {/* add a checkbox here */}
            </td>
            <td>€ {price}</td>
            <td>{material}</td>
        </tr>
    )
}

export default AdminProduct;