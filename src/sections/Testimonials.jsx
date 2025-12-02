import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';
import GlassPanel from '../components/GlassPanel';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Software Engineer',
            image: '👩‍💻',
            text: 'The AI recommendations are spot on! It feels like having a personal barista who knows exactly what I need.',
            rating: 5
        },
        {
            name: 'Marcus Johnson',
            role: 'Entrepreneur',
            image: '👨‍💼',
            text: 'Saves me 30 minutes every morning. The instant ordering feature is a game-changer for busy professionals.',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            role: 'Designer',
            image: '👩‍🎨',
            text: 'Beautiful interface, amazing coffee, and the chatbot actually understands me. Love everything about it!',
            rating: 5
        }
    ];

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <SectionWrapper>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <NeonText size="large" color="green">
                        Loved by Thousands
                    </NeonText>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '16px'
                    }}>
                        Join our community of satisfied coffee enthusiasts
                    </p>
                </div>

                <div style={{ position: 'relative' }}>
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <GlassPanel>
                            <div style={{ padding: '48px', position: 'relative' }}>
                                {/* Quote Icon */}
                                <Quote
                                    size={48}
                                    color="rgba(57, 255, 20, 0.2)"
                                    style={{
                                        position: 'absolute',
                                        top: '24px',
                                        left: '24px'
                                    }}
                                />

                                {/* Stars */}
                                <div style={{
                                    display: 'flex',
                                    gap: '4px',
                                    marginBottom: '24px',
                                    justifyContent: 'center'
                                }}>
                                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                        <span key={i} style={{ fontSize: '24px' }}>⭐</span>
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p style={{
                                    fontSize: '20px',
                                    color: 'white',
                                    lineHeight: 1.8,
                                    textAlign: 'center',
                                    marginBottom: '32px',
                                    fontStyle: 'italic'
                                }}>
                                    "{testimonials[activeIndex].text}"
                                </p>

                                {/* Author */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '16px'
                                }}>
                                    <div style={{
                                        fontSize: '48px',
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #39FF1440, #00F5FF40)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid #39FF1460'
                                    }}>
                                        {testimonials[activeIndex].image}
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            color: 'white'
                                        }}>
                                            {testimonials[activeIndex].name}
                                        </div>
                                        <div style={{
                                            fontSize: '14px',
                                            color: 'rgba(255, 255, 255, 0.6)'
                                        }}>
                                            {testimonials[activeIndex].role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassPanel>
                    </motion.div>

                    {/* Navigation */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        marginTop: '32px'
                    }}>
                        <button
                            onClick={prev}
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <ChevronLeft color="white" />
                        </button>
                        <button
                            onClick={next}
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <ChevronRight color="white" />
                        </button>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Testimonials;
