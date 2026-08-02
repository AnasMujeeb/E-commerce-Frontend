import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const EditProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await API.put(
        `/products/${id}`,
        {
          name,
          price: Number(price),
          image,
          brand,
          category,
          countInStock: Number(countInStock),
          description,
        },
        config
      );

      setSubmitting(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-slate-400">Loading Product Data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white">
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
      >
        ← Cancel
      </button>

      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      {error && (
        <div className="p-3 mb-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1">Product Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Count In Stock</label>
            <input
              type="number"
              required
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Brand</label>
            <input
              type="text"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Category</label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Image URL</label>
          <input
            type="url"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Description</label>
          <textarea
            rows="3"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          {submitting ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProductScreen;