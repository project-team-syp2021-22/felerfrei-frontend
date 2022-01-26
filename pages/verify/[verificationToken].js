import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../components/constants';

export default function Verify() {
    let router = useRouter();
    const { verificationToken } = router.query;

    const [response, setResponse] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (verificationToken === undefined)
            return;
        axios.post(`${API_URL}/auth/verify`, { token: verificationToken })
            .then(res => {
                console.log(res)

                setResponse('Your account has been verified');
            })
            .catch(err => {
                setError('Verification failed');
            });
    }, [verificationToken]);


    return (
        <div className='w-100'>

            <Container className="center mt-5 text-center">
                {!response && !error && <Spinner animation="border" variant="primary" />}
                
                {response &&
                    <>
                        <h1>Thank you for your registration!</h1>
                        <div>
                            <p>{response}</p>
                        </div>
                    </>
                }
                {error && 
                    <>
                        <h1>{error}</h1>
                    </>
                }
            </Container>
        </div>
    )
}
