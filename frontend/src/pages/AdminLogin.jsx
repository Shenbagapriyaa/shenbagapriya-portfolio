import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials and that the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="glass rounded-3xl p-10 w-full max-w-sm">
        <h1 className="font-display font-bold text-2xl mb-1">Admin Login</h1>
        <p className="text-sm text-slate mb-6">Manage your portfolio content.</p>
        <input
          type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-3 rounded-2xl border border-black/[0.08] bg-white/70 text-sm outline-none focus:border-violet focus:ring-4 focus:ring-violet/10"
        />
        <input
          type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-2xl border border-black/[0.08] bg-white/70 text-sm outline-none focus:border-violet focus:ring-4 focus:ring-violet/10"
        />
        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center">
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
