import React from 'react'
import styles from '../styles/headingAndContent.module.css';


function HeadingAndContent(props) {

    return (
        <div className={`${styles.parent} mb-5`}>
            <div className="w-75 d-flex justify-content-center align-items-center mt-5 w-100">
                <div className={`${styles.child}`}>
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