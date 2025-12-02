import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Frown, TrendingDown } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';

const Problem = () => {
    return (
        <SectionWrapper>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                    <NeonText size="large" color="purple">
                        Old Coffee is Boring
                    </NeonText>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '16px'
                    }}>
                        Traditional coffee shops are stuck in the past
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '32px'
                }}>
                    {[
                        {
                            icon: Clock,
                            title: 'Long Wait Times',
                            description: 'Standing in line for 15 minutes just to order your daily fix',
                            glitch: true
                        },
                        {
                            icon: Frown,
                            title: 'Generic Experience',
                            description: 'Same boring menu for everyone, no personalization',
                            glitch: true
                        },
                        {
                            icon: TrendingDown,
                            title: 'Wasted Time',
                            description: 'No way to order ahead or skip the morning chaos',
                            glitch: true
                        }
                    ].map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            style={{
                                padding: '32px',
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                filter: 'grayscale(0.8)',
                                position: 'relative'
                            }}
                        >
                            {problem.glitch && (
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    fontSize: '12px',
                                    color: '#FF0066',
                                    fontWeight: '600',
                                    animation: 'glitch 2s infinite'
                                }}>
                                    ERROR
                                </div>
                            )}
                            <problem.icon
                                size={32}
                                color="rgba(255, 255, 255, 0.3)"
                                style={{ marginBottom: '16px' }}
                            />
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                color: 'rgba(255, 255, 255, 0.6)',
                                marginBottom: '12px'
                            }}>
                                {problem.title}
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: 'rgba(255, 255, 255, 0.4)',
                                lineHeight: 1.6
                            }}>
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes glitch {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; transform: translate(2px, 2px); }
                }
            `}</style>
        </SectionWrapper>
    );
};

export default Problem;
