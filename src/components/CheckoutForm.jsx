import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

const CheckoutForm = ({ onSuccess, onCancel, total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL is not needed for redirect-less payment methods or if we handle it manually
                return_url: window.location.origin,
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage("Payment succeeded!");
            onSuccess(paymentIntent);
            setIsLoading(false);
        } else {
            setMessage("Unexpected state.");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <h3 style={{ color: 'white', marginBottom: '20px' }}>Pay ₹{total}</h3>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            {message && <div style={{ color: 'var(--color-error)', marginTop: '10px', fontSize: '14px' }}>{message}</div>}

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid var(--glass-border)',
                        background: 'transparent',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    Cancel
                </button>
                <AnimatedButton
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                    style={{ flex: 1, width: '100%' }}
                >
                    {isLoading ? "Processing..." : "Pay Now"}
                </AnimatedButton>
            </div>
        </form>
    );
};

export default CheckoutForm;
