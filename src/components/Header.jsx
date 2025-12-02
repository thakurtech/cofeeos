import React, { useState } from 'react';
import { Menu, X, Coffee } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            borderBottom: '1px solid #eee'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Coffee size={24} />
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-text)' }}>CoffeeShopOS</span>
                </div>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'none' }}>
                    <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', alignItems: 'center' }}>
                        <li><a href="#features" style={{ fontWeight: 500 }}>Features</a></li>
                        <li><a href="#demo" style={{ fontWeight: 500 }}>Demo</a></li>
                        <li><a href="#pricing" style={{ fontWeight: 500 }}>Pricing</a></li>
                        <li><a href="/login" style={{ fontWeight: 500 }}>Login</a></li>
                        <li>
                            <a href="/signup" className="btn btn-primary" style={{ padding: '8px 20px', background: 'var(--color-primary)', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>Get Started</a>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer' }}
                    className="mobile-toggle"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: '20px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
                    <a href="#demo" onClick={() => setIsOpen(false)}>Demo</a>
                    <a href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
                    <a href="#demo" className="btn btn-primary" onClick={() => setIsOpen(false)}>Book Demo</a>
                </div>
            )}

            <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
        </header>
    );
};

export default Header;
