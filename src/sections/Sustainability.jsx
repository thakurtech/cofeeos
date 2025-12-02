import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Sun, Droplets } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';

const Sustainability = () => {
    const features = [
        {
            icon: Sun,
            title: 'Solar Roasting',
            description: '100% renewable energy powers our operations',
            value: '0kg',
            label: 'Carbon Emissions'
        },
        {
            icon: Recycle,
            title: 'Zero Waste',
            description: 'Biodegradable packaging and composting',
            value: '10k+',
            label: 'Trees Planted'
        },
        {
            icon: Droplets,
            title: 'Water Efficient',
            description: 'Advanced filtration and recycling systems',
            value: '50%',
            label: 'Water Saved'
        },
        {
            icon: Leaf,
            title: 'Ethical Sourcing',
            description: 'Direct trade with sustainable farms',
            value: '100%',
            label: 'Fair Trade'
        }
    ];

    return (
        <SectionWrapper>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <NeonText size="large" color="green">
                        Sustainable Coffee
                    </NeonText>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '16px'
                    }}>
                        Great coffee shouldn't cost the Earth
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '32px'
                }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            style={{
                                padding: '32px',
                                background: 'rgba(57, 255, 20, 0.05)',
                                border: '1px solid rgba(57, 255, 20, 0.2)',
                                borderRadius: '20px',
                                textAlign: 'center'
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: '64px',
                                height: '64px',
                                margin: '0 auto 20px',
                                borderRadius: '16px',
                                background: 'rgba(57, 255, 20, 0.1)',
                                border: '1px solid rgba(57, 255, 20, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <feature.icon size={32} color="#39FF14" />
                            </div>

                            {/* Title */}
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                color: '#39FF14',
                                marginBottom: '12px',
                                textShadow: '0 0 20px rgba(57, 255, 20, 0.4)'
                            }}>
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                fontSize: '14px',
                                color: 'rgba(255, 255, 255, 0.6)',
                                marginBottom: '20px',
                                lineHeight: 1.6
                            }}>
                                {feature.description}
                            </p>

                            {/* Stat */}
                            <div style={{
                                padding: '16px',
                                background: 'rgba(57, 255, 20, 0.08)',
                                borderRadius: '12px'
                            }}>
                                <div style={{
                                    fontSize: '32px',
                                    fontWeight: '800',
                                    color: '#39FF14',
                                    marginBottom: '4px'
                                }}>
                                    {feature.value}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {feature.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Sustainability;
