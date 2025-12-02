import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = false, ...props }) => {
    return (
        <motion.div
            className={`glass-panel ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hoverEffect ? {
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(212, 175, 55, 0.2)",
                borderColor: "rgba(212, 175, 55, 0.4)"
            } : {}}
            transition={{ duration: 0.4 }}
            style={{ padding: '24px', overflow: 'hidden', position: 'relative' }}
            {...props}
        >
            {/* Glossy reflection effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)',
                pointerEvents: 'none'
            }} />
            {children}
        </motion.div>
    );
};

export default GlassCard;
