import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Landmark, LogIn } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(formData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface-card-strong w-full max-w-md p-8"
      >
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#2563eb,#1d4ed8)] shadow-[0_20px_55px_-28px_rgba(37,99,235,0.7)]">
            <Landmark className="h-8 w-8 text-white" />
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold tracking-[-0.04em] text-[color:var(--text-primary)]">Welcome Back</h2>
        <p className="mt-2 text-center text-sm text-[color:var(--text-secondary)]">Sign in to continue managing your money with clarity.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="label-text">Username or Email</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label className="label-text">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn-primary w-full py-3 text-lg"
          >
            <LogIn size={20} /> Sign In
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-[color:var(--text-secondary)]">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-[color:var(--brand)] hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
