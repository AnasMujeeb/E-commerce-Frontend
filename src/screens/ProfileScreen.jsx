import { useState } from 'react';
import { User, Mail, MapPin, Package, CheckCircle2, Clock } from 'lucide-react';

const ProfileScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {
    name: 'Cyber User',
    email: 'user@aura.com',
  };

  const savedAddress = JSON.parse(localStorage.getItem('shippingAddress')) || null;

  // Mock order list (agar koi place order kiya ho)
  const [orders] = useState([
    {
      _id: 'ORD-98421',
      createdAt: '2026-08-01',
      totalPrice: 249.99,
      isPaid: true,
      isDelivered: false,
      paymentMethod: 'Credit Card',
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/30 text-indigo-400">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">User Account</h1>
          <p className="text-xs text-slate-400">Manage your profile & track past order activity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile & Address Column */}
        <div className="space-y-6">
          
          {/* Personal Info Card */}
          <div className="glassmorphism p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800/80 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" /> Account Information
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 block mb-1">Full Name</label>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-slate-200 font-medium flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {userInfo.name}
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Email Address</label>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-slate-200 font-medium flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {userInfo.email}
                </div>
              </div>
            </div>
          </div>

          {/* Default Shipping Address Card */}
          <div className="glassmorphism p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800/80 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" /> Saved Delivery Address
            </h2>

            {savedAddress ? (
              <div className="text-xs text-slate-300 space-y-1 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <p className="font-semibold text-white">{savedAddress.address}</p>
                <p>{savedAddress.city}, {savedAddress.postalCode}</p>
                <p className="text-slate-400">{savedAddress.country}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No address saved yet. Proceed to checkout to add one.</p>
            )}
          </div>

        </div>

        {/* Order History Column */}
        <div className="lg:col-span-2 glassmorphism p-6 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800/80 pb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-400" /> Order History
          </h2>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-indigo-400">ID: {order._id}</span>
                    <div className="text-xs text-slate-400">Date: {order.createdAt}</div>
                    <div className="text-xs text-slate-400">Payment: {order.paymentMethod}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-lg font-extrabold text-white">${order.totalPrice}</span>
                    <div className="flex flex-col gap-1">
                      {order.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-8 text-center">You have no order history yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfileScreen;