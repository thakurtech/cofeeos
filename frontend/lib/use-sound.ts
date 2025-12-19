'use client';

import { useEffect, useRef, useCallback } from 'react';

// Sound URLs - using data URIs for built-in sounds
const SOUNDS = {
    newOrder: '/sounds/new-order.mp3',
    orderReady: '/sounds/order-ready.mp3',
    alert: '/sounds/alert.mp3',
};

// Fallback to Web Audio API beep
function createBeep(frequency = 800, duration = 200): void {
    try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        console.warn('Web Audio API not available');
    }
}

export function useSound() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const play = useCallback((type: keyof typeof SOUNDS = 'newOrder') => {
        // Check if sound is enabled (stored in localStorage)
        const soundEnabled = localStorage.getItem('cafeos_sound_enabled') !== 'false';
        if (!soundEnabled) return;

        // Try to play audio file first
        try {
            if (!audioRef.current) {
                audioRef.current = new Audio();
            }
            audioRef.current.src = SOUNDS[type];
            audioRef.current.volume = parseFloat(localStorage.getItem('cafeos_sound_volume') || '0.7');
            audioRef.current.play().catch(() => {
                // Fallback to beep
                createBeep(type === 'newOrder' ? 800 : type === 'orderReady' ? 1000 : 600);
            });
        } catch {
            createBeep();
        }
    }, []);

    const playNewOrder = useCallback(() => play('newOrder'), [play]);
    const playOrderReady = useCallback(() => play('orderReady'), [play]);
    const playAlert = useCallback(() => play('alert'), [play]);

    return { play, playNewOrder, playOrderReady, playAlert };
}

// Hook to manage sound settings
export function useSoundSettings() {
    const getSoundEnabled = (): boolean => {
        if (typeof window === 'undefined') return true;
        return localStorage.getItem('cafeos_sound_enabled') !== 'false';
    };

    const setSoundEnabled = (enabled: boolean): void => {
        localStorage.setItem('cafeos_sound_enabled', enabled.toString());
    };

    const getVolume = (): number => {
        if (typeof window === 'undefined') return 0.7;
        return parseFloat(localStorage.getItem('cafeos_sound_volume') || '0.7');
    };

    const setVolume = (volume: number): void => {
        localStorage.setItem('cafeos_sound_volume', Math.min(1, Math.max(0, volume)).toString());
    };

    return { getSoundEnabled, setSoundEnabled, getVolume, setVolume };
}

// Hook for kitchen sound notifications on new orders
export function useKitchenSounds(shopId: string | undefined) {
    const { playNewOrder } = useSound();

    useEffect(() => {
        if (!shopId) return;

        // Listen for WebSocket events
        const handleNewOrder = () => {
            playNewOrder();
        };

        window.addEventListener('kitchen:newOrder', handleNewOrder);

        return () => {
            window.removeEventListener('kitchen:newOrder', handleNewOrder);
        };
    }, [shopId, playNewOrder]);
}
