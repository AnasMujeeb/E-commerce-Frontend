import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, User, LogOut, Zap, Menu, X, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const totalCartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setIsOpen(false);
    navigate('/login');
    window.location.reload();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glassmorphism px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo with Glow */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-600/30 rounded-xl border border-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-6 h-6 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AURA<span className="text-indigo-500">.</span>
          </span>
        </Link>

        {/* Desktop Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="hidden md:flex items-center bg-slate-900/60 border border-slate-700/50 rounded-full px-4 py-2 w-1/3 focus-within:border-indigo-500/80 transition-all"
        >
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search futuristic products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm w-full focus:outline-none text-slate-200 placeholder-slate-500"
          />
        </form>

        {/* Desktop Nav Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-slate-300 hover:text-indigo-400 transition-colors font-medium text-sm">
            Home
          </Link>

          {/* Admin Add Product Option */}
          {userInfo && userInfo.isAdmin && (
            <Link 
              to="/admin/add-product" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold text-xs transition-all shadow-sm"
              title="Add New Product"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
          )}

          {/* Dynamic Cart Badge */}
          <Link to="/cart" className="relative p-2 text-slate-300 hover:text-indigo-400 transition-colors">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
              {totalCartQty}
            </span>
          </Link>

          {/* User Auth Condition */}
          {userInfo ? (
            <div className="flex items-center gap-3">
              {/* Profile Link */}
              <Link 
                to="/profile" 
                className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
                title="View Profile"
              >
                <User className="w-3.5 h-3.5" />
                <span>{userInfo.name}</span>
              </Link>

              <button
                onClick={logoutHandler}
                className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-red-400 py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/30 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-slate-300 hover:text-white focus:outline-none cursor-pointer"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col gap-4 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-slate-900/80 border border-slate-700/50 rounded-xl px-4 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm w-full focus:outline-none text-slate-200"
            />
          </form>

          <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-indigo-400 py-1">Home</Link>
          
          {/* Admin Mobile Add Product Option */}
          {userInfo && userInfo.isAdmin && (
            <Link 
              to="/admin/add-product" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-indigo-400 hover:text-indigo-300 py-1 bg-indigo-600/10 px-3 rounded-lg border border-indigo-500/20"
            >
              <span className="flex items-center gap-2 text-xs font-bold">
                <PlusCircle className="w-4 h-4" /> Add Product
              </span>
              <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">Admin</span>
            </Link>
          )}

          <Link to="/cart" onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-indigo-400 py-1 flex justify-between">
            <span>Cart</span>
            <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {totalCartQty}
            </span>
          </Link>

          {/* Mobile User Auth Condition */}
          {userInfo ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
              <Link 
                to="/profile" 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-2 rounded-xl border border-cyan-500/20 text-center flex items-center justify-center gap-2 hover:bg-cyan-500/20 transition-all"
              >
                <User className="w-4 h-4" />
                <span>Profile: {userInfo.name}</span>
              </Link>
              <button 
                onClick={logoutHandler} 
                className="w-full text-center py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium text-sm border border-red-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;