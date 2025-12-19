'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TourStep {
    target: string; // CSS selector
    title: string;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingTourProps {
    steps: TourStep[];
    onComplete: () => void;
    storageKey?: string;
}

export function OnboardingTour({ steps, onComplete, storageKey = 'cafeos_tour_completed' }: OnboardingTourProps) {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    // Check if tour was already completed
    useEffect(() => {
        const completed = localStorage.getItem(storageKey);
        if (!completed) {
            // Delay start to let page render
            const timer = setTimeout(() => setIsActive(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [storageKey]);

    // Update target position
    useEffect(() => {
        if (!isActive || !steps[currentStep]) return;

        const updatePosition = () => {
            const target = document.querySelector(steps[currentStep].target);
            if (target) {
                setTargetRect(target.getBoundingClientRect());
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [isActive, currentStep, steps]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        localStorage.setItem(storageKey, 'true');
        setIsActive(false);
        onComplete();
    };

    const handleSkip = () => {
        handleComplete();
    };

    if (!isActive || !steps[currentStep]) return null;

    const step = steps[currentStep];
    const position = step.position || 'bottom';

    // Calculate tooltip position
    const getTooltipStyle = (): React.CSSProperties => {
        if (!targetRect) return {};

        const padding = 16;
        const tooltipWidth = 320;
        const tooltipHeight = 200;

        switch (position) {
            case 'top':
                return {
                    left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
                    top: targetRect.top - tooltipHeight - padding,
                };
            case 'bottom':
                return {
                    left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
                    top: targetRect.bottom + padding,
                };
            case 'left':
                return {
                    left: targetRect.left - tooltipWidth - padding,
                    top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
                };
            case 'right':
                return {
                    left: targetRect.right + padding,
                    top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
                };
            default:
                return {};
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] pointer-events-none">
                {/* Overlay with cutout */}
                <svg className="absolute inset-0 w-full h-full">
                    <defs>
                        <mask id="spotlight-mask">
                            <rect width="100%" height="100%" fill="white" />
                            {targetRect && (
                                <rect
                                    x={targetRect.left - 8}
                                    y={targetRect.top - 8}
                                    width={targetRect.width + 16}
                                    height={targetRect.height + 16}
                                    rx="8"
                                    fill="black"
                                />
                            )}
                        </mask>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill="rgba(0,0,0,0.7)"
                        mask="url(#spotlight-mask)"
                        className="pointer-events-auto"
                        onClick={handleSkip}
                    />
                </svg>

                {/* Highlight border */}
                {targetRect && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute border-2 border-[#BF5700] rounded-lg pointer-events-none"
                        style={{
                            left: targetRect.left - 8,
                            top: targetRect.top - 8,
                            width: targetRect.width + 16,
                            height: targetRect.height + 16,
                            boxShadow: '0 0 20px rgba(191, 87, 0, 0.5)',
                        }}
                    />
                )}

                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bg-white rounded-2xl shadow-2xl p-6 w-80 pointer-events-auto"
                    style={getTooltipStyle()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#BF5700]" />
                            <span className="text-sm font-bold text-[#BF5700]">
                                Step {currentStep + 1} of {steps.length}
                            </span>
                        </div>
                        <button
                            onClick={handleSkip}
                            className="p-1 hover:bg-gray-100 rounded-lg"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#2B1A12] mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-6">{step.content}</p>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className="text-gray-500"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="bg-[#BF5700] hover:bg-[#8B4513]"
                        >
                            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
                        </Button>
                    </div>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-[#BF5700]' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

// Predefined tour steps for different pages
export const dashboardTourSteps: TourStep[] = [
    {
        target: '[data-tour="sidebar"]',
        title: 'Navigation',
        content: 'Access all features from the sidebar. POS, Kitchen, Reports, and Settings are just a click away.',
        position: 'right',
    },
    {
        target: '[data-tour="quick-stats"]',
        title: 'Quick Stats',
        content: 'See your daily performance at a glance. Revenue, orders, and top items updated in real-time.',
        position: 'bottom',
    },
    {
        target: '[data-tour="pos-button"]',
        title: 'Point of Sale',
        content: 'Start taking orders! Click here to access the POS terminal.',
        position: 'bottom',
    },
];

export const posTourSteps: TourStep[] = [
    {
        target: '[data-tour="menu-grid"]',
        title: 'Menu Items',
        content: 'Tap any item to add it to the cart. Long-press for modifiers.',
        position: 'right',
    },
    {
        target: '[data-tour="cart"]',
        title: 'Order Cart',
        content: 'View current order, adjust quantities, apply discounts, and checkout.',
        position: 'left',
    },
    {
        target: '[data-tour="checkout"]',
        title: 'Checkout',
        content: 'Complete the order with UPI, Cash, or Split Payment. Print receipts instantly.',
        position: 'top',
    },
];
