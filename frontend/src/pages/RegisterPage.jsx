import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Container, Paper, TextField, Button, Typography, Box, Alert, Link,
    ToggleButtonGroup, ToggleButton
} from '@mui/material';
import { PersonAdd, School, AdminPanelSettings } from '@mui/icons-material';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(name, email, password, role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
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
                        <PersonAdd sx={{ color: '#fff', fontSize: 28 }} />
                    </Box>
                    <Typography variant="h4" fontWeight={800} gutterBottom>Create Account</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Join CourseHub and start learning
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField fullWidth label="Full Name" value={name}
                            onChange={(e) => setName(e.target.value)} required sx={{ mb: 2 }}
                            InputProps={{ sx: { borderRadius: 2 } }} />
                        <TextField fullWidth label="Email" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }}
                            InputProps={{ sx: { borderRadius: 2 } }} />
                        <TextField fullWidth label="Password" type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required sx={{ mb: 2 }}
                            InputProps={{ sx: { borderRadius: 2 } }}
                            helperText="Minimum 6 characters" />
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Register as:</Typography>
                            <ToggleButtonGroup value={role} exclusive onChange={(e, v) => v && setRole(v)}
                                fullWidth size="small">
                                <ToggleButton value="STUDENT" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                                    <School sx={{ mr: 0.5 }} fontSize="small" /> Student
                                </ToggleButton>
                                <ToggleButton value="ADMIN" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                                    <AdminPanelSettings sx={{ mr: 0.5 }} fontSize="small" /> Admin
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <Button fullWidth type="submit" variant="contained" size="large" disabled={loading}
                            sx={{
                                py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 700, fontSize: 16,
                                background: 'linear-gradient(135deg, #1a237e, #3949ab)',
                                '&:hover': { background: 'linear-gradient(135deg, #0d1b5e, #283593)' }
                            }}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 3 }}>
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login" fontWeight={600}>Sign In</Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default RegisterPage;
