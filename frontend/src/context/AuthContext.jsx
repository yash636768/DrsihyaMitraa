import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) return JSON.parse(savedUser);
        
        // Auto-login for demonstration purposes
        const demoUser = { email: 'demo@drishyamitra.com', id: '123' };
        localStorage.setItem('user', JSON.stringify(demoUser));
        return demoUser;
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Retrieve fake session from localStorage on load
        const session = localStorage.getItem('drishyamitra_session');
        if (session) {
            setUser(JSON.parse(session));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Fake authentication delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For testing, any reasonable credential works
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const fakeUser = {
            id: 'fake-uuid-' + Date.now(),
            email: email,
            created_at: new Date().toISOString()
        };

        setUser(fakeUser);
        localStorage.setItem('drishyamitra_session', JSON.stringify(fakeUser));
        return { user: fakeUser, error: null };
    };

    const signup = async (email, password) => {
        // Fake signup logic
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!email || !password || password.length < 6) {
            throw new Error('Valid email and 6+ char password required');
        }

        const fakeUser = {
            id: 'fake-uuid-' + Date.now(),
            email: email,
            created_at: new Date().toISOString()
        };

        setUser(fakeUser);
        localStorage.setItem('drishyamitra_session', JSON.stringify(fakeUser));
        return { user: fakeUser, error: null };
    };

    const signOut = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(null);
        localStorage.removeItem('drishyamitra_session');
    };

    const value = {
        user,
        loading,
        login,
        signup,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
