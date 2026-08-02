import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // <-- 1. Import Toaster
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
        
        {/* Dark Theme Custom Toast Component */}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0f172a',
              color: '#f8fafc',
              border: '1px solid rgba(51, 65, 85, 0.8)',
              fontSize: '14px',
              borderRadius: '12px',
            },
          }}
        />

        <div>
          <Navbar />

          <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/admin/add-product" element={<AddProductScreen />} />
              <Route path="/admin/product/:id/edit" element={<EditProductScreen />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;