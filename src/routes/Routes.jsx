import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminRoute from './AdminRoute'; // ✅ Import AdminRoute

// Page Components
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import Comments from '../pages/Comments';

// Admin Panel Components
import Login from '../admin/Login';
import Dashboard from '../admin/Dashboard';
import ManageComments from '../admin/ManageComments';
import ManageExperience from '../admin/ManageExperience';

const router = createBrowserRouter([
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
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        path: 'manage-comments',
        element: (
          <AdminRoute>
            <ManageComments />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-experience',
        element: (
          <AdminRoute>
            <ManageExperience />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
