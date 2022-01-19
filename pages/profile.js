import {Button, Col, Container, Form, FormControl, FormGroup, InputGroup, Row} from "react-bootstrap";
import React, {useRef, useState} from "react";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import {useRouter} from "next/router";

function handlePasswordVisibility() {
    const passwordVisibility = true;
    const [passwordIsHidden, setPasswordIsHidden] = useState(true);
    const [loginError, setLoginError] = useState();
    const passwordRef = useRef();
    const emailRef = useRef();
    const router = useRouter();
    let htmlTag = passwordVisibility.current;
    if (passwordIsHidden) {
        htmlTag.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg >`
    } else {
        htmlTag.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
            `
    }
    setPasswordIsHidden(!passwordIsHidden);
    passwordRef.current.type = passwordIsHidden ? "text" : "password";

}

function Profile() {


    function checkInput() {
        checkForRequiredInput("FirstName", firstName);
        checkForRequiredInput("LastName", lastName);
        checkForRequiredInput("Email", email);
        checkForRequiredInput("Password1", password1);
        checkForRequiredInput("Password2", password2);

    }

    function checkForRequiredInput(name, state) {
        if (state !== "") {
            document.getElementById(name).classList.add(classRequired)
        }
    }

    let sonderzeichen = "(°_^}"
    let firstName = useRef();
    let lastName = useRef();
    let email = useRef();
    let phone = useRef();
    let password1 = useRef();
    let password2 = useRef();
    let classRequired = "required"
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div style={{ maxWidth: "600px" }}  >
        <Container className="w-100">
            <h2 className="fw-bold">Felerfrei - Account Management</h2>
            <Form onSubmit={checkInput}>

                <Row>
                    <FormGroup as={Col}>
                        <Form.Label>Vorname *</Form.Label>

                        <InputGroup className="mb-4">
                            <FormControl
                                className="rounded-0 border-0 border-bottom border-dark"
                        type="text" placeholder="Max" id="FirstName" itemRef={firstName}/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Nachname *</Form.Label>

                        <InputGroup className="mb-4">
                            <FormControl
                                className="rounded-0 border-0 border-bottom border-dark"
                                type="text"placeholder="Musterman" id="Lastname" itemRef={lastName}/>
                        </InputGroup>
                    </FormGroup>

                </Row>


                <FormGroup>
                    <Form.Label>E-Mail *</Form.Label>

                    <InputGroup className="mb-4">
                        <FormControl
                            className="rounded-0 border-0 border-bottom border-dark"
                            type="email" id="Email" placeholder="max.musterman@gmail.com" itemRef={email}/>
                    </InputGroup>
                </FormGroup>



                <FormGroup>
                    <Form.Label>Telephon-Nummer</Form.Label>
                    <Form.Control as={"div"}>
                        <PhoneInput
                            placeholder="Enter phone number"
                            preferredCountries={['AT', 'DE']}
                            defaultCountry={'AT'}
                            paginate='30'
                            itemRef={phone}
                            onChange={() => { }}
                        />
                    </Form.Control>
                </FormGroup>
                <br/>
                <FormGroup>
                    <Form.Label>Passwort ändern</Form.Label>

                    <InputGroup className="mb-4">
                        <FormControl
                            className="rounded-0 border-0 border-bottom border-dark"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="input-group-addon"
                            ref={password1}
                            required
                        />
                        {/*<div className="input-group-addon" onClick={handlePasswordVisibility} ref={passwordVisibility}>*/}
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                        {/*         className="bi bi-eye-slash" viewBox="0 0 16 16">*/}
                        {/*        <path*/}
                        {/*            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>*/}
                        {/*        <path*/}
                        {/*            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>*/}
                        {/*        <path*/}
                        {/*            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>*/}
                        {/*    </svg>*/}
                        {/*</div>*/}


                    </InputGroup>

                </FormGroup>



                <FormGroup>
                    <Form.Label>Passwort ändern</Form.Label>


                    <InputGroup className="mb-4">
                        <FormControl
                            className="rounded-0 border-0 border-bottom border-dark"
                            type="password"
                            placeholder="passwort"
                            id="Password1"
                            aria-label="Password"
                            aria-describedby="input-group-addon"
                            ref={password1}
                            required
                        />
                        {/*<div className="input-group-addon" onClick={handlePasswordVisibility} ref={passwordVisibility}>*/}
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                        {/*         className="bi bi-eye-slash" viewBox="0 0 16 16">*/}
                        {/*        <path*/}
                        {/*            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>*/}
                        {/*        <path*/}
                        {/*            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>*/}
                        {/*        <path*/}
                        {/*            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>*/}
                        {/*    </svg>*/}
                        {/*</div>*/}


                    </InputGroup>

                    <Form.Text className="text-muted">
                        Das Passwort muss mindestens 8 Zeichen lang sein und aus Buchstaben, Zahlen und Sonderzeichen
                        wie {sonderzeichen} bestehen!
                    </Form.Text>
                </FormGroup>

        <br/>
                <div className="d-grid" style={{width: '50vw', display: 'flex', margin: 'auto'}}>
                    <Row>
                    <FormGroup as={Col}>
                    <Button variant="outline-dark" type="submit" size={"lg"} style={{transition: '0.5s'}}>
                        Account Speichern
                    </Button>
                    </FormGroup>
                        <FormGroup as={Col}>
                    <Button   variant="outline-dark" type="submit" size={"lg"} style={{transition: '0.5s'}}>
                        Account löschen
                    </Button></FormGroup>
                    </Row>


                </div>

            </Form>
        </Container>
            </div></div>)
}

export default Profile;