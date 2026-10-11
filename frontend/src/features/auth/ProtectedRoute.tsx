import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { tokenStorage } from '../../lib/tokenStorage';

// ตรวจสอบ Token ก่อนเข้าถึง Component ด้านใน ถ้าไม่มี Token จะถูกส่งไปหน้า Login
export function ProtectedRoute({ children }: { children: ReactNode }) {
    if (!tokenStorage.get()) {
        return <Navigate to="/login?required=1" replace />;
    }
    return <>{children}</>;
}