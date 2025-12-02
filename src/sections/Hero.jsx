import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeonText from '../components/NeonText';
import AnimatedButton from '../components/AnimatedButton';

const Hero = () => {
    const navigate = useNavigate();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #0a0a0f 0%, #1a0a1f 100%)'
        }}>
            {/* Floating Coffee Beans Background */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -100, x: Math.random() * window.innerWidth }}
                        animate={{
                            y: window.innerHeight + 100,
                            x: Math.random() * window.innerWidth,
                            rotate: 360
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        style={{
                            position: 'absolute',
                            fontSize: '24px',
                            opacity: 0.1
                        }}
                    >
                        ☕
                    </motion.div>
                ))}
            </div>

            {/* 3D Coffee Cup */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                }}
                animate={{
                    rotateX: (mousePos.y / window.innerHeight - 0.5) * 20,
                    rotateY: (mousePos.x / window.innerWidth - 0.5) * 20
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <div style={{
                    fontSize: '200px',
                    filter: 'drop-shadow(0 20px 50px rgba(0, 245, 255, 0.5))',
                    transform: 'translateZ(50px)'
                }}>
                    ☕
                </div>
            </motion.div>

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                maxWidth: '800px',
                padding: '0 20px'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <NeonText size="xlarge" color="cyan">
                        Brew the Future
                    </NeonText>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                        fontSize: '20px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginTop: '24px',
                        lineHeight: 1.6
                    }}
                >
                    The world's first AI-powered coffee operating system.
                    <br />
                    Personalized, effortless, and absolutely futuristic.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{
                        marginTop: '48px',
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}
                >
                    <AnimatedButton
                        onClick={() => navigate('/login')}
                        style={{ padding: '16px 40px', fontSize: '18px' }}
                    >
                        Initialize System
                    </AnimatedButton>
                    <button
                        onClick={() => document.getElementById('stats').scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '16px 40px',
                            fontSize: '18px',
                            background: 'transparent',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '100px',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#00F5FF';
                            e.target.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        Explore Features
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer'
                }}
                onClick={() => document.getElementById('stats').scrollIntoView({ behavior: 'smooth' })}
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
