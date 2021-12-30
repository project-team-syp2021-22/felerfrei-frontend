import React, { useRef } from 'react';
import { useAuth } from './authprovider';
import Button from 'react-bootstrap/Button';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AuthExample() {
	const { user, login, logout, signup } = useAuth();

	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const signupEmailRef = useRef();
	const signupPasswordRef = useRef();
	const passwordCheckRef = useRef();
	const firstnameRef = useRef();
	const lastnameRef = useRef();
	const telephonenumberRef = useRef();

	function log() {
		let email = emailRef.current.value;
		let password = passwordRef.current.value;
		console.log(email, password);
		login(email, password);
	}


	function sign() {
		const email = signupEmailRef.current.value;
		const password = signupPasswordRef.current.value;
		const passwordCheck = passwordCheckRef.current.value;
		const firstname = firstnameRef.current.value;
		const lastname = lastnameRef.current.value;
		const telephonenumber = telephonenumberRef.current.value;

		if (password !== passwordCheck) {
			// bei der app bessere fehlermeldung als alert
			alert('Passwords do not match');
			return;
		}

		signup(email, password, firstname, lastname, telephonenumber);
	}


	return (
		<div>
			{user && <h1>Welcome {user.email}</h1>}

			{!user && (
				<Container className="center mt-5" style={{ maxWidth: "400px" }}>
					<h1>Login - Test</h1>
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

			{!user && (
				<Container className="center mt-5" style={{ maxWidth: "400px" }}>
					<h1>Signup - Test</h1>
					<Form>
						<Form.Group>
							<Form.Control ref={signupEmailRef} type="email" placeholer="test@mail.com" />
							<Form.Control ref={signupPasswordRef} type="password" placeholder="enter your password" className="mt-4" />
							<Form.Control ref={passwordCheckRef} type="password" placeholder="enter your password" className="mt-4" />
							<Form.Control ref={firstnameRef} type="text" placeholder="firstname" className="mt-4" />
							<Form.Control ref={lastnameRef} type="text" placeholder="lastname" className="mt-4" />
							<Form.Control ref={telephonenumberRef} type="text" placeholder="tel. this field will be replaced" className="mt-4" />
						</Form.Group>
					</Form>
					<Button onClick={sign} className="mt-4">Signup!</Button>
				</Container>
			)}
			<Button onClick={logout}>Logout</Button>
		</div>
	);
}
