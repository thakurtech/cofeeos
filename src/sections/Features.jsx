import React from 'react';
import { MessageSquare, Gift, Users, BarChart3, Share2, Clock } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, items }) => (
    <div style={{
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid #eee',
        transition: 'transform 0.3s ease',
        cursor: 'default'
    }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
        <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(198, 156, 109, 0.15)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            color: 'var(--color-primary)'
        }}>
            <Icon size={28} />
        </div>
        <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>{title}</h3>
        <ul style={{ listStyle: 'none', color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {items.map((item, idx) => (
                <li key={idx} style={{ fontSize: '15px' }}>• {item}</li>
            ))}
        </ul>
    </div>
);

const Features = () => {
    const features = [
        {
            icon: MessageSquare,
            title: "Smart WhatsApp Ordering",
            items: ["Auto-replies", "Menu carousel", "Order confirmation", "Payment link"]
        },
        {
            icon: Gift,
            title: "Loyalty Program Automation",
            items: ["Auto rewards", "Free drink coupons", "Points tracking", "Birthday offers"]
        },
        {
            icon: Users,
            title: "Customer Retention AI",
            items: ["Sends offers to lost customers", "Upsell messages", "Personalized deals"]
        },
        {
            icon: BarChart3,
            title: "Daily Revenue Dashboard",
            items: ["Orders & Sales", "Peak hours", "Best sellers", "Returning customer rate"]
        },
        {
            icon: Share2,
            title: "Social Media Auto-posting",
            items: ["Daily special", "New menu announcements", "Festive offers"]
        },
        {
            icon: Clock,
            title: "Staff Shift Automation",
            items: ["Auto reminders", "Check-in/out tracking", "Workload distribution"]
        }
    ];

    return (
        <section id="features" className="section" style={{ backgroundColor: '#F9F9F9' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Everything you need to run on autopilot.</h2>
                    <p style={{ fontSize: '18px', color: 'var(--color-text-light)' }}>Powerful features designed for modern coffee shops.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
