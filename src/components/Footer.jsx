import React from 'react';
import { Coffee, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#141414', color: 'white', padding: '80px 0 40px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: 'var(--color-primary)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <Coffee size={18} />
                            </div>
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>CoffeeShopOS</span>
                        </div>
                        <p style={{ color: '#888', marginBottom: '20px' }}>
                            The all-in-one automation engine for modern coffee shops.
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Instagram size={20} color="#888" />
                            <Twitter size={20} color="#888" />
                            <Facebook size={20} color="#888" />
                        </div>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Product</h4>
                        <ul style={{ listStyle: 'none', color: '#888', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Demo</a></li>
                            <li><a href="#">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Company</h4>
                        <ul style={{ listStyle: 'none', color: '#888', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', color: '#888', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #333', paddingTop: '40px', textAlign: 'center', color: '#666' }}>
                    <p>&copy; 2025 CoffeeShopOS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
