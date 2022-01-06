import { Button, Container, Form, FormGroup, InputGroup, FormControl } from "react-bootstrap";
import { useAuth } from "../components/authprovider";
import { useState, useRef } from "react";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { user, login } = useAuth();

    function onSubmit() {
        login(emailRef.current.value, passwordRef.current.value);
        //todo das muss mir der werte Herr Projektleiter zeigen was ich da machen soll
    }

    return (
        <div className="d-flex">
            <div className="custom-shape-divider-top-1641412148">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
            </div>
            <div className="flex-grow-1" style={{ maxWidth: "500px", zIndex: "5", marginTop: "38vh", marginRight: "50px", marginLeft: "auto" }}>
                <Container className="w-100">
                    <h3>Felerfrei - Login</h3>
                    <Form onSubmit={onSubmit}>
                        <InputGroup className="mb-4 mt-4">
                            <InputGroup.Text id="basic-addon1" className="bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                            </InputGroup.Text>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                ref={emailRef}
                            />
                        </InputGroup>
                        <InputGroup className="mb-4">
                            <InputGroup.Text id="basic-addon2" className="bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                                </svg>
                            </InputGroup.Text>
                            <FormControl
                                type="password"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon2"
                                ref={passwordRef}
                            />
                        </InputGroup>


                        <Button className="w-100" variant="outline-dark" type="submit" size={"md"} style={{ transition: '0.5s' }}>
                            Anmelden
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}