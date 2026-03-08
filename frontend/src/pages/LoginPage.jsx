import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Container, Paper, TextField, Button, Typography, Box, Alert, Link
} from '@mui/material';
import { Login } from '@mui/icons-material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '85vh', display: 'flex', alignItems: 'center',
            background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)'
        }}>
            <Container maxWidth="sm">
                <Paper elevation={0} sx={{
                    p: 5, borderRadius: 4, textAlign: 'center',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <Box sx={{
                        width: 56, height: 56, borderRadius: '50%', mx: 'auto', mb: 2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'linear-gradient(135deg, #1a237e, #3949ab)'
                    }}>
                        <Login sx={{ color: '#fff', fontSize: 28 }} />
                    </Box>
                    <Typography variant="h4" fontWeight={800} gutterBottom>Welcome Back</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Sign in to continue to CourseHub
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField fullWidth label="Email" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }}
                            InputProps={{ sx: { borderRadius: 2 } }} />
                        <TextField fullWidth label="Password" type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required sx={{ mb: 3 }}
                            InputProps={{ sx: { borderRadius: 2 } }} />
                        <Button fullWidth type="submit" variant="contained" size="large" disabled={loading}
                            sx={{
                                py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 700, fontSize: 16,
                                background: 'linear-gradient(135deg, #1a237e, #3949ab)',
                                '&:hover': { background: 'linear-gradient(135deg, #0d1b5e, #283593)' }
                            }}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 3 }}>
                        Don't have an account?{' '}
                        <Link component={RouterLink} to="/register" fontWeight={600}>Sign Up</Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
