import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingCoffeeBeans = () => {
    const [beans, setBeans] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Generate initial beans
        const initialBeans = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: 20 + Math.random() * 20,
            rotation: Math.random() * 360,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        }));
        setBeans(initialBeans);

        // Mouse move handler
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Physics update
        const interval = setInterval(() => {
            setBeans(prevBeans =>
                prevBeans.map(bean => {
                    const dx = mousePos.x - bean.x;
                    const dy = mousePos.y - bean.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Repulsion from mouse
                    let newVx = bean.vx;
                    let newVy = bean.vy;

                    if (distance < 150) {
                        const force = (150 - distance) / 150;
                        newVx -= (dx / distance) * force * 2;
                        newVy -= (dy / distance) * force * 2;
                    }

                    // Add some friction
                    newVx *= 0.98;
                    newVy *= 0.98;

                    // Update position
                    let newX = bean.x + newVx;
                    let newY = bean.y + newVy;

                    // Bounce off walls
                    if (newX < 0 || newX > window.innerWidth) {
                        newVx *= -1;
                        newX = Math.max(0, Math.min(window.innerWidth, newX));
                    }
                    if (newY < 0 || newY > window.innerHeight) {
                        newVy *= -1;
                        newY = Math.max(0, Math.min(window.innerHeight, newY));
                    }

                    return {
                        ...bean,
                        x: newX,
                        y: newY,
                        vx: newVx,
                        vy: newVy,
                        rotation: bean.rotation + newVx
                    };
                })
            );
        }, 1000 / 60); // 60 FPS

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, [mousePos]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'hidden'
        }}>
            {beans.map(bean => (
                <motion.div
                    key={bean.id}
                    style={{
                        position: 'absolute',
                        left: bean.x,
                        top: bean.y,
                        width: bean.size,
                        height: bean.size * 1.3,
                        borderRadius: '40% 60% 40% 60%',
                        background: 'linear-gradient(135deg, #6f4e37, #3d2817)',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3), inset 0 2px 5px rgba(255, 255, 255, 0.1)',
                        transform: `rotate(${bean.rotation}deg)`,
                        opacity: 0.6
                    }}
                    animate={{
                        x: bean.x,
                        y: bean.y,
                        rotate: bean.rotation
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                >
                    {/* Bean crease */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '60%',
                        height: '2px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%) rotate(-20deg)'
                    }} />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingCoffeeBeans;
