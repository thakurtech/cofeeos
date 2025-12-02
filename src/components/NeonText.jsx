import React from 'react';
import { motion } from 'framer-motion';

const NeonText = ({ children, color = 'cyan', size = 'large', className = '' }) => {
    const colors = {
        cyan: '#00F5FF',
        purple: '#B026FF',
        gold: '#FFB800',
        green: '#39FF14'
    };

    const sizes = {
        small: '24px',
        medium: '36px',
        large: '56px',
        xlarge: '72px'
    };

    return (
        <motion.h1
            className={className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
                fontSize: sizes[size],
                fontWeight: '800',
                background: `linear-gradient(135deg, ${colors[color]}, white)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 0 30px ${colors[color]}40`,
                margin: 0,
                lineHeight: 1.2
            }}
        >
            {children}
        </motion.h1>
    );
};

export default NeonText;
