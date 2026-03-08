import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
    Container, Typography, Box, Grid, Paper, Button
} from '@mui/material';
import { Book, School, People, TrendingUp } from '@mui/icons-material';

const DashboardPage = () => {
    const { user, isAdmin, isStudent } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ courses: 0, enrollments: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const coursesRes = await api.get('/api/courses');
                const courses = coursesRes.data.length;
                let enrollments = 0;
                if (isAdmin()) {
                    const enrollRes = await api.get('/api/enrollments');
                    enrollments = enrollRes.data.length;
                } else {
                    const enrollRes = await api.get('/api/enrollments/my');
                    enrollments = enrollRes.data.length;
                }
                setStats({ courses, enrollments });
            } catch (err) { /* ignore */ }
        };
        fetchStats();
    }, []);

    const StatCard = ({ icon, label, value, color, onClick }) => (
        <Paper onClick={onClick} sx={{
            p: 3, borderRadius: 3, cursor: onClick ? 'pointer' : 'default',
            transition: 'all 0.3s ease', border: '1px solid rgba(0,0,0,0.05)',
            '&:hover': onClick ? { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' } : {}
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    width: 52, height: 52, borderRadius: 3, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: `linear-gradient(135deg, ${color})`
                }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight={800}>{value}</Typography>
                    <Typography variant="body2" color="text.secondary">{label}</Typography>
                </Box>
            </Box>
        </Paper>
    );

    return (
        <Box sx={{ background: '#f8f9fc', minHeight: '85vh', py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={800}>
                        Welcome back, {user?.name}! 👋
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                        {isAdmin() ? 'Manage your courses and view enrollments' : 'Explore courses and track your progress'}
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard icon={<Book sx={{ color: '#fff', fontSize: 26 }} />} label="Available Courses"
                            value={stats.courses} color="#1a237e, #3949ab"
                            onClick={() => navigate('/courses')} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard icon={<School sx={{ color: '#fff', fontSize: 26 }} />}
                            label={isAdmin() ? "Total Enrollments" : "My Enrollments"}
                            value={stats.enrollments} color="#e65100, #ff9800"
                            onClick={() => navigate(isAdmin() ? '/admin/enrollments' : '/my-courses')} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard icon={<People sx={{ color: '#fff', fontSize: 26 }} />} label="Role"
                            value={user?.role} color="#2e7d32, #66bb6a" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <StatCard icon={<TrendingUp sx={{ color: '#fff', fontSize: 26 }} />} label="Status"
                            value="Active" color="#6a1b9a, #ab47bc" />
                    </Grid>
                </Grid>

                <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>Quick Actions</Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button variant="contained" startIcon={<Book />} onClick={() => navigate('/courses')}
                            sx={{
                                textTransform: 'none', borderRadius: 2, fontWeight: 600,
                                background: 'linear-gradient(135deg, #1a237e, #3949ab)'
                            }}>
                            Browse Courses
                        </Button>
                        {isStudent() && (
                            <Button variant="outlined" startIcon={<School />} onClick={() => navigate('/my-courses')}
                                sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>
                                My Enrollments
                            </Button>
                        )}
                        {isAdmin() && (
                            <>
                                <Button variant="outlined" startIcon={<Book />} onClick={() => navigate('/admin/courses')}
                                    sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>
                                    Manage Courses
                                </Button>
                                <Button variant="outlined" startIcon={<People />} onClick={() => navigate('/admin/enrollments')}
                                    sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>
                                    View Enrollments
                                </Button>
                            </>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default DashboardPage;
