import React, { useState } from 'react';
import { Smartphone, LayoutDashboard } from 'lucide-react';

const Demo = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <section id="demo" className="section" style={{ backgroundColor: 'white' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>See Automation Live</h2>
                    <p style={{ fontSize: '18px', color: 'var(--color-text-light)' }}>
                        Experience how CoffeeShopOS manages your business.
                    </p>
                </div>

                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '16px' }}>
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ gap: '8px' }}
                        >
                            <LayoutDashboard size={18} /> Dashboard View
                        </button>
                        <button
                            onClick={() => setActiveTab('ordering')}
                            className={`btn ${activeTab === 'ordering' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ gap: '8px' }}
                        >
                            <Smartphone size={18} /> Ordering App
                        </button>
                    </div>

                    {/* Demo Content */}
                    <div style={{
                        backgroundColor: '#F9F9F9',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
                        border: '1px solid #eee',
                        minHeight: '500px'
                    }}>
                        {activeTab === 'dashboard' ? (
                            <div style={{ display: 'grid', gap: '24px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                                    <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                        <div style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Today's Revenue</div>
                                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)' }}>₹12,450</div>
                                        <div style={{ fontSize: '12px', color: 'green', marginTop: '4px' }}>+18% vs yesterday</div>
                                    </div>
                                    <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                        <div style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Active Orders</div>
                                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>8</div>
                                        <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>3 pending</div>
                                    </div>
                                    <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                        <div style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Loyalty Signups</div>
                                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>142</div>
                                        <div style={{ fontSize: '12px', color: 'green', marginTop: '4px' }}>+12 this week</div>
                                    </div>
                                </div>

                                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                                    [Chart Visualization Placeholder: Peak Hours Analysis]
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{
                                    width: '320px',
                                    height: '600px',
                                    backgroundColor: 'white',
                                    borderRadius: '30px',
                                    border: '8px solid #141414',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                                }}>
                                    <div style={{ backgroundColor: '#075E54', color: 'white', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white' }}></div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '600' }}>CoffeeShop Bot</div>
                                            <div style={{ fontSize: '10px', opacity: 0.8 }}>Online</div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100% - 64px)', overflowY: 'auto', backgroundColor: '#E5DDD5' }}>
                                        <div style={{ alignSelf: 'flex-start', backgroundColor: 'white', padding: '10px 14px', borderRadius: '0 12px 12px 12px', maxWidth: '80%', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                            Hey! 👋 Welcome to CoffeeShop. What would you like to order today?
                                        </div>
                                        <div style={{ alignSelf: 'flex-end', backgroundColor: '#DCF8C6', padding: '10px 14px', borderRadius: '12px 0 12px 12px', maxWidth: '80%', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                            I'll have a Cappuccino.
                                        </div>
                                        <div style={{ alignSelf: 'flex-start', backgroundColor: 'white', padding: '10px 14px', borderRadius: '0 12px 12px 12px', maxWidth: '80%', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                            Great choice! ☕ Regular or Large?
                                        </div>
                                        <div style={{ alignSelf: 'flex-end', backgroundColor: '#DCF8C6', padding: '10px 14px', borderRadius: '12px 0 12px 12px', maxWidth: '80%', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                            Regular please.
                                        </div>
                                        <div style={{ alignSelf: 'flex-start', backgroundColor: 'white', padding: '10px 14px', borderRadius: '0 12px 12px 12px', maxWidth: '80%', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                            Done! That's ₹180. Pay here to confirm: <span style={{ color: '#34B7F1', textDecoration: 'underline' }}>pay.link/123</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Demo;
