'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Delete, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PINLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (userId: string) => void;
    staffList: Array<{ id: string; name: string; pin: string; role: string }>;
}

export function PINLoginModal({ isOpen, onClose, onSuccess, staffList }: PINLoginModalProps) {
    const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);

    const handlePinInput = (digit: string) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);
            setError('');

            // Auto-submit when 4 digits entered
            if (newPin.length === 4 && selectedStaff) {
                verifyPin(newPin);
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
        setError('');
    };

    const verifyPin = (enteredPin: string) => {
        const staff = staffList.find(s => s.id === selectedStaff);
        if (staff && staff.pin === enteredPin) {
            onSuccess(staff.id);
            resetAndClose();
        } else {
            setError('Incorrect PIN');
            setShake(true);
            setPin('');
            setTimeout(() => setShake(false), 500);
        }
    };

    const resetAndClose = () => {
        setSelectedStaff(null);
        setPin('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
                    exit={{ scale: 0.9 }}
                    className="bg-[#1a1a1a] rounded-2xl w-full max-w-sm overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-[#BF5700] p-4 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5" />
                            <h2 className="font-bold">Quick Login</h2>
                        </div>
                        <button onClick={resetAndClose} className="p-1 hover:bg-white/20 rounded-lg">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        {!selectedStaff ? (
                            // Staff Selection
                            <div className="space-y-3">
                                <p className="text-gray-400 text-sm text-center mb-4">Select your profile</p>
                                {staffList.map(staff => (
                                    <button
                                        key={staff.id}
                                        onClick={() => setSelectedStaff(staff.id)}
                                        className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#BF5700] to-[#8B4513] flex items-center justify-center text-white font-bold text-lg">
                                            {staff.name.charAt(0)}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white font-semibold">{staff.name}</div>
                                            <div className="text-gray-400 text-sm">{staff.role}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            // PIN Entry
                            <div>
                                <button
                                    onClick={() => { setSelectedStaff(null); setPin(''); }}
                                    className="text-sm text-[#BF5700] mb-4"
                                >
                                    ← Change user
                                </button>

                                {/* PIN Dots */}
                                <div className="flex justify-center gap-4 mb-6">
                                    {[0, 1, 2, 3].map(i => (
                                        <div
                                            key={i}
                                            className={`w-4 h-4 rounded-full transition-colors ${i < pin.length ? 'bg-[#BF5700]' : 'bg-white/20'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                                )}

                                {/* Number Pad */}
                                <div className="grid grid-cols-3 gap-3">
                                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map(key => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                if (key === 'del') handleDelete();
                                                else if (key) handlePinInput(key);
                                            }}
                                            disabled={!key}
                                            className={`h-16 rounded-xl text-2xl font-bold transition-colors ${key === 'del'
                                                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                    : key
                                                        ? 'bg-white/10 text-white hover:bg-white/20'
                                                        : 'bg-transparent'
                                                }`}
                                        >
                                            {key === 'del' ? <Delete className="w-6 h-6 mx-auto" /> : key}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// Session timeout hook
export function useSessionTimeout(timeoutMinutes: number = 15, onTimeout: () => void) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastActivityRef = useRef<number>(Date.now());

    const resetTimeout = () => {
        lastActivityRef.current = Date.now();
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(onTimeout, timeoutMinutes * 60 * 1000);
    };

    useEffect(() => {
        const handleActivity = () => resetTimeout();

        // Listen for user activity
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('click', handleActivity);
        window.addEventListener('touchstart', handleActivity);

        // Start initial timeout
        resetTimeout();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('touchstart', handleActivity);
        };
    }, [timeoutMinutes, onTimeout]);

    return { resetTimeout, lastActivity: lastActivityRef.current };
}
