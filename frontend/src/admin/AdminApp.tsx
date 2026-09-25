import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from './AdminLayout';
import LoginPage from './LoginPage';
import MessagesPage from './MessagesPage';
import PackagesAdminPage from './PackagesAdminPage';
import MenuAdminPage from './MenuAdminPage';
import GalleryAdminPage from './GalleryAdminPage';

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="messages"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <MessagesPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="packages"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PackagesAdminPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="menu"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <MenuAdminPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="gallery"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <GalleryAdminPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/admin/messages" replace />} />
    </Routes>
  );
}
