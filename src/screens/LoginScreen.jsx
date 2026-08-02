import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, LogIn, UserPlus, AlertCircle, Sparkles } from 'lucide-react';
import API from '../services/api';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Status States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // FIX: Endpoint match with backend routes (/users/login & /users/register)
      const endpoint = isLogin ? '/users/login' : '/users/register';
      const payload = isLogin ? { email, password } : { name, email, password };

      const { data } = await API.post(endpoint, payload);

      // Save User Data and Token in LocalStorage
      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);
      navigate('/'); // Redirect to Home
      window.location.reload(); // Refresh to update navbar state
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-8 px-4">
      <div className="relative w-full max-w-md glassmorphism rounded-3xl p-8 border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Tab Toggle Buttons */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 mb-8">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              isLogin 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              !isLogin 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Register
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Security Portal
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400 text-xs">
            {isLogin ? 'Enter your credentials to access your account' : 'Join AURA experience today'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Anas"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="anas@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:opacity-90 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-300 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginScreen;