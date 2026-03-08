import { useState, useEffect } from 'react';
import api from '../api/axios';
import EnrollmentList from '../components/EnrollmentList';
import { Container, Typography, Box } from '@mui/material';

const MyCoursesPage = () => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('/api/enrollments/my');
                setEnrollments(res.data);
            } catch (err) { /* ignore */ }
        };
        fetch();
    }, []);

    return (
        <Box sx={{ background: '#f8f9fc', minHeight: '85vh', py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={800}>My Courses</Typography>
                    <Typography variant="body1" color="text.secondary">
                        You are enrolled in {enrollments.length} course{enrollments.length !== 1 ? 's' : ''}
                    </Typography>
                </Box>
                <EnrollmentList enrollments={enrollments} />
            </Container>
        </Box>
    );
};

export default MyCoursesPage;
