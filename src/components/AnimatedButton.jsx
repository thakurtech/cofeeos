import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    return (
        <motion.button
            className={`btn-premium ${className}`}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            {...props}
            style={{
                background: variant === 'secondary'
                    ? 'transparent'
                    : 'linear-gradient(45deg, var(--color-primary), var(--color-primary-light))',
                border: `1px solid ${variant === 'secondary' ? 'rgba(255,255,255,0.2)' : 'var(--color-accent)'}`,
                color: variant === 'secondary' ? 'white' : 'var(--color-accent)'
            }}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton;
