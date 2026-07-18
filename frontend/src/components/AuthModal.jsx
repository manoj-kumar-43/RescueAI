import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, register } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success;
      if (isLogin) {
        success = await login(email, password);
      } else {
        if (!name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        success = await register(name, email, password);
      }
      if (success) {
        setName('');
        setEmail('');
        setPassword('');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  if (!showAuthModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={() => setShowAuthModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md p-8 border border-outline-variant"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isLogin ? 'login' : 'person_add'}
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              {isLogin
                ? 'Sign in to sync your emergency data'
                : 'Register to save your medical profile'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-error-container text-on-error-container p-3 rounded-lg mb-4 font-body-md text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <div>
                <label className="font-label-bold text-label-bold text-on-surface mb-1 block text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full p-3 rounded-lg bg-surface border border-outline-variant text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md"
                />
              </div>
            )}
            <div>
              <label className="font-label-bold text-label-bold text-on-surface mb-1 block text-sm">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg bg-surface border border-outline-variant text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md"
              />
            </div>
            <div>
              <label className="font-label-bold text-label-bold text-on-surface mb-1 block text-sm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full p-3 rounded-lg bg-surface border border-outline-variant text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-action-xl text-action-xl transition-colors min-h-[56px] flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-on-primary/40 text-on-primary-container/50 cursor-not-allowed'
                  : 'bg-primary text-on-primary hover:bg-primary/90'
              }`}
            >
              {loading && (
                <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
              )}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={toggleMode}
              className="font-body-md text-body-md text-primary hover:underline"
            >
              {isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Sign in'}
            </button>
          </div>

          {/* Skip */}
          <div className="text-center mt-3">
            <button
              onClick={() => setShowAuthModal(false)}
              className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Skip for now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
