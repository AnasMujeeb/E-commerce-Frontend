import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building, Globe, CreditCard, Truck, ArrowRight, ShieldCheck } from 'lucide-react';

const ShippingScreen = () => {
  const navigate = useNavigate();

  // LocalStorage se saved shipping address uthaayein (agar pehle save hua ho)
  const savedAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};

  const [address, setAddress] = useState(savedAddress.address || '');
  const [city, setCity] = useState(savedAddress.city || '');
  const [postalCode, setPostalCode] = useState(savedAddress.postalCode || '');
  const [country, setCountry] = useState(savedAddress.country || '');
  const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');

  const submitHandler = (e) => {
    e.preventDefault();

    // Shipping address localstorage mein save karein
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ address, city, postalCode, country, paymentMethod })
    );

    // Place Order / Review screen par redirection
    alert('Shipping details saved successfully!');
    navigate('/placeorder');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8 text-xs font-semibold">
        <span className="text-emerald-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Cart
        </span>
        <span className="text-slate-600">—</span>
        <span className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Truck className="w-4 h-4" /> Shipping & Payment
        </span>
      </div>

      <div className="glassmorphism rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Shipping Details</h2>
          <p className="text-slate-400 text-xs mt-1">Provide your delivery address and payment preferences</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          
          {/* Address */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Street Address</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="123 Future Tech Boulevard"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* City & Postal Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">City</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Karachi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Postal Code</label>
              <input
                type="text"
                placeholder="75500"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Country */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Country</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Pakistan"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <label className="text-xs font-semibold text-slate-300 block">Select Payment Method</label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'CashOnDelivery' 
                  ? 'bg-indigo-500/10 border-indigo-500 text-white' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CashOnDelivery"
                  checked={paymentMethod === 'CashOnDelivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-indigo-500"
                />
                <Truck className="w-5 h-5 text-indigo-400 shrink-0" />
                <div className="text-xs font-semibold">
                  <div>Cash on Delivery</div>
                  <div className="text-[10px] text-slate-500 font-normal">Pay upon receiving order</div>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'Card' 
                  ? 'bg-indigo-500/10 border-indigo-500 text-white' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={paymentMethod === 'Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-indigo-500"
                />
                <CreditCard className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-xs font-semibold">
                  <div>Credit / Debit Card</div>
                  <div className="text-[10px] text-slate-500 font-normal">Online Visa / Mastercard</div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:opacity-90 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            Continue to Order Summary
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;