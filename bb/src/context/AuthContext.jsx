import React, { createContext, useContext, useEffect, useState } from 'react';
import API_BASE_URL from '../config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const idToken = await user.getIdToken();
                setToken(idToken);
                setCurrentUser(user);
                setLoading(false); // Set loading false immediately

                // Sync user with backend (NON-BLOCKING - runs in background)
                axios.post(`${API_BASE_URL}/api/auth/sync`, {
                    email: user.email,
                    name: user.displayName,
                    avatar: user.photoURL
                }, {
                    headers: { Authorization: `Bearer ${idToken}` }
                }).catch((error) => {
                    console.error("Failed to sync user (non-critical):", error);
                });

            } else {
                setCurrentUser(null);
                setToken(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const logout = () => {
        return auth.signOut();
    };

    const value = {
        currentUser,
        token,
        loading,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
