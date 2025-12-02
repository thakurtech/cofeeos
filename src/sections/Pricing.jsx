import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import NeonText from '../components/NeonText';
import GlassPanel from '../components/GlassPanel';
import AnimatedButton from '../components/AnimatedButton';

const Pricing = () => {
    const plans = [
        {
            name: 'Espresso',
            price: '0',
            description: 'Perfect for casual coffee lovers',
            features: [
                'Browse full menu',
                'Basic AI recommendations',
                'Standard checkout',
                'Order history'
            ],
            color: '#00F5FF',
            popular: false
        },
        {
            name: 'Latte Pro',
            price: '299',
            description: 'For serious coffee enthusiasts',
            features: [
                'All Espresso features',
                'Advanced AI barista',
                'Priority brewing',
                'Exclusive menu items',
                'Monthly free drink',
                'VIP support'
            ],
            color: '#B026FF',
            popular: true
        },
        {
            name: 'Neural Link',
            price: '599',
            description: 'Ultimate coffee experience',
            features: [
                'All Latte Pro features',
                'Personal AI coffee coach',
                'Unlimited customization',
                'Beta feature access',
                'Weekly free drinks',
                '24/7 concierge support'
            ],
            color: '#FFB800',
            popular: false
        }
    ];

    return (
        <SectionWrapper>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <NeonText size="large" color="purple">
                        Choose Your Plan
                    </NeonText>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '16px'
                    }}>
                        Unlock the full power of AI-driven coffee
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '32px'
                }}>
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            style={{ position: 'relative' }}
                        >
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: `linear-gradient(135deg, ${plan.color}, #FFB800)`,
                                    padding: '6px 24px',
                                    borderRadius: '100px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    color: 'white',
                                    boxShadow: `0 4px 20px ${plan.color}60`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    zIndex: 10
                                }}>
                                    <Zap size={14} fill="white" />
                                    MOST POPULAR
                                </div>
                            )}

                            <motion.div
                                whileHover={{
                                    y: -10,
                                    boxShadow: `0 20px 60px ${plan.color}40`
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <GlassPanel hover3D={false}>
                                    <div style={{
                                        padding: '32px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        {/* Plan Name */}
                                        <h3 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: plan.color,
                                            marginBottom: '8px',
                                            textShadow: `0 0 20px ${plan.color}60`
                                        }}>
                                            {plan.name}
                                        </h3>

                                        {/* Description */}
                                        <p style={{
                                            fontSize: '14px',
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            marginBottom: '24px'
                                        }}>
                                            {plan.description}
                                        </p>

                                        {/* Price */}
                                        <div style={{ marginBottom: '32px' }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                gap: '8px'
                                            }}>
                                                <span style={{
                                                    fontSize: '48px',
                                                    fontWeight: '800',
                                                    color: 'white'
                                                }}>
                                                    ₹{plan.price}
                                                </span>
                                                <span style={{
                                                    fontSize: '16px',
                                                    color: 'rgba(255, 255, 255, 0.5)'
                                                }}>
                                                    /month
                                                </span>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div style={{
                                            flex: 1,
                                            marginBottom: '32px'
                                        }}>
                                            {plan.features.map((feature, i) => (
                                                <div
                                                    key={i}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        marginBottom: '16px'
                                                    }}
                                                >
                                                    <div style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        background: `${plan.color}40`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    }}>
                                                        <Check size={12} color={plan.color} />
                                                    </div>
                                                    <span style={{
                                                        fontSize: '14px',
                                                        color: 'rgba(255, 255, 255, 0.8)'
                                                    }}>
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <AnimatedButton
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                fontSize: '16px',
                                                background: plan.popular
                                                    ? `linear-gradient(135deg, ${plan.color}, #FFB800)`
                                                    : 'rgba(255, 255, 255, 0.1)',
                                                border: plan.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'
                                            }}
                                        >
                                            {plan.price === '0' ? 'Start Free' : 'Get Started'}
                                        </AnimatedButton>
                                    </div>
                                </GlassPanel>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Pricing;
