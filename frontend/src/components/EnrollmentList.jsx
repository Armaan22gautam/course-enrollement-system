import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, Chip
} from '@mui/material';

const EnrollmentList = ({ enrollments, showStudent = false }) => {
    if (!enrollments || enrollments.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No enrollments found.
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                        {showStudent && <TableCell sx={{ fontWeight: 700 }}>Student</TableCell>}
                        {showStudent && <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>}
                        <TableCell sx={{ fontWeight: 700 }}>Course</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Enrolled On</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {enrollments.map((e, index) => (
                        <TableRow key={e.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                            <TableCell>{index + 1}</TableCell>
                            {showStudent && <TableCell>{e.studentName}</TableCell>}
                            {showStudent && <TableCell>{e.studentEmail}</TableCell>}
                            <TableCell sx={{ fontWeight: 500 }}>{e.courseTitle}</TableCell>
                            <TableCell>
                                {new Date(e.enrollmentDate).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'short', day: 'numeric'
                                })}
                            </TableCell>
                            <TableCell>
                                <Chip label="Active" size="small" color="success" variant="outlined" sx={{ fontWeight: 600 }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EnrollmentList;
