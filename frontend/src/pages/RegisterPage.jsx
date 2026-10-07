import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="card p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Create account</h1>
          <p className="mt-2 text-sm text-slate-500">Register to reserve your stall</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="input-field" required />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="input-field" required />
          </div>

          <button type="submit" className="btn-primary w-full">
            Create account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already a member?{' '}
          <Link to="/login" className="font-semibold text-primary">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
