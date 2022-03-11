import React from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { useAuth } from "./authprovider";
import styles from "../styles/navbar.module.css";
import { motion } from "framer-motion";

function NavigationBar() {
    let { user } = useAuth();

    return (
        <>
            <motion.div
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.7,
                        delay: 0,
                        ease: 'easeInOut',
                        type: 'spring'
                    }
                }}

                className="" style={{ position: "fixed", width: "100vw", zIndex: "10" }}
            >
                <Navbar
                    collapseOnSelect
                    expand="lg"
                    bg="light"
                    variant="light"
                    className="border-bottom"
                >
                    <Container>
                        <Navbar.Brand href="/">
                            <span className={styles.hoverUnderlineAnimation} style={{ fontSize: "20pt" }}>Felerfrei</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link
                                    href="/shop"
                                    className="ms-5"
                                    style={{ fontSize: "15pt" }}
                                >
                                    <span className={styles.hoverUnderlineAnimation}>
                                        Shop
                                    </span>
                                </Nav.Link>
                                <Nav.Link href="/" className="ms-5" style={{ fontSize: "15pt" }}>
                                    <span className={styles.hoverUnderlineAnimation}>
                                        Was?
                                    </span>
                                </Nav.Link>
                                <Nav.Link href="/" className="ms-5" style={{fontSize: "15pt"}}>
                                    <span className={styles.hoverUnderlineAnimation}>
                                        Wer?
                                    </span>
                                </Nav.Link>
                                <Nav.Link href="/contact" className="ms-5" style={{fontSize: "15pt"}}>
                                    <span className={styles.hoverUnderlineAnimation}>
                                        Impressum
                                    </span>
                                </Nav.Link>
                                <Nav.Link href="/projects" className="ms-5" style={{fontSize: "15pt"}}>
                                    <span className={styles.hoverUnderlineAnimation}>
                                        Referenzen
                                    </span>
                                </Nav.Link>
                            </Nav>
                            <Nav className="mt-1">
                                {user && (
                                    <Nav.Link
                                        href="/profile"
                                        className="ms-5 d-flex flex-column align-items-center"
                                        style={{ fontSize: "15pt" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            className="bi bi-person mb-0"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        </svg>
                                        <span className={`mt-0 ${styles.hoverUnderlineAnimation}`} style={{ fontSize: "11pt" }}>
                                            {user.firstname}
                                        </span>
                                    </Nav.Link>
                                )}
                                {!user &&
                                    <Nav.Link href="/login">
                                        <span className={styles.hoverUnderlineAnimation}>
                                            Login
                                        </span>
                                    </Nav.Link>
                                }
                                <Nav.Link href="/cart">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi bi-cart2"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                    </svg>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </motion.div>
            <div style={{ height: "50pt" }} />
        </>
    );
}

export default NavigationBar;
