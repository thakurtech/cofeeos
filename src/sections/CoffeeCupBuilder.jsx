import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RotateCw, Download, Palette } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';

const CoffeeCupBuilder = () => {
    const cupRef = useRef(null);
    const [cupColor, setCupColor] = useState('#d4a574');
    const [foam, setFoam] = useState(true);
    const [sprinkles, setSprinkles] = useState(false);
    const [caramel, setCaramel] = useState(false);

    // 3D rotation with mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (event) => {
        if (!cupRef.current) return;

        const rect = cupRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set(event.clientX - centerX);
        mouseY.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <SectionWrapper>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <NeonText size="large">
                    Build Your Cup
                </NeonText>
                <p style={{
                    fontSize: '18px',
                    color: 'var(--color-text-secondary)',
                    marginTop: '16px'
                }}>
                    Customize, rotate, and play with your virtual coffee
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '64px',
                maxWidth: '1200px',
                margin: '0 auto',
                alignItems: 'center'
            }}>
                {/* 3D Cup Preview */}
                <div
                    ref={cupRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        perspective: '1000px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '500px'
                    }}
                >
                    <motion.div
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: 'preserve-3d',
                            width: '300px',
                            height: '350px',
                            position: 'relative'
                        }}
                    >
                        {/* Cup Body */}
                        <motion.div
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                width: '200px',
                                height: '250px',
                                background: `linear-gradient(135deg, ${cupColor}, ${cupColor}dd)`,
                                borderRadius: '0 0 60px 60px / 0 0 30px 30px',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 -20px 40px rgba(0, 0, 0, 0.2)',
                                position: 'absolute',
                                left: '50px',
                                top: '50px',
                                border: '3px solid rgba(255, 255, 255, 0.2)'
                            }}
                        />

                        {/* Coffee Liquid */}
                        <div style={{
                            width: '190px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #3d2817, #6f4e37)',
                            borderRadius: '50%',
                            position: 'absolute',
                            left: '55px',
                            top: '60px',
                            boxShadow: 'inset 0 5px 15px rgba(0, 0, 0, 0.5)'
                        }} />

                        {/* Foam */}
                        {foam && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                style={{
                                    width: '180px',
                                    height: '40px',
                                    background: 'linear-gradient(135deg, #fff, #f5f1e8)',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    left: '60px',
                                    top: '50px',
                                    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.5), inset 0 -3px 10px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                        )}

                        {/* Sprinkles */}
                        {sprinkles && (
                            <>
                                {[...Array(15)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, rotate: 0 }}
                                        animate={{ scale: 1, rotate: 360 }}
                                        transition={{ delay: i * 0.05 }}
                                        style={{
                                            width: '4px',
                                            height: '12px',
                                            background: ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff'][i % 4],
                                            borderRadius: '2px',
                                            position: 'absolute',
                                            left: `${60 + Math.random() * 160}px`,
                                            top: `${50 + Math.random() * 30}px`,
                                            transform: `rotate(${Math.random() * 360}deg)`
                                        }}
                                    />
                                ))}
                            </>
                        )}

                        {/* Caramel Drizzle */}
                        {caramel && (
                            <svg
                                style={{
                                    position: 'absolute',
                                    left: '70px',
                                    top: '45px',
                                    width: '160px',
                                    height: '60px',
                                    pointerEvents: 'none'
                                }}
                            >
                                <motion.path
                                    d="M 10 10 Q 40 30 80 25 T 150 30"
                                    stroke="#c87137"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1 }}
                                />
                                <motion.path
                                    d="M 20 20 Q 60 35 100 30 T 140 25"
                                    stroke="#c87137"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                />
                            </svg>
                        )}

                        {/* Handle */}
                        <div style={{
                            width: '80px',
                            height: '120px',
                            border: `4px solid ${cupColor}`,
                            borderLeft: 'none',
                            borderRadius: '0 60px 60px 0',
                            position: 'absolute',
                            left: '230px',
                            top: '100px',
                            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)'
                        }} />
                    </motion.div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* Cup Color */}
                    <div>
                        <h3 style={{
                            fontSize: '20px',
                            color: 'var(--color-text)',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <Palette size={24} color="var(--color-accent)" />
                            Cup Color
                        </h3>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {['#d4a574', '#e87c3e', '#6f4e37', '#fff', '#ff6b6b', '#4d96ff'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => setCupColor(color)}
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        background: color,
                                        border: cupColor === color ? '3px solid var(--color-accent)' : '2px solid rgba(255, 255, 255, 0.2)',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        transform: cupColor === color ? 'scale(1.1)' : 'scale(1)'
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.15)'}
                                    onMouseLeave={(e) => e.target.style.transform = cupColor === color ? 'scale(1.1)' : 'scale(1)'}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Toppings */}
                    <div>
                        <h3 style={{
                            fontSize: '20px',
                            color: 'var(--color-text)',
                            marginBottom: '16px'
                        }}>
                            Toppings
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { label: '☁️ Foam', value: foam, setter: setFoam },
                                { label: '🎉 Sprinkles', value: sprinkles, setter: setSprinkles },
                                { label: '🍯 Caramel', value: caramel, setter: setCaramel }
                            ].map(topping => (
                                <button
                                    key={topping.label}
                                    onClick={() => topping.setter(!topping.value)}
                                    style={{
                                        padding: '16px 24px',
                                        background: topping.value ? 'var(--color-accent)' : 'var(--glass-bg)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        color: topping.value ? 'white' : 'var(--color-text)',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    {topping.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => {
                                setCupColor('#d4a574');
                                setFoam(true);
                                setSprinkles(false);
                                setCaramel(false);
                            }}
                            style={{
                                flex: 1,
                                padding: '16px',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'var(--color-text)',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <RotateCw size={16} />
                            Reset
                        </button>
                        <button
                            style={{
                                flex: 1,
                                padding: '16px',
                                background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            <Download size={16} />
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default CoffeeCupBuilder;
