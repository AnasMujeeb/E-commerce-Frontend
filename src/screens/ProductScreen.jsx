import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, Star, ShieldCheck, Truck, RefreshCw, AlertCircle, Edit, Trash2 } from 'lucide-react';
import API from '../services/api';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [deleting, setDeleting] = useState(false);

  // Check user info from LocalStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (product) {
      addToCart(product, qty);
      navigate('/cart');
    }
  };

  // Delete Product Handler
  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setDeleting(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };
        await API.delete(`/products/${id}`, config);
        setDeleting(false);
        navigate('/'); // Redirect to Home after deletion
      } catch (err) {
        alert(err.response?.data?.message || err.message);
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse">Loading product specs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="glassmorphism p-6 rounded-2xl border border-red-500/30 text-center max-w-md space-y-3">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
          <h3 className="text-xl font-bold text-slate-100">Product Not Found</h3>
          <p className="text-red-400 text-sm">{error}</p>
          <Link to="/" className="inline-block mt-4 text-xs bg-indigo-600 px-4 py-2 rounded-xl text-white">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      {/* Top Bar: Back Button & Admin Actions */}
      <div className="flex items-center justify-between">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        {/* Admin Buttons (Only visible to Admin) */}
        {userInfo && userInfo.isAdmin && (
          <div className="flex items-center gap-3">
            <Link
              to={`/admin/product/${product._id}/edit`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-200"
            >
              <Edit className="w-4 h-4" />
              Edit Product
            </Link>
            <button
              onClick={deleteHandler}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Deleting...' : 'Delete Product'}
            </button>
          </div>
        )}
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Product Image Stage */}
        <div className="relative glassmorphism rounded-3xl p-6 border border-slate-800 overflow-hidden group">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-[400px] object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info & Actions */}
        <div className="space-y-6">
          <div>
            <span className="inline-block text-xs font-semibold px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full mb-3">
              {product.category || 'Tech & Electronics'}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-400 gap-1 text-sm font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>4.9</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-sm text-slate-400">128 Reviews</span>
              <span className="text-slate-600">•</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                product.countInStock > 0 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="text-4xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ${product.price}
          </div>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed border-t border-b border-slate-800/80 py-4">
            {product.description || 'High-performance engineering crafted with modern precision. Experience unmatched aesthetic and capability.'}
          </p>

          {/* Quantity & Add to Cart Controls */}
          {product.countInStock > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-slate-300">Quantity:</label>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500"
                >
                  {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={addToCartHandler}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add To Cart
                </button>
              </div>
            </div>
          )}

          {/* Feature Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
            <div className="glassmorphism p-3 rounded-xl text-center space-y-1">
              <Truck className="w-5 h-5 text-indigo-400 mx-auto" />
              <p className="text-[11px] font-medium text-slate-300">Fast Express Shipping</p>
            </div>
            <div className="glassmorphism p-3 rounded-xl text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mx-auto" />
              <p className="text-[11px] font-medium text-slate-300">2 Year Official Warranty</p>
            </div>
            <div className="glassmorphism p-3 rounded-xl text-center space-y-1">
              <RefreshCw className="w-5 h-5 text-purple-400 mx-auto" />
              <p className="text-[11px] font-medium text-slate-300">30-Day Easy Returns</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductScreen;