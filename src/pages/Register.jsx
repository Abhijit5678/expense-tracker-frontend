import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Landmark, UserPlus } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registerUser(formData);
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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="surface-card-strong w-full max-w-md p-8"
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,#0f9f6e,#15803d)] shadow-[0_20px_55px_-28px_rgba(15,159,110,0.7)]">
            <Landmark className="h-7 w-7 text-white" />
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold tracking-[-0.04em] text-[color:var(--text-primary)]">Create an Account</h2>
        <p className="mt-2 text-center text-sm text-[color:var(--text-secondary)]">Start tracking spending, income, and liabilities with a polished workflow.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="label-text">Full Name</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="label-text">Username</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="johndoe123"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label className="label-text">Email Address</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label-text">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full rounded-2xl bg-[linear-gradient(135deg,#0f9f6e,#15803d)] py-3 text-lg font-semibold text-white shadow-[0_20px_55px_-28px_rgba(15,159,110,0.7)] transition-all duration-200"
          >
            <UserPlus size={20} className="mr-2 inline-flex" /> Register
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-[color:var(--text-secondary)]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[color:var(--brand)] hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
