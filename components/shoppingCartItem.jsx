import React from "react";
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap";


export default function ShoppingCartItem(props){

    return(
        <tr>
         <td>{props.name}</td>
            <td>
                <img src={props.image} alt={"Mein Bild"}></img>
            </td>
            <td>{props.extra}</td>
            <td>{props.quantity} Stück </td>
            <td>[{props.change}]</td>
            <td>[X]</td>
        </tr>


        )

}
