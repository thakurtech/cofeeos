import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Coffee } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';

const HowItWorks = () => {
    const steps = [
        {
            number: '01',
            icon: Search,
            title: 'Browse & Discover',
            description: 'Explore our AI-curated menu with personalized recommendations',
            color: '#00F5FF'
        },
        {
            number: '02',
            icon: ShoppingCart,
            title: 'Order Instantly',
            description: 'Add to cart and checkout in seconds with zero wait time',
            color: '#B026FF'
        },
        {
            number: '03',
            icon: Coffee,
            title: 'Enjoy',
            description: 'Pick up your perfectly brewed coffee and fuel your day',
            color: '#FFB800'
        }
    ];

    return (
        <SectionWrapper>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <NeonText size="large" color="cyan">
                        How It Works
                    </NeonText>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '16px'
                    }}>
                        From order to enjoy in three simple steps
                    </p>
                </div>

                <div style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '48px'
                }}>
                    {/* Connecting Line */}
                    <svg
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '25%',
                            right: '25%',
                            height: '2px',
                            zIndex: 0,
                            display: window.innerWidth < 900 ? 'none' : 'block'
                        }}
                        preserveAspectRatio="none"
                        viewBox="0 0 100 2"
                    >
                        <motion.path
                            d="M 0 1 L 100 1"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2 }}
                        />
                        <defs>
                            <linearGradient id="gradient">
                                <stop offset="0%" stopColor="#00F5FF" />
                                <stop offset="50%" stopColor="#B026FF" />
                                <stop offset="100%" stopColor="#FFB800" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.3, duration: 0.8 }}
                            style={{
                                position: 'relative',
                                zIndex: 1
                            }}
                        >
                            {/* Step Number */}
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '24px'
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    fontSize: '72px',
                                    fontWeight: '900',
                                    background: `linear-gradient(135deg, ${step.color}40, ${step.color}10)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: 1
                                }}>
                                    {step.number}
                                </div>
                            </div>

                            {/* Icon */}
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto 24px',
                                    borderRadius: '20px',
                                    background: `linear-gradient(135deg, ${step.color}40, ${step.color}20)`,
                                    border: `2px solid ${step.color}60`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 10px 30px ${step.color}30`
                                }}
                            >
                                <step.icon size={36} color={step.color} />
                            </motion.div>

                            {/* Content */}
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: 'white',
                                    marginBottom: '12px'
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    fontSize: '14px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    lineHeight: 1.6
                                }}>
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default HowItWorks;
