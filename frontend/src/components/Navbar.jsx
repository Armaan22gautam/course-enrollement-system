import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    AppBar, Toolbar, Typography, Button, IconButton, Drawer,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Box, Avatar, Menu, MenuItem, Divider, useMediaQuery, useTheme
} from '@mui/material';
import {
    Menu as MenuIcon, School, Dashboard, Book, PersonAdd,
    Login, Logout, AdminPanelSettings, ListAlt
} from '@mui/icons-material';

const Navbar = () => {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        setAnchorEl(null);
    };

    const authLinks = isAuthenticated()
        ? [
            { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
            { text: 'Courses', icon: <Book />, path: '/courses' },
            ...(isAdmin()
                ? [{ text: 'Manage Courses', icon: <AdminPanelSettings />, path: '/admin/courses' },
                { text: 'All Enrollments', icon: <ListAlt />, path: '/admin/enrollments' }]
                : [{ text: 'My Courses', icon: <School />, path: '/my-courses' }]),
        ]
        : [
            { text: 'Login', icon: <Login />, path: '/login' },
            { text: 'Register', icon: <PersonAdd />, path: '/register' },
        ];

    return (
        <>
            <AppBar position="sticky" sx={{
                background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}>
                <Toolbar>
                    {isMobile && (
                        <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 1 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <School sx={{ mr: 1, fontSize: 28 }} />
                    <Typography variant="h6" component={RouterLink} to="/"
                        sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 700, letterSpacing: 0.5 }}>
                        CourseHub
                    </Typography>
                    {!isMobile && authLinks.map((link) => (
                        <Button key={link.path} color="inherit" component={RouterLink} to={link.path}
                            startIcon={link.icon}
                            sx={{ mx: 0.5, textTransform: 'none', fontWeight: 500, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                            {link.text}
                        </Button>
                    ))}
                    {isAuthenticated() && (
                        <>
                            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
                                <Avatar sx={{ width: 35, height: 35, bgcolor: '#ff6f00', fontSize: 16, fontWeight: 700 }}>
                                    {user?.name?.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
                                PaperProps={{ sx: { mt: 1, minWidth: 200, borderRadius: 2 } }}>
                                <MenuItem disabled>
                                    <Typography variant="body2" fontWeight={600}>{user?.name}</Typography>
                                </MenuItem>
                                <MenuItem disabled>
                                    <Typography variant="caption" color="text.secondary">{user?.role}</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 260, pt: 2 }}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Typography variant="h6" fontWeight={700} color="primary">CourseHub</Typography>
                    </Box>
                    <Divider />
                    <List>
                        {authLinks.map((link) => (
                            <ListItem key={link.path} disablePadding>
                                <ListItemButton component={RouterLink} to={link.path} onClick={() => setDrawerOpen(false)}>
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <ListItemText primary={link.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {isAuthenticated() && (
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleLogout}>
                                    <ListItemIcon><Logout /></ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
