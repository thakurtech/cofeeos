import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            question: 'How does the AI recommendation work?',
            answer: 'Our AI analyzes your order history, preferences, and even time of day to suggest the perfect coffee for you. The more you order, the smarter it gets!'
        },
        {
            question: 'Is there a subscription fee?',
            answer: 'We offer a free tier with basic features. Premium plans (Latte Pro and Neural Link) unlock advanced AI features, priority support, and exclusive menu items.'
        },
        {
            question: 'Can I customize my drinks?',
            answer: 'Absolutely! Every drink can be customized. Premium members get unlimited customization options and can save their favorite recipes.'
        },
        {
            question: 'How long do orders take?',
            answer: 'Orders are prepared as soon as you place them. Average wait time is 0-2 minutes with our AI-optimized brewing system.'
        },
        {
            question: 'Is my data secure?',
            answer: 'Yes! We use enterprise-grade encryption and never share your personal data. Your coffee preferences are yours alone.'
        },
        {
            question: 'Do you offer delivery?',
            answer: 'Currently we focus on pickup to ensure freshness, but drone delivery is coming soon to select locations!'
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SectionWrapper>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <NeonText size="large" color="cyan">
                        Frequently Asked
                    </NeonText>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '16px',
                        marginBottom: '32px'
                    }}>
                        Everything you need to know
                    </p>

                    {/* Search */}
                    <div style={{
                        position: 'relative',
                        maxWidth: '400px',
                        margin: '0 auto'
                    }}>
                        <Search
                            size={20}
                            color="rgba(255, 255, 255, 0.4)"
                            style={{
                                position: 'absolute',
                                left: '20px',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 20px 14px 52px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '100px',
                                color: 'white',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredFaqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                }}
                            >
                                {/* Question */}
                                <div style={{
                                    padding: '24px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '16px'
                                }}>
                                    <span style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: 'white'
                                    }}>
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown
                                            size={20}
                                            color={openIndex === index ? '#00F5FF' : 'rgba(255, 255, 255, 0.5)'}
                                        />
                                    </motion.div>
                                </div>

                                {/* Answer */}
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div style={{
                                                padding: '0 24px 24px',
                                                fontSize: '14px',
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                lineHeight: 1.7
                                            }}>
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default FAQ;
