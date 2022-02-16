import React, {useRef, useState} from 'react'
import {Container, Form, InputGroup, FormControl, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../components/authprovider'
import {useRouter} from 'next/router';
import Link from 'next/link';
import PhoneInput from "react-phone-number-input/input";
import ShoppingCartItem from "../components/shoppingCartItem.jsx";

export default function ShoppingCart(props) {
    // let { user, changeCredentials, logout } = useAuth();
    // let router = useRouter();
    // if (!user) {
    //     router.push("/login");
    //     return <></>;
    // }
    const [loginError, setUpdateError] = useState();

    return (

        <div className="d-flex d-table justify-content-center align-items-center h-100 mt-5">
            <div className="w-100 d-table-cell align-middle" style={{
                display: "table-cell",
                verticalAlign: "middle",
                marginBottom: loginError ? "0" : "calc(6vh + 40px)"
            }}>
                <Container style={{maxWidth: "770px"}}>
                    <div className="justify-content-center">
                        <h2 className="fw-bold">Warenkorb</h2>
                    </div>


                    <table class="table"  >
                        <thead>
                        <tr  >
                            <th width={"200px"} >Produkt</th>
                            <th width={"200px"} > Bild</th>
                            <th width={"300px"} >Extrawürstel</th>
                            <th width={"50px"} > Stückanzahl</th>
                            <th width={"50px"} >Ändern</th>
                            <th width={"20px"} > Löschen</th>
                        </tr>
                        </thead>
                        <tbody  >
                        <ShoppingCartItem name="Erstes Produkt" image="link.img" quantity={"2"} change={"Link"}
                                          extra="das extrawürstel"></ShoppingCartItem>
                        <ShoppingCartItem name="Zweites Produkt" image="ahdah.img" quantity={"5"} change={"Link"}
                                          extra="das extradgsadg adga dg  adawürstel"></ShoppingCartItem>
                        </tbody>
                    </table>


                    <Button onClick={alert}
                            className="w-100 rounded-0 mt-4"
                            variant="outline-dark"
                            size={"md"}

                            style={{transition: '0.5s'}}>
                        Bestellen
                    </Button>

                    <div className="mt-4">
                        <div onClick={alert} role="button">Alle Einträge löschen</div>
                    </div>
                    {
                        loginError &&
                        <Alert variant={"danger"} className="rounded-0 d-flex justify-content-center md-4 mt-4"
                               style={{height: "8vh"}}>
                            {loginError}
                        </Alert>
                    }

                </Container>
            </div>
        </div>
    )

}