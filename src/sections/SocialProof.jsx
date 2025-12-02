import React from 'react';
import { Star } from 'lucide-react';

const SocialProof = () => {
    return (
        <section className="section" style={{ backgroundColor: 'white' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Trusted by local cafés.</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
                    {[
                        { name: "Rahul S.", role: "Owner, Brew & Bean", quote: "Since using CoffeeShopOS, our repeat customers have increased by 40%. It's a game changer." },
                        { name: "Priya M.", role: "Manager, The Daily Grind", quote: "The WhatsApp automation saves us hours every day. No more missed orders during rush hour." },
                        { name: "Amit K.", role: "Founder, Urban Coffee", quote: "Setup was incredibly easy. We were live in 2 days and saw sales boost immediately." }
                    ].map((testimonial, idx) => (
                        <div key={idx} style={{ padding: '32px', backgroundColor: '#F9F9F9', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', color: '#FFB400' }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFB400" />)}
                            </div>
                            <p style={{ fontSize: '16px', fontStyle: 'italic', marginBottom: '24px', lineHeight: '1.6' }}>"{testimonial.quote}"</p>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{testimonial.name}</div>
                                <div style={{ fontSize: '14px', color: '#888' }}>{testimonial.role}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    gap: '40px',
                    padding: '40px',
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: '24px',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div>
                        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>+38%</div>
                        <div style={{ opacity: 0.9 }}>Repeat Customers</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>26%</div>
                        <div style={{ opacity: 0.9 }}>More Orders</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>40%</div>
                        <div style={{ opacity: 0.9 }}>Faster Operations</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
