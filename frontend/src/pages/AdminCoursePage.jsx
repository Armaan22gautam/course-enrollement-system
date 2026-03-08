import { useState, useEffect } from 'react';
import api from '../api/axios';
import {
    Container, Typography, Box, Paper, Button, TextField, Grid,
    Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Snackbar, Alert, Chip
} from '@mui/material';
import { Add, Edit, Delete, Close } from '@mui/icons-material';

const AdminCoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', instructor: '', capacity: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => { fetchCourses(); }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get('/api/courses');
            setCourses(res.data);
        } catch (err) { /* ignore */ }
    };

    const handleOpen = (course = null) => {
        if (course) {
            setEditId(course.id);
            setForm({ title: course.title, description: course.description || '', instructor: course.instructor, capacity: course.capacity });
        } else {
            setEditId(null);
            setForm({ title: '', description: '', instructor: '', capacity: '' });
        }
        setOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const payload = { ...form, capacity: parseInt(form.capacity) };
            if (editId) {
                await api.put(`/api/courses/${editId}`, payload);
                setSnackbar({ open: true, message: 'Course updated!', severity: 'success' });
            } else {
                await api.post('/api/courses', payload);
                setSnackbar({ open: true, message: 'Course created!', severity: 'success' });
            }
            setOpen(false);
            fetchCourses();
        } catch (err) {
            setSnackbar({ open: true, message: err.response?.data?.message || 'Operation failed', severity: 'error' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;
        try {
            await api.delete(`/api/courses/${id}`);
            setSnackbar({ open: true, message: 'Course deleted!', severity: 'success' });
            fetchCourses();
        } catch (err) {
            setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
        }
    };

    return (
        <Box sx={{ background: '#f8f9fc', minHeight: '85vh', py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h4" fontWeight={800}>Manage Courses</Typography>
                        <Typography variant="body1" color="text.secondary">{courses.length} total courses</Typography>
                    </Box>
                    <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}
                        sx={{
                            textTransform: 'none', borderRadius: 2, fontWeight: 600, px: 3,
                            background: 'linear-gradient(135deg, #1a237e, #3949ab)',
                            '&:hover': { background: 'linear-gradient(135deg, #0d1b5e, #283593)' }
                        }}>
                        Add Course
                    </Button>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Instructor</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Capacity</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Enrolled</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course, i) => (
                                <TableRow key={course.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{course.title}</TableCell>
                                    <TableCell>{course.instructor}</TableCell>
                                    <TableCell>{course.capacity}</TableCell>
                                    <TableCell>
                                        <Chip label={`${course.enrolledCount || 0} / ${course.capacity}`} size="small"
                                            color={(course.enrolledCount || 0) >= course.capacity ? 'error' : 'success'}
                                            variant="outlined" sx={{ fontWeight: 600 }} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => handleOpen(course)} size="small">
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(course.id)} size="small">
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {courses.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                        <Typography color="text.secondary">No courses yet. Create one!</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Create/Edit Dialog */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth
                    PaperProps={{ sx: { borderRadius: 3 } }}>
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
                        {editId ? 'Edit Course' : 'Create New Course'}
                        <IconButton onClick={() => setOpen(false)}><Close /></IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={2} sx={{ pt: 1 }}>
                            <Grid size={12}>
                                <TextField fullWidth label="Course Title" value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })} required
                                    InputProps={{ sx: { borderRadius: 2 } }} />
                            </Grid>
                            <Grid size={12}>
                                <TextField fullWidth label="Description" value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    multiline rows={3} InputProps={{ sx: { borderRadius: 2 } }} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Instructor" value={form.instructor}
                                    onChange={(e) => setForm({ ...form, instructor: e.target.value })} required
                                    InputProps={{ sx: { borderRadius: 2 } }} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Capacity" type="number" value={form.capacity}
                                    onChange={(e) => setForm({ ...form, capacity: e.target.value })} required
                                    InputProps={{ sx: { borderRadius: 2 }, inputProps: { min: 1 } }} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none', borderRadius: 2 }}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit}
                            sx={{
                                textTransform: 'none', borderRadius: 2, fontWeight: 600,
                                background: 'linear-gradient(135deg, #1a237e, #3949ab)'
                            }}>
                            {editId ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>

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

export default AdminCoursePage;
