import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';
import GlassPanel from '../components/GlassPanel';

const MenuShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        {
            name: 'Quantum Latte',
            price: 250,
            image: '🥛',
            ingredients: ['Espresso', 'Steamed Milk', 'Vanilla'],
            rating: 4.9,
            description: 'Our signature AI-optimized latte'
        },
        {
            name: 'Neural Espresso',
            price: 180,
            image: '⚡',
            ingredients: ['Double Shot', 'Premium Beans'],
            rating: 5.0,
            description: 'Pure energy in a cup'
        },
        {
            name: 'Cosmic Cappuccino',
            price: 220,
            image: '☕',
            ingredients: ['Espresso', 'Frothed Milk', 'Cocoa'],
            rating: 4.8,
            description: 'Perfect balance of foam and flavor'
        },
        {
            name: 'AI Mocha',
            price: 280,
            image: '🍫',
            ingredients: ['Espresso', 'Chocolate', 'Cream'],
            rating: 4.9,
            description: 'Chocolate bliss reimagined'
        }
    ];

    const nextItem = () => setActiveIndex((prev) => (prev + 1) % menuItems.length);
    const prevItem = () => setActiveIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);

    return (
        <SectionWrapper>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <NeonText size="large" color="gold">
                    Premium Menu
                </NeonText>
                <p style={{
                    fontSize: '18px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginTop: '16px',
                    marginBottom: '64px'
                }}>
                    Curated by AI, crafted by masters
                </p>

                <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px',
                    minHeight: '500px'
                }}>
                    {/* Previous Button */}
                    <button
                        onClick={prevItem}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <ChevronLeft color="white" />
                    </button>

                    {/* Carousel */}
                    <div style={{
                        flex: 1,
                        maxWidth: '600px',
                        perspective: '1000px'
                    }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, rotateY: 90 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: -90 }}
                                transition={{ duration: 0.5 }}
                            >
                                <GlassPanel hover3D>
                                    <div style={{
                                        padding: '32px',
                                        textAlign: 'center'
                                    }}>
                                        {/* Item Image */}
                                        <div style={{
                                            fontSize: '120px',
                                            marginBottom: '24px',
                                            filter: 'drop-shadow(0 0 30px rgba(255, 184, 0, 0.5))'
                                        }}>
                                            {menuItems[activeIndex].image}
                                        </div>

                                        {/* Rating */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            marginBottom: '16px'
                                        }}>
                                            <Star size={20} fill="#FFB800" color="#FFB800" />
                                            <span style={{ fontSize: '18px', color: '#FFB800', fontWeight: '600' }}>
                                                {menuItems[activeIndex].rating}
                                            </span>
                                        </div>

                                        {/* Name */}
                                        <h3 style={{
                                            fontSize: '32px',
                                            fontWeight: '700',
                                            color: 'white',
                                            marginBottom: '12px'
                                        }}>
                                            {menuItems[activeIndex].name}
                                        </h3>

                                        {/* Description */}
                                        <p style={{
                                            fontSize: '16px',
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            marginBottom: '24px'
                                        }}>
                                            {menuItems[activeIndex].description}
                                        </p>

                                        {/* Ingredients */}
                                        <div style={{
                                            display: 'flex',
                                            gap: '8px',
                                            justifyContent: 'center',
                                            flexWrap: 'wrap',
                                            marginBottom: '24px'
                                        }}>
                                            {menuItems[activeIndex].ingredients.map((ing, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        padding: '6px 16px',
                                                        background: 'rgba(255, 184, 0, 0.1)',
                                                        border: '1px solid rgba(255, 184, 0, 0.3)',
                                                        borderRadius: '100px',
                                                        fontSize: '12px',
                                                        color: '#FFB800'
                                                    }}
                                                >
                                                    {ing}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Price */}
                                        <div style={{
                                            fontSize: '28px',
                                            fontWeight: '800',
                                            color: '#FFB800',
                                            textShadow: '0 0 20px rgba(255, 184, 0, 0.5)'
                                        }}>
                                            ₹{menuItems[activeIndex].price}
                                        </div>
                                    </div>
                                </GlassPanel>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextItem}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <ChevronRight color="white" />
                    </button>
                </div>

                {/* Dots */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    marginTop: '32px'
                }}>
                    {menuItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            style={{
                                width: index === activeIndex ? '32px' : '8px',
                                height: '8px',
                                borderRadius: '100px',
                                background: index === activeIndex ? '#FFB800' : 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                boxShadow: index === activeIndex ? '0 0 10px #FFB800' : 'none'
                            }}
                        />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default MenuShowcase;
