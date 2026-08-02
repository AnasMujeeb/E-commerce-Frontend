import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MapPin, CreditCard, ShoppingBag, CheckCircle2, ArrowLeft } from 'lucide-react';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const shippingPrice = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shippingPrice;

  const placeOrderHandler = () => {
    // Yahan aage chal kar Backend API call kar ke database mein order create hoga
    alert('🎉 Order Placed Successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Order Summary & Confirmation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Shipping Address */}
          <div className="glassmorphism p-5 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" /> Delivery Address
            </h2>
            <p className="text-sm text-slate-400">
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="glassmorphism p-5 rounded-2xl border border-slate-800 space-y-2">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-cyan-400" /> Payment Method
            </h2>
            <p className="text-sm text-slate-400">
              {shippingAddress.paymentMethod === 'CashOnDelivery' ? 'Cash On Delivery' : 'Credit / Debit Card'}
            </p>
          </div>

          {/* Order Items */}
          <div className="glassmorphism p-5 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-purple-400" /> Order Items
            </h2>
            <div className="divide-y divide-slate-800/60">
              {cartItems.map((item) => (
                <div key={item._id} className="py-3 flex items-center gap-4 justify-between">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 text-xs">
                    <Link to={`/product/${item._id}`} className="text-slate-200 font-medium hover:text-indigo-400">
                      {item.name}
                    </Link>
                    <div className="text-slate-400 mt-0.5">{item.qty} x ${item.price} = <span className="text-indigo-400 font-bold">${item.qty * item.price}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Pricing Summary */}
        <div className="glassmorphism p-6 rounded-3xl border border-slate-800 space-y-6 h-fit">
          <h2 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-4">
            Total Payment
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Items</span>
              <span className="font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Shipping</span>
              <span className="font-semibold text-slate-200">{shippingPrice === 0 ? 'FREE' : `$${shippingPrice}`}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tax (10%)</span>
              <span className="font-semibold text-slate-200">${tax.toFixed(2)}</span>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-extrabold text-white">
              <span>Total Amount</span>
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={placeOrderHandler}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" /> Confirm & Place Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrderScreen;