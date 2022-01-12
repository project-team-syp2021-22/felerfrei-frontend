import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../components/constans';

export default function Verify() {
    let router = useRouter();
    const { verificationToken } = router.query;

    const [response, setResponse] = useState();

    useEffect(() => {
        if (verificationToken === undefined)
            return;
        axios.post(`${API_URL}/auth/verify`, { token: verificationToken })
            .then(res => {
                console.log(res)

                setResponse('Your account has been verified');
            })
            .catch(err => {
                setResponse('Verification failed');
            });
    }, [verificationToken]);


    return (
        <div className='w-100'>

            <Container className="center mt-5 text-center">
                {!response &&
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                {response &&
                    <>
                        <h1>Thank you for your registration!</h1>
                        <div>
                            <p>{response}</p>
                        </div>
                    </>
                }
            </Container>
        </div>
    )
}
