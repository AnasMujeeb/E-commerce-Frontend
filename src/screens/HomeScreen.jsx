import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Eye, Star, Sparkles, AlertCircle, SlidersHorizontal, SearchX } from 'lucide-react';
import API from '../services/api';
import { useCart } from '../context/CartContext'; // <-- 1. Cart Context import kiya

const categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Accessories', 'Gaming'];

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { addToCart } = useCart(); // <-- 2. addToCart function Extract kiya

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search aur Category wise Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse">Fetching 3D inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="glassmorphism p-6 rounded-2xl border border-red-500/30 text-center max-w-md space-y-3">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
          <h3 className="text-xl font-bold text-slate-100">Connection Error</h3>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800/80 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Catalog 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Discover <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Futuristic</span> Products
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Immerse yourself in our premium high-tech collection. Sleek design meets high performance.
          </p>
        </div>
      </section>

      {/* Category Pills & Filters */}
      <div className="space-y-4 border-b border-slate-800 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Counter */}
          <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Showing <strong className="text-slate-200">{filteredProducts.length}</strong> Products</span>
          </div>

        </div>

        {/* Active Search Notification Pill */}
        {searchQuery && (
          <div className="flex items-center justify-between bg-indigo-500/10 border border-indigo-500/30 px-4 py-2.5 rounded-xl text-xs text-indigo-300">
            <span>Search results for: <strong>"{searchQuery}"</strong></span>
            <button 
              onClick={() => window.history.replaceState({}, '', '/')} 
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Modern Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group relative glassmorphism rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Image & Quick Action Overlay */}
              <div className="relative w-full h-56 bg-slate-900/80 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <Link
                    to={`/product/${product._id}`}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md transition-transform duration-300 hover:scale-110"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => addToCart(product, 1)} // <-- 3. Quick Add to Cart Button Connect Hua
                    className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 hover:scale-110 cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-semibold">{product.rating || 4.8}</span>
                    <span className="text-slate-500">({product.numReviews || 24})</span>
                  </div>
                  <h3 className="font-semibold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <Link
                    to={`/product/${product._id}`}
                    className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600 transition-colors border border-slate-700 hover:border-indigo-500"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Filter Results */
        <div className="text-center py-16 space-y-3 glassmorphism rounded-3xl border border-slate-800 max-w-lg mx-auto">
          <SearchX className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-300">No Matching Products Found</h3>
          <p className="text-xs text-slate-500 px-4">
            Try searching with a different term or select another category filter.
          </p>
        </div>
      )}

    </div>
  );
};

export default HomeScreen;