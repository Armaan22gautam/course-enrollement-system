import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import CourseCard from '../components/CourseCard';
import {
    Container, Typography, Box, Grid, Alert, Snackbar, TextField, InputAdornment
} from '@mui/material';
import { Search } from '@mui/icons-material';

const CourseListPage = () => {
    const { isStudent } = useAuth();
    const [courses, setCourses] = useState([]);
    const [myEnrollments, setMyEnrollments] = useState([]);
    const [search, setSearch] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchCourses();
        if (isStudent()) fetchMyEnrollments();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get('/api/courses');
            setCourses(res.data);
        } catch (err) { /* ignore */ }
    };

    const fetchMyEnrollments = async () => {
        try {
            const res = await api.get('/api/enrollments/my');
            setMyEnrollments(res.data.map(e => e.courseId));
        } catch (err) { /* ignore */ }
    };

    const handleEnroll = async (courseId) => {
        try {
            await api.post(`/api/enroll/${courseId}`);
            setSnackbar({ open: true, message: 'Successfully enrolled!', severity: 'success' });
            fetchCourses();
            fetchMyEnrollments();
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.response?.data?.message || 'Failed to enroll',
                severity: 'error'
            });
        }
    };

    const filtered = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ background: '#f8f9fc', minHeight: '85vh', py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h4" fontWeight={800}>Available Courses</Typography>
                        <Typography variant="body1" color="text.secondary">
                            {courses.length} courses available
                        </Typography>
                    </Box>
                    <TextField placeholder="Search courses..." value={search}
                        onChange={(e) => setSearch(e.target.value)} size="small"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                            sx: { borderRadius: 2, backgroundColor: '#fff' }
                        }}
                        sx={{ minWidth: 280 }} />
                </Box>

                <Grid container spacing={3}>
                    {filtered.map(course => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
                            <CourseCard course={course} onEnroll={handleEnroll}
                                enrolled={myEnrollments.includes(course.id)}
                                isStudent={isStudent()} />
                        </Grid>
                    ))}
                </Grid>

                {filtered.length === 0 && (
                    <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mt: 6 }}>
                        No courses found.
                    </Typography>
                )}

                <Snackbar open={snackbar.open} autoHideDuration={4000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default CourseListPage;
