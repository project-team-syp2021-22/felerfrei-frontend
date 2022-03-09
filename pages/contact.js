import React from "react";
import background from '../public/start.svg';
import Image from "next/image";
import {motion} from "framer-motion";
import Divider from "../components/divider";
import FadeInView from "../components/animation/inview";
import Link from 'next/link';
import styles from '../styles/contactPage.module.css';
import Footer from "../components/footer";

export default function Contacts() {
    return <>
        <motion.div
            initial={{
                opacity: -5,
                y: 200
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                    // type: "spring",
                }
            }}
            style={{zIndex: "-10"}}
        >
            <Image src={background} alt="background"/>
        </motion.div>
        <FadeInView>
            <div className="d-flex justify-content-center align-content-center mt-3 w-100 mb-5">
                <div className="w-75 d-flex justify-content-evenly mt-5">
                    <div className="d-flex flex-row justify-content-evenly w-100">
                        <div className="d-flex align-items-center justify-content-evenly h-100 me-5">
                            <div className="ms-5 d-flex align-content-center flex-column">
                                <h1 className={styles.textCentering}><b>Kontaktieren Sie mich</b></h1>
                                <h4 className={styles.textCentering}>Unter der Woche täglich,</h4>
                                <h4 className={styles.textCentering}>von 7-12 und von 13-16 Uhr</h4>
                                <br/>
                                <h3 className={styles.textCentering}><b>FELERFREI</b></h3>
                                <h3 className={styles.textCentering}>Unterm Tisch 3</h3>
                                <h3 className={styles.textCentering}>1234 Irgendwo</h3>
                                <h3 className={styles.linking}>T:<span><Link className={styles.hoverUnderlineAnimation}
                                                                             href="tel:0664 1234567">0664 1234567 </Link></span>
                                </h3>
                                <h3 className={styles.linking}>E:<Link className={styles.hoverUnderlineAnimation}
                                                                       href="mailto:office@felerfrei.at">office@felerfrei.at </Link>
                                </h3>
                            </div>
                        </div>
                        <img width={550}
                             src="https://images.unsplash.com/photo-1599651993975-30a482e26467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
                    </div>
                </div>
            </div>
            <Divider/>
        </FadeInView>

        <Footer/>

    </>
}