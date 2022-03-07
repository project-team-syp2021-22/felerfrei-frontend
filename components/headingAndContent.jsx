import React from 'react'
import styles from '../styles/headingAndContent.module.css';


function HeadingAndContent(props) {

    return (
        <div className="d-flex justify-content-center align-content-center w-100 mb-5">
            <div className="w-75 d-flex justify-content-center mt-5">
                <div className="d-flex flex-column align-items-center h-100 me-5 w-50">
                    <div className={styles.heading}>
                        {props.heading}
                    </div>

                    <div className={`${styles.subheading} mt-3 mb-3`} >
                        {props.subheading}
                    </div>

                    <div>
                        {props.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeadingAndContent;