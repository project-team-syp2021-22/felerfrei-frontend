import React from 'react'

function AdminProduct({ id, name, description, published, price, material, images }) {

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
    </>)
}

export default AdminProduct;