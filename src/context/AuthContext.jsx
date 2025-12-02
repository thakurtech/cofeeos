import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for existing session
        const savedUser = localStorage.getItem('coffee_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Simple mock login logic
        if (email === 'admin@coffee.com' && password === 'admin') {
            const adminUser = { id: 'admin', name: 'Admin User', email, role: 'admin' };
            setUser(adminUser);
            localStorage.setItem('coffee_user', JSON.stringify(adminUser));
            return { success: true, role: 'admin' };
        } else if (email && password) {
            const customerUser = { id: Date.now().toString(), name: email.split('@')[0], email, role: 'customer' };
            setUser(customerUser);
            localStorage.setItem('coffee_user', JSON.stringify(customerUser));
            return { success: true, role: 'customer' };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const signup = (name, email, password) => {
        const newUser = { id: Date.now().toString(), name, email, role: 'customer' };
        setUser(newUser);
        localStorage.setItem('coffee_user', JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('coffee_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
