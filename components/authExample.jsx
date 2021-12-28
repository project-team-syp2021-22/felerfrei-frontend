import React, { useRef } from 'react';
import { useAuth } from './authprovider';
import Button from 'react-bootstrap/Button';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AuthExample() {
	const { user, login, logout } = useAuth();

	const emailRef = useRef();
	const passwordRef = useRef();

	function log() {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		login(email, password);
	}



	return (
		<div>
			{user && <h1>Welcome {user.email}</h1>}

			{!user && (
				<Container className="center mt-5" style={{ maxWidth: "400px" }}>
					<Form>
						<Form.Group>
							<Form.Control ref={emailRef} type="email" placeholer="enter your email" />
							<Form.Control ref={passwordRef} type="password" placeholder="enter your password" className="mt-4" />
						</Form.Group>
					</Form>
					<Button variant="primary" className='mt-4' onClick={log}>
						Login
					</Button>
				</Container>
			)}
			<Button onClick={logout}>Logout</Button>
		</div>
	);
}
