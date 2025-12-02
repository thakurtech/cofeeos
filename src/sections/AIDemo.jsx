import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';
import GlassPanel from '../components/GlassPanel';

const AIDemo = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hey! I\'m your AI Barista. What can I brew for you today?' }
    ]);
    const [input, setInput] = useState('');

    const suggestions = [
        'What\'s your strongest coffee?',
        'Recommend me something sweet',
        'I need energy fast!'
    ];

    const aiResponses = {
        'strongest': 'I recommend our Neural Espresso - double shot of pure energy! ⚡',
        'sweet': 'Try our Quantum Latte with vanilla! It\'s perfectly sweet and smooth. 🥛',
        'energy': 'Neural Espresso is your best bet - instant power-up! ⚡',
        'default': 'Great choice! Our Quantum Latte is a customer favorite. Would you like to add it to your order? 🥛'
    };

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput('');

        setTimeout(() => {
            const response = text.toLowerCase().includes('strong') || text.toLowerCase().includes('energy')
                ? aiResponses.energy
                : text.toLowerCase().includes('sweet')
                    ? aiResponses.sweet
                    : aiResponses.default;

            setMessages(prev => [...prev, { role: 'ai', text: response }]);
        }, 800);
    };

    return (
        <SectionWrapper>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <NeonText size="large" color="purple">
                        AI Barista Live
                    </NeonText>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '16px'
                    }}>
                        Try our AI-powered coffee assistant right now
                    </p>
                </div>

                <div style={{
                    maxWidth: '700px',
                    margin: '0 auto'
                }}>
                    <GlassPanel hover3D={false}>
                        {/* Chat Messages */}
                        <div style={{
                            minHeight: '300px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            padding: '24px',
                            marginBottom: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        display: 'flex',
                                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <div style={{
                                        background: msg.role === 'user'
                                            ? 'linear-gradient(135deg, #00F5FF40, #B026FF40)'
                                            : 'rgba(255, 255, 255, 0.05)',
                                        border: msg.role === 'user'
                                            ? '1px solid #00F5FF60'
                                            : '1px solid rgba(255, 255, 255, 0.1)',
                                        padding: '12px 20px',
                                        borderRadius: '16px',
                                        maxWidth: '70%',
                                        color: 'white',
                                        fontSize: '14px',
                                        lineHeight: 1.5
                                    }}>
                                        {msg.role === 'ai' && (
                                            <Sparkles size={14} color="#B026FF" style={{ marginRight: '8px', display: 'inline' }} />
                                        )}
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Suggestions */}
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            flexWrap: 'wrap',
                            marginBottom: '16px',
                            paddingLeft: '24px',
                            paddingRight: '24px'
                        }}>
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSend(suggestion)}
                                    style={{
                                        padding: '8px 16px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '100px',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'rgba(176, 38, 255, 0.2)';
                                        e.target.style.borderColor = '#B026FF';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            padding: '0 24px 24px'
                        }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything about coffee..."
                                style={{
                                    flex: 1,
                                    padding: '12px 20px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '100px',
                                    color: 'white',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            <button
                                onClick={() => handleSend()}
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #00F5FF, #B026FF)',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                <Send size={18} color="white" />
                            </button>
                        </div>
                    </GlassPanel>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default AIDemo;
