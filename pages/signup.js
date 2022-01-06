import {FormGroup, Form, Row, Col, Button} from "react-bootstrap";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {useRef, useState} from "react";

export default function Sign_In() {
    let sonderzeichen = "(°_^}"
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const phone = useRef();
    const password1 = useRef();
    const password2 = useRef();
    const classRequired = "required"

    function checkInput(){
        checkForRequiredInput("FirstName", firstName);
        checkForRequiredInput("LastName", lastName);
        checkForRequiredInput("Email", email);
        checkForRequiredInput("Password1", password1);
        checkForRequiredInput("Password2", password2);

        
    }

    function checkForRequiredInput(name, state){
        if(state !== ""){
            document.getElementById(name).classList.add(classRequired)
        }
    }

    return (
        <div
        // style={{
        //     width: '80vw',
        //     margin: 'auto',
        //     padding: '5vw',
        //     border: 'black solid 3px',
        //     borderRadius: '25px',
        //     marginTop: '10vh',
        //     outline: 'none'
        // }}
        >
            <Form onSubmit={checkInput}>
                <Row>
                    <FormGroup as={Col}>
                        <Form.Label>Vorname *</Form.Label>
                        <Form.Control type="text" placeholder="Max" id="FirstName" itemRef={firstName}/>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Nachname *</Form.Label>
                        <Form.Control type="text" placeholder="Musterman" id="Lastname" itemRef={lastName}/>
                    </FormGroup>
                </Row>

                <br/>

                <FormGroup>
                    <Form.Label>E-Mail *</Form.Label>
                    <Form.Control type="email" id="Email" placeholder="max.musterman@gmail.com" itemRef={email}/>
                </FormGroup>

                <br/>

                <FormGroup>
                    <Form.Label>Telephon-Nummer</Form.Label>
                    <Form.Control as={"div"}>
                        <PhoneInput
                            placeholder="Enter phone number"
                            preferredCountries={['AT', 'DE']}
                            defaultCountry={'AT'}
                            paginate='30'
                            itemRef={phone}
                            onChange={() => {}}
                        />
                    </Form.Control>
                </FormGroup>

                <br/>

                <FormGroup>
                    <Form.Label>Passwort *</Form.Label>
                    <Form.Control type="password" placeholder="passwort" id="Password1" itemRef={password1}/>
                    <Form.Text className="text-muted">
                        Das Passwort muss mindestens 8 Zeichen lang sein und aus Buchstaben, Zahlen und Sonderzeichen
                        wie {sonderzeichen} bestehen!
                    </Form.Text>
                </FormGroup>
                <br/>
                <FormGroup>
                    <Form.Label>Passwort bestätigen *</Form.Label>
                    <Form.Control type="password" placeholder="passwort" id="Password2" itemRef={password2}/>
                </FormGroup>

                <br/>

                <div className="d-grid" style={{width: '50vw', display: 'flex', margin: 'auto'}}>
                    <Button variant="outline-dark" type="submit" size={"lg"} style={{transition: '0.5s'}}>
                        Account anlegen
                    </Button>
                </div>
            </Form>
        </div>
    )
}