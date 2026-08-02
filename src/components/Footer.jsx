import { Zap, Globe, Mail, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full mt-20 border-t border-slate-800/80 bg-slate-900/30 backdrop-blur-md py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-indigo-600/30 rounded-xl border border-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AURA<span className="text-indigo-500">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <Link to="/cart" className="hover:text-indigo-400 transition-colors">Cart</Link>
          <Link to="/profile" className="hover:text-indigo-400 transition-colors">Profile</Link>
        </div>

        {/* Social Icons & Copyright */}
        <div className="flex items-center gap-4 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <a href="#" className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-all border border-slate-800">
              <Globe className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-all border border-slate-800">
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-all border border-slate-800">
              <Code className="w-3.5 h-3.5" />
            </a>
          </div>
          <span className="text-slate-500">© {new Date().getFullYear()} AURA Store. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;