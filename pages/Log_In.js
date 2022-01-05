import {Button, Form, FormGroup} from "react-bootstrap";
import {useAuth} from "../components/authprovider";
import {useState} from "react";

export default function Log_In(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, login } = useAuth();

    function onSubmit(){
        login(email, password);
        //todo das muss mir der werte Herr Projektleiter zeigen was ich da machen soll
    }

    return (
        <div style={{
            width: '80vw',
            margin: 'auto',
            padding: '5vw',
            border: 'black solid 3px',
            borderRadius: '25px',
            marginTop: '10vh'
        }}>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Form.Label>E-Mail *</Form.Label>
                    <Form.Control type="email" id="Email" placeholder="max.musterman@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Passwort *</Form.Label>
                    <Form.Control type="password" placeholder="passwort" id="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                </FormGroup>
                <br/>

                <br/>

                <div className="d-grid" style={{width: '50vw', display: 'flex', margin: 'auto'}}>
                    <Button variant="outline-dark" type="submit" size={"lg"} style={{transition: '0.5s'}}>
                        Anmelden
                    </Button>
                </div>
            </Form>
        </div>
    )
}