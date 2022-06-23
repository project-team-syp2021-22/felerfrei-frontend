import React, { useRef, useState } from 'react'
import { Container, Form, InputGroup, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { API_URL } from '../../components/constants';
import styles from "../../styles/reset.module.css";

export default function ResetRequest() {

    const emailRef = useRef();
    let [error, setError] = useState();
    let [success, setSuccess] = useState();
    let [loading, setLoading] = useState();

    async function sendEmail() {
        let email = emailRef.current.value;
        if (email === '')
            return;

        setError(null);
        setSuccess(null);
        setLoading(true);
        await axios.post(`${API_URL}/auth/requestResetPassword`, { email })
            .then(res => {
                setSuccess('Wir haben eine E-Mail mit einem Link zum Zurücksetzen deines Passworts an ' + email + ' gesendet.');
            })
            .catch(err => {
                setError(err.response.data);
            });
        setLoading(false);
    }

    return (
        <div className={styles.parent}>
            <div style={{ maxWidth: "500px" }}>
                <Container className="w-100">
                    <h2 className="fw-bold">Passwort zurücksetzen</h2>
                    <Form className={styles.form}>
                        <InputGroup className="mb-4 mt-4">
                            <Form.Label>
                                Bitte geben Sie Ihre E-Mail ein um einen Link zum Zurücksetzen Ihres Passworts zu
                                erhalten
                            </Form.Label>
                            <Form.Control
                                className="rounded-0 border-0 border-bottom border-dark mt-3"
                                placeholder="E-Mail"
                                aria-label="E-Mail"
                                aria-describedby="basic-addon1"
                                ref={emailRef}
                                required
                            />
                            <div className="input-group-addon border-bottom border-dark mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="bi bi-at" viewBox="0 0 16 16">
                                    <path
                                        d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                                </svg>
                            </div>
                        </InputGroup>
                        <Button
                            disabled={loading}
                            onClick={sendEmail}
                            className="w-100 rounded-0 mt-4"
                            variant="outline-dark"
                            size={"md"}
                            foc
                            style={{ transition: '0.5s' }}>
                            {!loading && <>Send me a reset link</>}
                            {loading &&
                                <Spinner animation="border" />
                            }
                        </Button>
                        {error &&
                            <Alert variant={"danger"} className="rounded-0 mt-3" style={{ maxWidth: "500px" }}>
                                {error}
                            </Alert>
                        }
                        {success &&
                            <Alert variant={"success"} className="rounded-0 mt-3" style={{ maxWidth: "500px" }}>
                                {success}
                            </Alert>
                        }
                    </Form>
                </Container>
            </div>
        </div>
    )
}
