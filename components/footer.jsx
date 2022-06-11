import React from 'react'
import styles from '../styles/footer.module.css';

function Footer() {
    return (
        <div className={`${styles.alignFooter}`}>

            <div className={`w-100 text-light ${styles.footer}`}>
                <div className={` pb-5 pt-3 ${styles.row}`}>
                    <div className={`${styles.column} ${styles.rightBorder}`} style={{ width: "300px" }}>
                        <span className={styles.heading}>
                            Über uns
                        </span>
                        <div className={styles.text}>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit
                        </div>
                    </div>
                    <div className={`${styles.column} ${styles.rightBorder}`} style={{ width: "300px" }}>
                        <span className={styles.heading}>
                            Felerfrei
                        </span>
                        <div className={styles.text}>
                            Straße 3
                            <br />
                            12345 Berlin
                            <br />
                            <div style={{ textAlign: "left" }}>
                                T: +49 123 456 789
                                <br />
                                E: email@felerfrei.at
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.column} ${styles.rightBorder}`} style={{ width: "300px" }}>
                        <span className={styles.heading}>
                            LINKS
                        </span>
                        <div className={styles.text}>
                            Facebook
                            <br />
                            Instagram
                            <br />
                            Twitter
                        </div>
                    </div>
                    <div className={styles.column} style={{ width: "300px" }}>
                        <span className={styles.heading}>
                            Login
                        </span>
                        <div className={styles.text}>
                            Login
                            <br />
                            Sign Up
                        </div>
                    </div>
                </div>
                <div>Font made from <a target="_blank" href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed by CC BY 3.0</div>

            </div >
        </div >
    );
}

export default Footer;