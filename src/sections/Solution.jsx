import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';
import GlassPanel from '../components/GlassPanel';

const Solution = () => {
    return (
        <SectionWrapper>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '48px',
                    alignItems: 'center'
                }}>
                    {/* Left - Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <NeonText size="large" color="cyan">
                            CoffeeShopOS
                        </NeonText>
                        <p style={{
                            fontSize: '24px',
                            fontWeight: '300',
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginTop: '16px',
                            marginBottom: '32px',
                            lineHeight: 1.5
                        }}>
                            The world's first <span style={{ color: '#00F5FF', fontWeight: '600' }}>AI-powered</span> coffee operating system
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { icon: Brain, text: 'AI-powered personalized recommendations' },
                                { icon: Zap, text: 'Instant ordering, zero wait time' },
                                { icon: Sparkles, text: 'Seamless admin & customer experience' }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #00F5FF40, #B026FF40)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #00F5FF60'
                                    }}>
                                        <feature.icon size={20} color="#00F5FF" />
                                    </div>
                                    <span style={{
                                        fontSize: '16px',
                                        color: 'rgba(255, 255, 255, 0.8)'
                                    }}>
                                        {feature.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - 3D App Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{
                            perspective: '1000px',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <motion.div
                            whileHover={{ rotateY: 10, rotateX: -10, scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <GlassPanel>
                                <div style={{
                                    padding: '24px',
                                    minHeight: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '24px'
                                }}>
                                    {/* Mock Interface */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #00F5FF20, #B026FF20)',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        border: '1px solid #00F5FF40'
                                    }}>
                                        <div style={{ fontSize: '14px', color: '#00F5FF', marginBottom: '8px' }}>
                                            AI Recommendation
                                        </div>
                                        <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
                                            "Try our Vanilla Latte"
                                        </div>
                                    </div>

                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '12px',
                                        padding: '16px'
                                    }}>
                                        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                                            Order Status
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px'
                                        }}>
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: '#FFB80080',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                ☕
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>
                                                    Ready in 2 mins
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '8px'
                                    }}>
                                        <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                                            Total
                                        </span>
                                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#FFB800' }}>
                                            ₹250
                                        </span>
                                    </div>
                                </div>
                            </GlassPanel>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Solution;
