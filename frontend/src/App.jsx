import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CourseListPage from './pages/CourseListPage';
import MyCoursesPage from './pages/MyCoursesPage';
import AdminCoursePage from './pages/AdminCoursePage';
import AdminEnrollmentsPage from './pages/AdminEnrollmentsPage';

const theme = createTheme({
  palette: {
    primary: { main: '#1a237e' },
    secondary: { main: '#ff6f00' },
    background: { default: '#f8f9fc' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/courses" element={
              <ProtectedRoute><CourseListPage /></ProtectedRoute>
            } />
            <Route path="/my-courses" element={
              <ProtectedRoute requiredRole="STUDENT"><MyCoursesPage /></ProtectedRoute>
            } />
            <Route path="/admin/courses" element={
              <ProtectedRoute requiredRole="ADMIN"><AdminCoursePage /></ProtectedRoute>
            } />
            <Route path="/admin/enrollments" element={
              <ProtectedRoute requiredRole="ADMIN"><AdminEnrollmentsPage /></ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
