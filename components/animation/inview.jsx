import { useAnimation, motion } from 'framer-motion';
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

const variants = {
    visible: {
        opacity: 1, scale: 1,
        transition: {
            duration: 1,
        },
        y: 0,
    },
    hidden: { opacity: 0, scale: 1, y: 300 }
};

function FadeInView({ children }) {

    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={variants}
            className="content"
        >
            {children}
        </motion.div>
    )
}

export default FadeInView