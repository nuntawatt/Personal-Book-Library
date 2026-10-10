import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { tokenStorage } from '../../lib/tokenStorage';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    if (!tokenStorage.get()) {
        return <Navigate to="/login?required=1" replace />;
    }
    return <>{children}</>;
}