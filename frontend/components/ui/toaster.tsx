"use client"

import { Toaster as Sonner } from "sonner"

export function Toaster() {
    return (
        <Sonner
            position="top-right"
            expand={false}
            richColors
            closeButton
            theme="light"
            toastOptions={{
                style: {
                    background: 'white',
                    border: '1px solid #f3f4f6',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    borderRadius: '16px',
                    padding: '16px',
                },
                className: 'font-sans',
            }}
            duration={3000}
        />
    )
}
