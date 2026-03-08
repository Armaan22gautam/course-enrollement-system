import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/api/auth/login', { email, password });
        const { token: jwt, ...userData } = res.data;
        localStorage.setItem('token', jwt);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);
        return userData;
    };

    const register = async (name, email, password, role = 'STUDENT') => {
        const res = await api.post('/api/auth/register', { name, email, password, role });
        const { token: jwt, ...userData } = res.data;
        localStorage.setItem('token', jwt);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);
        return userData;
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
        } catch (e) {
            // ignore
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const isAdmin = () => user?.role === 'ADMIN';
    const isStudent = () => user?.role === 'STUDENT';
    const isAuthenticated = () => !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading, isAdmin, isStudent, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
