import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinalCTA = () => {
    const navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(false);

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #0a0a0f 0%, #1a0a1f 100%)',
            padding: '120px 20px'
        }}>
            {/* Animated Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.1), transparent 70%)',
                animation: 'pulse 4s ease-in-out infinite'
            }} />

            <div style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                maxWidth: '800px'
            }}>
                {/* Icon */}
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{
                        fontSize: '80px',
                        marginBottom: '32px',
                        filter: 'drop-shadow(0 0 40px rgba(0, 245, 255, 0.6))'
                    }}
                >
                    ☕
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: '56px',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #00F5FF, #B026FF, #FFB800)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '24px',
                        lineHeight: 1.2
                    }}
                >
                    Initialize Your Morning
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontSize: '20px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '48px',
                        lineHeight: 1.6
                    }}
                >
                    Join 10,000+ coffee enthusiasts brewing the future.
                    <br />
                    Your perfect cup is just one click away.
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                    onClick={() => navigate('/login')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: '20px 60px',
                        fontSize: '20px',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #00F5FF, #B026FF)',
                        border: 'none',
                        borderRadius: '100px',
                        color: 'white',
                        cursor: 'pointer',
                        boxShadow: '0 10px 40px rgba(0, 245, 255, 0.4)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}
                >
                    {/* Particle Effect */}
                    {isHovering && (
                        <>
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    animate={{
                                        x: (Math.random() - 0.5) * 200,
                                        y: (Math.random() - 0.5) * 200,
                                        opacity: 0,
                                        scale: 0
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: 'easeOut'
                                    }}
                                    style={{
                                        position: 'absolute',
                                        width: '4px',
                                        height: '4px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        left: '50%',
                                        top: '50%'
                                    }}
                                />
                            ))}
                        </>
                    )}

                    <Sparkles size={20} />
                    <span>Start Brewing</span>
                    <ArrowRight size={20} />
                </motion.button>

                {/* Secondary Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginTop: '24px'
                    }}
                >
                    No credit card required • Free tier available • Cancel anytime
                </motion.p>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `}</style>
        </section>
    );
};

export default FinalCTA;
