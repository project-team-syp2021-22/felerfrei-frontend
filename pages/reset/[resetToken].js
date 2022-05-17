import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import { Container, Button, Alert, Spinner, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../components/constants';
import styles from "../../styles/reset.module.css";

export default function Reset() {

    let router = useRouter();
    const { resetToken } = router.query;

    const [response, setResponse] = useState();

    const passwordVisibility = useRef();
    const passwordConfirmVisibility = useRef();
    const [passwordIsHidden, setPasswordIsHidden] = useState(true);
    const [error, setError] = useState();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    function handlePasswordVisibility() {
        let passwordTag = passwordRef.current;
        let passwordConfirmTag = passwordConfirmRef.current;
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
        passwordConfirmVisibility.current.innerHTML = passwordVisibility.current.innerHTML;
        setPasswordIsHidden(!passwordIsHidden);
        passwordTag.type = passwordIsHidden ? "text" : "password";
        passwordConfirmTag.type = passwordIsHidden ? "text" : "password";
    }

    async function changePassword() {
        let password = passwordRef.current.value;
        let passwordConfirm = passwordConfirmRef.current.value;
        setError(null);
        if (password === "" || passwordConfirm === "") {
            setError("Bitte füllen sie alle Felder aus!");
            return;
        }
        if (password !== passwordConfirm) {
            setError("Passwörter stimmen nicht überein!");
            return;
        }

        axios.post(`${API_URL}/auth/resetPassword`, {
            token: resetToken,
            newPassword: password
        }).then(res => {
            router.push("/login");
        }).catch(err => {
            setError(err.response.data.message);
        });
    }

    return (
        <div className={styles.parent}>
            <div>
                <Container className="w-100">
                    <h2 className="fw-bold">Neues Passwort</h2>

                    <Form className={styles.form}>

                        <InputGroup className="mb-4">
                            <FormControl
                                className="rounded-0 border-0 border-bottom border-dark"
                                type="password"
                                placeholder="Neues Passwort"
                                aria-label="Password"
                                aria-describedby="input-group-addon"
                                ref={passwordRef}
                                required
                            />
                            <div className="input-group-addon border-bottom border-dark mt-1" onClick={handlePasswordVisibility} ref={passwordVisibility}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                </svg>
                            </div>
                        </InputGroup>

                        <InputGroup className="mb-4">
                            <FormControl
                                className="rounded-0 border-0 border-bottom border-dark"
                                type="password"
                                placeholder="Neues Passwort wiederholen"
                                aria-label="Password"
                                aria-describedby="input-group-addon"
                                ref={passwordConfirmRef}
                                required
                            />
                            <div className="input-group-addon border-bottom border-dark mt-1" onClick={handlePasswordVisibility} ref={passwordConfirmVisibility}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                </svg>
                            </div>
                        </InputGroup>

                        <Button
                            className="w-100 rounded-0"
                            variant="outline-dark"
                            size={"md"}
                            onClick={changePassword}
                            style={{ transition: '0.5s' }}>
                            Passwort zurücksetzen
                        </Button>
                        {error &&
                            <Alert variant={"danger"} className="rounded-0 mt-3" style={{ maxWidth: "500px" }}>
                                {error}
                            </Alert>
                        }
                    </Form>
                </Container>
            </div>
        </div>
    )
}
