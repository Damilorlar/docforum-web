import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';
import type { Role } from '../types/models';

interface RequireAuthProps {
  allowedRoles: Role[];
  children: ReactNode;
}

/** Route guard: redirects to /login if unauthenticated, recording the
 * attempted path in localStorage so LoginPage can return the user there.
 * Only accepts same-app relative paths; falls back to the role home for
 * external paths. */
export function RequireAuth({ allowedRoles, children }: RequireAuthProps) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const attemptPathname = new URL(location.pathname, 'https://docforum-web.local').pathname;

  if (!user) {
    // Store the intended destination so LoginPage can return after auth
    const from = attemptPathname.startsWith('/') ? attemptPathname : '/';
    window.localStorage.setItem('returnAfterLogin', from);
    navigate('/login', { replace: true });
    return <>{children}</>;
  }
  if (!allowedRoles.includes(user.role)) {
    // Signed-in but wrong role: send them to their role home, not the original path
    navigate('/', { replace: true });
    return <>{children}</>;
  }

  return <>{children}</>;
}