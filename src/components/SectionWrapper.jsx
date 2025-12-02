import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.section
            className={className}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: 'relative',
                padding: '120px 20px',
                overflow: 'hidden'
            }}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
