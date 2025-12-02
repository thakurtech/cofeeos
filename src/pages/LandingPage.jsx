import React from 'react';
import Hero from '../sections/Hero';
import BrewingProgress from '../sections/BrewingProgress';
import LiveStats from '../sections/LiveStats';
import Problem from '../sections/Problem';
import Solution from '../sections/Solution';
import MenuShowcase from '../sections/MenuShowcase';
import CoffeeCupBuilder from '../sections/CoffeeCupBuilder';
import AIDemo from '../sections/AIDemo';
import HowItWorks from '../sections/HowItWorks';
import Testimonials from '../sections/Testimonials';
import Pricing from '../sections/Pricing';
import Sustainability from '../sections/Sustainability';
import FAQ from '../sections/FAQ';
import FinalCTA from '../sections/FinalCTA';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import FloatingCoffeeBeans from '../components/FloatingCoffeeBeans';

const LandingPage = () => {
    return (
        <div style={{
            background: 'var(--color-bg)',
            minHeight: '100vh',
            position: 'relative'
        }}>
            <FloatingCoffeeBeans />
            <ThemeToggle />
            <BrewingProgress />
            <Header />
            <main style={{ position: 'relative', zIndex: 2 }}>
                <Hero />
                <LiveStats />
                <Problem />
                <Solution />
                <MenuShowcase />
                <CoffeeCupBuilder />
                <AIDemo />
                <HowItWorks />
                <Testimonials />
                <Pricing />
                <Sustainability />
                <FAQ />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
