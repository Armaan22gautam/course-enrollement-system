import { useState, useEffect } from 'react';
import api from '../api/axios';
import EnrollmentList from '../components/EnrollmentList';
import { Container, Typography, Box } from '@mui/material';

const AdminEnrollmentsPage = () => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('/api/enrollments');
                setEnrollments(res.data);
            } catch (err) { /* ignore */ }
        };
        fetch();
    }, []);

    return (
        <Box sx={{ background: '#f8f9fc', minHeight: '85vh', py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={800}>All Enrollments</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {enrollments.length} total enrollment{enrollments.length !== 1 ? 's' : ''}
                    </Typography>
                </Box>
                <EnrollmentList enrollments={enrollments} showStudent />
            </Container>
        </Box>
    );
};

export default AdminEnrollmentsPage;
