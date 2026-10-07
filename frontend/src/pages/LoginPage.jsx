import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage your stall bookings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-primary">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
