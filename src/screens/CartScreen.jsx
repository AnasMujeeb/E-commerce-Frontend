import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty } = useCart();

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 || cartItems.length === 0 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center py-12">
        <div className="p-6 bg-slate-900/80 rounded-full border border-slate-800">
          <ShoppingBag className="w-16 h-16 text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">Your Cart is Empty</h2>
        <p className="text-slate-400 text-sm max-w-sm">
          Looks like you haven't added anything to your cart yet. Explore our latest products!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/20 mt-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-100">Shopping Cart</h1>
        <span className="text-sm text-slate-400">
          <strong className="text-indigo-400">{cartItems.reduce((a, c) => a + c.qty, 0)}</strong> items
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="glassmorphism p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:border-slate-700"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl bg-slate-900"
                />
                <div>
                  <Link
                    to={`/product/${item._id}`}
                    className="font-semibold text-slate-200 hover:text-indigo-400 transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-indigo-400 font-bold mt-1">${item.price}</p>
                </div>
              </div>

              {/* Quantity Controls & Delete */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    disabled={item.qty <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-sm font-bold text-slate-200">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-slate-100">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                    title="Remove Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="glassmorphism p-6 rounded-2xl border border-slate-800 h-fit space-y-6">
          <h2 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Items Total</span>
              <span className="text-slate-200 font-medium">${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Shipping</span>
              <span className="text-slate-200 font-medium">
                {shippingPrice === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `$${shippingPrice}`}
              </span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-extrabold text-slate-100">
              <span>Total Amount</span>
              <span className="text-indigo-400">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={checkoutHandler}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen; // <-- Export Default yahan hona zaroori hai