import React from 'react';
import { motion } from 'framer-motion';

const GlassPanel = ({ children, className = '', hover3D = true }) => {
    return (
        <motion.div
            className={className}
            whileHover={hover3D ? { y: -10, rotateX: 5, scale: 1.02 } : {}}
            transition={{ duration: 0.3 }}
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '32px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            {children}
        </motion.div>
    );
};

export default GlassPanel;
