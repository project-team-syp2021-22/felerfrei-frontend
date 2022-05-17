import React from 'react'
import styles from '../styles/twocontents.module.css';

// bitte einen besseren namen überlegen :(
/**
 * Provides a design for two images with content underneath.
 * props should look like this:
 * {
 * image1="https://www.example.com/image1.jpg",
 * heading1="Heading 1",
 * content1="This is the content of the first image",
 * image2="https://www.example.com/image2.jpg",
 * heading2="Heading 2",
 * content2="This is the content of the second image"
 * }
 * @param {*} props Props which include images and content
 * @returns 
 */
function TwoContents(props) {
    return (
        <div className="d-flex justify-content-center align-content-center mt-3 w-100 mb-5">
            <div className="w-75 d-flex justify-content-center mt-5">
                <div className={styles.contentSeparator}>
                    <div className={styles.content1}>
                        <img width={350} src={props.image1} />
                        <div className="text-break" style={{ width: "350px" }}>
                            <div className={`w-100 ${styles.subheading} mt-1`}>
                                {props.heading1}
                            </div>
                            <div className={styles.text}>
                                {props.content1}
                            </div>
                        </div>
                    </div>
                    <div className={styles.content2}>
                        <img width={350} src={props.image2} />
                        <div className="text-break" style={{ width: "350px" }}>
                            <div className={`w-100 ${styles.subheading} mt-1`}>
                                {props.heading2}
                            </div>
                            <div className={styles.text}>
                                {props.content2}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TwoContents