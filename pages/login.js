import React, { useRef, useState } from 'react'
import { Container, Form, InputGroup, FormControl, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../components/authprovider'
import { useRouter } from 'next/router';
import Link from 'next/link';
import FadeInView from '../components/animation/inview';
import styles from "../styles/login.module.css";

export default function Login(props) {
    const passwordVisibility = useRef();
    const [passwordIsHidden, setPasswordIsHidden] = useState(true);
    const [loginError, setLoginError] = useState();
    const passwordRef = useRef();
    const emailRef = useRef();
    const router = useRouter();

    let { login } = useAuth();

    function handlePasswordVisibility() {
        let htmlTag = passwordVisibility.current;
        if (passwordIsHidden) {
            htmlTag.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>`
        } else {
            htmlTag.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg >
            `
        }
        setPasswordIsHidden(!passwordIsHidden);
        passwordRef.current.type = passwordIsHidden ? "text" : "password";

    }

    async function tryLogin() {
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        setLoginError(null);
        if (email === "" || password === "") {
            return setLoginError("Bitte f??llen Sie alle Felder aus.");
        }
        try {
            await login(email, password);
        } catch (error) {
            // handle error
            console.log("here")
            setLoginError("Sie konnten nicht eingeloggt werden. Bitte ??berpr??fen Sie Ihre Eingaben.");
            return;
        }
        const route = props.to ? props.to : '/';
        router.push(route);
    }

    return (
        <FadeInView>
            <div className={styles.parent}>
                <div className={styles.inputDialog}>
                    <Container className="w-100">
                        <h2 className="fw-bold">Login</h2>
                        <Form className={styles.form}>
                            <InputGroup className="mb-4 mt-4">
                                <Form.Control
                                    className="rounded-0 border-0 border-bottom border-dark"
                                    placeholder="E-Mail"
                                    aria-label="E-Mail"
                                    aria-describedby="basic-addon1"
                                    ref={emailRef}
                                    required
                                />
                                <div className="input-group-addon border-bottom border-dark mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-at" viewBox="0 0 16 16">
                                        <path
                                            d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                                    </svg>
                                </div>
                            </InputGroup>
                            <InputGroup className="mb-4">
                                <FormControl
                                    className="rounded-0 border-0 border-bottom border-dark"
                                    type="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="input-group-addon"
                                    ref={passwordRef}
                                    required
                                />
                                <div className="input-group-addon border-bottom border-dark mt-1"
                                    onClick={handlePasswordVisibility} ref={passwordVisibility}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path
                                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                        <path
                                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                        <path
                                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                    </svg>
                                </div>
                            </InputGroup>
                            <Button onClick={tryLogin}
                                className="w-100 rounded-0"
                                variant="outline-dark"
                                size={"md"}
                                style={{ transition: '0.5s' }}>
                                Anmelden
                            </Button>

                        </Form>

                        <div className="mt-4">
                            <Link href="/signup">Noch kein Konto?</Link>
                        </div>
                        <div>
                            <Link href="/reset">Passwort vergessen?</Link>
                        </div>
                        {loginError &&
                            <Alert variant={"danger"} className={`rounded-0 mt-3 ${styles.error}`}>
                                <div className="d-flex justify-content-center align-items-center m-auto h-100"
                                    style={{ textAlign: "center", verticalAlign: "middle" }}>
                                    {loginError}
                                </div>
                            </Alert>
                        }
                    </Container>
                </div>
            </div>
        </FadeInView>
    );
}
