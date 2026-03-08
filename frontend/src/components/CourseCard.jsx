import {
    Card, CardContent, CardActions, Typography, Button, Chip, Box, LinearProgress
} from '@mui/material';
import { People, Person, School } from '@mui/icons-material';

const CourseCard = ({ course, onEnroll, enrolled, isStudent }) => {
    const spotsLeft = course.capacity - (course.enrolledCount || 0);
    const fillPercent = ((course.enrolledCount || 0) / course.capacity) * 100;
    const isFull = spotsLeft <= 0;

    return (
        <Card sx={{
            height: '100%', display: 'flex', flexDirection: 'column',
            borderRadius: 3, transition: 'all 0.3s ease',
            border: '1px solid rgba(0,0,0,0.08)',
            '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }
        }}>
            <Box sx={{
                height: 8,
                background: isFull
                    ? 'linear-gradient(90deg, #ef5350, #e53935)'
                    : 'linear-gradient(90deg, #1a237e, #3949ab, #5c6bc0)',
            }} />
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ lineHeight: 1.3 }}>
                    {course.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 0.5 }}>
                    <Person fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">{course.instructor}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {course.description?.length > 120
                        ? course.description.substring(0, 120) + '...'
                        : course.description || 'No description available'}
                </Typography>
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                            <People fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.3 }} />
                            {course.enrolledCount || 0} / {course.capacity} enrolled
                        </Typography>
                        <Chip
                            label={isFull ? 'Full' : `${spotsLeft} spots`}
                            size="small"
                            color={isFull ? 'error' : spotsLeft <= 3 ? 'warning' : 'success'}
                            variant="outlined"
                            sx={{ fontWeight: 600, fontSize: 11 }}
                        />
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={Math.min(fillPercent, 100)}
                        sx={{
                            height: 6, borderRadius: 3,
                            backgroundColor: 'rgba(0,0,0,0.06)',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                background: isFull
                                    ? 'linear-gradient(90deg, #ef5350, #e53935)'
                                    : 'linear-gradient(90deg, #1a237e, #3949ab)',
                            }
                        }}
                    />
                </Box>
            </CardContent>
            {isStudent && (
                <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                        fullWidth variant={enrolled ? 'outlined' : 'contained'}
                        disabled={enrolled || isFull}
                        onClick={() => onEnroll(course.id)}
                        startIcon={<School />}
                        sx={{
                            borderRadius: 2, py: 1, textTransform: 'none', fontWeight: 600,
                            ...((!enrolled && !isFull) && {
                                background: 'linear-gradient(135deg, #1a237e, #3949ab)',
                                '&:hover': { background: 'linear-gradient(135deg, #0d1b5e, #283593)' }
                            })
                        }}
                    >
                        {enrolled ? 'Already Enrolled' : isFull ? 'Course Full' : 'Enroll Now'}
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};

export default CourseCard;
