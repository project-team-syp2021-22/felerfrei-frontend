import React from 'react';
import { useAuth } from './authprovider';
import Button from 'react-bootstrap/Button';

export default function AuthExample() {
	const { user, login } = useAuth();

	function log() {
		login('hallo', 'hallo');
	}

	return (
		<div>
			{user && <h1>Welcome {user.username}</h1>}

			{!user && (
				<Button variant="primary" onClick={log}>
					Login
				</Button>
			)}
		</div>
	);
}
