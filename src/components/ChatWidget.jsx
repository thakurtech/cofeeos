import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your Coffee AI. Ask me for recommendations or about our menu!", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5000/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text })
            });
            const data = await response.json();

            setMessages(prev => [...prev, { id: Date.now() + 1, text: data.reply, sender: 'bot' }]);
        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to my brain right now! 🧠💥", sender: 'bot' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        style={{ marginBottom: '20px' }}
                    >
                        <GlassCard className="glass-panel" style={{ width: '350px', height: '500px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)' }}>
                            {/* Header */}
                            <div style={{ padding: '16px', background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Sparkles size={20} color="#fff" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '16px', color: '#fff', fontWeight: '700' }}>Coffee Assistant</h3>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>● Ask me anything</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {messages.map(msg => (
                                    <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                                        <div style={{
                                            padding: '10px 14px',
                                            borderRadius: '12px',
                                            background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))' : 'var(--color-surface)',
                                            color: 'var(--color-text)',
                                            fontSize: '14px',
                                            borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                                            borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                                            boxShadow: msg.sender === 'user' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
                                        }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div style={{ alignSelf: 'flex-start', background: 'var(--color-surface)', padding: '8px 12px', borderRadius: '12px', display: 'flex', gap: '4px' }}>
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)' }} />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)' }} />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)' }} />
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick Reply Buttons */}
                            {!isTyping && messages.length === 1 && (
                                <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Quick questions:</div>
                                    {[
                                        '🎯 Recommend something',
                                        '☕ What\'s popular?',
                                        '🌱 Vegan options?',
                                        '💰 Price range?'
                                    ].map((question, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                const userMsg = { id: Date.now(), text: question, sender: 'user' };
                                                setMessages(prev => [...prev, userMsg]);
                                                setIsTyping(true);
                                                setTimeout(() => {
                                                    const botResponse = generateResponse(question);
                                                    setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
                                                    setIsTyping(false);
                                                }, 1500);
                                            }}
                                            style={{
                                                padding: '10px 14px',
                                                background: 'var(--color-surface)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '10px',
                                                color: 'var(--color-text)',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                transition: 'all 0.2s',
                                                fontWeight: '500'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.background = 'var(--color-accent)';
                                                e.target.style.borderColor = 'var(--color-accent)';
                                                e.target.style.transform = 'translateX(4px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.background = 'var(--color-surface)';
                                                e.target.style.borderColor = 'var(--glass-border)';
                                                e.target.style.transform = 'translateX(0)';
                                            }}
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input */}
                            <form onSubmit={handleSend} style={{ padding: '12px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    placeholder="Or type your question..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    style={{ flex: 1, background: 'var(--color-surface)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '8px 12px', color: 'var(--color-text)', outline: 'none', fontSize: '14px' }}
                                />
                                <button type="submit" disabled={!input.trim()} style={{ width: '32px', height: '32px', borderRadius: '50%', background: input.trim() ? 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))' : 'var(--color-surface)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: input.trim() ? 'pointer' : 'not-allowed', opacity: input.trim() ? 1 : 0.5 }}>
                                    <Send size={16} />
                                </button>
                            </form>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))',
                    border: 'none',
                    boxShadow: ' 0 4px 20px var(--glass-shadow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer'
                }}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
