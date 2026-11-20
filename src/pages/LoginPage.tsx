import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';

export function LoginPage() {
  const navigate = useNavigate();

  // Read the intended destination from localStorage set by RequireAuth
  const from = window.localStorage.getItem('returnAfterLogin') || '/';

  return (
    <div className="authContainer">
      <div className="card">
        <h1>Welcome back</h1>
        <p>Log in to pick up your care thread — bookings, referrals, orders, all in one place.</p>
        <LoginForm onSuccess={() => navigate(from, { replace: true })} />
      </div>
      <p className="authFootnote">
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
