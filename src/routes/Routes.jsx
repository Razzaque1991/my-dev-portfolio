import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminRoute from './AdminRoute';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import Comments from '../pages/Comments';

// Admin Pages
import Login from '../admin/Login';
import Dashboard from '../admin/Dashboard';
import ManageComments from '../admin/ManageComments';
import ManageExperience from '../admin/ManageExperience';
import ManageProjects from '../admin/ManageProjects';
import ProfileSettings from '../admin/ProfileSettings';

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/projects', element: <Projects /> },
      { path: '/contact', element: <Contact /> },
      { path: '/comments', element: <Comments /> },
    ],
  },

  // Admin Login
  { path: '/admin/login', element: <Login /> },

  // Admin Dashboard (Protected)
  {
    path: '/admin/dashboard',
    element: (
      <AdminRoute>
        <DashboardLayout />  
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'manage-comments', element: <ManageComments /> },
      { path: 'manage-experience', element: <ManageExperience /> },
      { path: 'manage-projects', element: <ManageProjects /> },
      { path: 'profile-settings', element: <ProfileSettings /> },
    ],
  },
]);

export default router;
