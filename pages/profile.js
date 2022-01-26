import {Alert, Button, Col, Container, Form, FormControl, FormGroup, InputGroup, Row} from "react-bootstrap";
import React, {useRef, useState} from "react";
import PhoneInput from "react-phone-number-input/input";
import {useRouter} from "next/router";
import Link from "next/link";
import PasswordStrengthBar from 'react-password-strength-bar';
import {useAuth} from "../components/authprovider";
import axios from "axios";
import { useDispatch } from "react-redux";

/*
To do:
senden an Server
Werte vom Server
 */

export default function Profile() {

    let {user, changeCredentials} = useAuth();
    console.log(user);
    let router = useRouter();
    if(!user) {
        router.push("/login");
    }

    let sonderzeichen = "(°_^}"
    const passwordVisibility = useRef();
    // const passwordConfirmVisibility = useRef();

    const [passwordIsHidden, setPasswordIsHidden] = useState(true);
    const [loginError, setUpdateError] = useState();
    const [password, setPassword] = useState();


    const passwordRef = useRef();

    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();

    function inputExists() {
        return (checkForRequiredInput(firstNameRef)
            && checkForRequiredInput(lastNameRef)
            && checkForRequiredInput(emailRef)
            && checkForRequiredInput(passwordRef)
        )
    }

    function checkForRequiredInput(state) {
        return !(state == null || state.current.value === "")
    }

    function handlePasswordVisibility() {
        let passwordTag = passwordRef.current;
        if (passwordIsHidden) {
            passwordVisibility.current.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg >`;
        } else {
            passwordVisibility.current.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
            `
        }
        setPasswordIsHidden(!passwordIsHidden);
        passwordTag.type = passwordIsHidden ? "text" : "password";

    }

    async function setNewValues() {
        if (!inputExists()) {
            return setUpdateError("Bitte füllen Sie alle Pflichtfelder aus.");
        }

        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let firstname = firstNameRef.current.value;
        let lastname = lastNameRef.current.value;
        let telephone = phoneRef.current.value;

        setUpdateError(null);
        try {
            await changeCredentials(email, password, firstname, lastname, telephone);
            
            //router.push("/profile");
        } catch (error) {
            setUpdateError(error.message);
            return;
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="w-100">
                <Container style={{maxWidth: "500px"}}>
                    <div className="justify-content-center">
                        <h2 className="fw-bold">Account Management</h2>
                    </div>
                    <Form>

                        <InputGroup className="mb-4 mt-4">
                            <FormControl
                                className="rounded-0 border-0 border-bottom border-dark"
                                placeholder="Vorname"
                                aria-label="Vorname"
                                ref={firstNameRef}
                                defaultValue={user.firstname}
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-4 mt-4">
                            <FormControl
                                className="rounded-0 border-0 border-bottom border-dark"
                                type="text"
                                placeholder="Nachname"
                                aria-label="Nachname"
                                ref={lastNameRef}
                                defaultValue={user.lastname}
                                required/>
                        </InputGroup>

                        <InputGroup className="mb-4 mt-4">
                            <PhoneInput
                                className="rounded-0 border-0 border-bottom border-dark"
                                placeholder="Telephonnummer"
                                aria-label="Telephonnummer"
                                ref={phoneRef}
                                value={user.telephone}
                                onChange={() => {
                                }}
                                inputComponent={Form.Control}
                            />
                        </InputGroup>

                        <InputGroup className="mb-4 mt-4">
                            <FormControl
                                className="rounded-0 border-0 border-bottom border-dark"
                                placeholder="Email eingeben"
                                aria-label="E-Mail"
                                aria-describedby="basic-addon1"
                                defaultValue={user.email}
                                ref={emailRef}
                                required/>

                            <div className="input-group-addon border-bottom border-dark mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-at" viewBox="0 0 16 16">
                                    <path
                                        d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/>
                                </svg>
                            </div>
                        </InputGroup>

                        <InputGroup className="mb-4 mt-4">
                            <FormControl
                                className="rounded-0 border-0 border-bottom border-dark"
                                type="password"
                                placeholder="Passwort"
                                aria-label="Password"
                                aria-describedby="input-group-addon"
                                ref={passwordRef}
                                onChange={() => {
                                    setPassword(passwordRef.current.value)
                                }}
                                // required
                            />
                            <div className="input-group-addon border-bottom border-dark mt-1"
                                 onClick={handlePasswordVisibility}
                                 ref={passwordVisibility}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path
                                        d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                    <path
                                        d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                    <path
                                        d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                </svg>
                            </div>
                        </InputGroup>


                        <Button onClick={setNewValues}
                                className="w-100 rounded-0 mt-4"
                                variant="outline-dark"
                                size={"md"}

                                style={{transition: '0.5s'}}>
                            Account Speichern
                        </Button>
                    </Form>

                    <div className="mt-4">
                        <Link href="/login">Account löschen</Link>
                        <br/>
                        <Link href="/login">Passwort vergessen</Link>
                    </div>
                    {
                        loginError &&
                        <Alert variant={"danger"} className="rounded-0 d-flex justify-content-center md-4 mt-4">
                            {loginError}
                        </Alert>
                    }

                </Container>
            </div>
        </div>)
}


//
// Das Passwort muss mindestens 8 Zeichen lang sein und aus Buchstaben, Zahlen und
// Sonderzeichen
// wie {sonderzeichen} bestehen!