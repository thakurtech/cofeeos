import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BrewingProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getBrewingStage = () => {
        if (scrollProgress < 25) return 'Grinding Beans...';
        if (scrollProgress < 50) return 'Brewing...';
        if (scrollProgress < 75) return 'Frothing Milk...';
        return 'Ready to Serve!';
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            pointerEvents: 'none'
        }}>
            {/* Progress Bar */}
            <div style={{
                height: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #00F5FF 0%, #B026FF 50%, #FFB800 100%)',
                        boxShadow: '0 0 20px rgba(0, 245, 255, 0.6)',
                        width: `${scrollProgress}%`,
                        transition: 'width 0.1s ease-out'
                    }}
                />
            </div>

            {/* Brewing Stage Label */}
            <div style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(10, 10, 15, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '8px 24px',
                borderRadius: '100px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#00F5FF',
                    boxShadow: '0 0 10px #00F5FF',
                    animation: 'pulse 2s infinite'
                }} />
                <span style={{
                    fontSize: '14px',
                    color: 'white',
                    fontWeight: '600'
                }}>
                    {getBrewingStage()}
                </span>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default BrewingProgress;
