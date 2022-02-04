import React from 'react';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';

function NavigationBar() {
    return (
        <div className="">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mb-3 border-bottom" >
                <Container>
                    <Navbar.Brand href="/">
                        <span style={{ fontSize: "20pt" }}>
                            Felerfrei
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/shop" style={{ fontSize: "15pt" }}>
                                Shop
                            </Nav.Link>
                            <Nav.Link href="/" style={{ fontSize: "15pt" }}>Was?</Nav.Link>
                            <Nav.Link href="/" style={{ fontSize: "15pt" }}>Wer?</Nav.Link>
                            <Nav.Link href="/" style={{ fontSize: "15pt" }}>Impressum</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavigationBar;
