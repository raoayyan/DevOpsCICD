import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, Mail } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from '../features/cardSlice';
const products = [
  { id: 1, name: "Smartphone X", price: 799, image: "/api/placeholder/400/300" },
  { id: 2, name: "Laptop Pro", price: 1299, image: "/api/placeholder/400/300" },
  { id: 3, name: "Wireless Earbuds", price: 149, image: "/api/placeholder/400/300" },
  { id: 4, name: "Smartwatch", price: 249, image: "/api/placeholder/400/300" },
];

const categories = [
  { name: "Phones", icon: "📱" },
  { name: "Laptops", icon: "💻" },
  { name: "Accessories", icon: "🎧" },
  { name: "Wearables", icon: "⌚" },
];

const HomePage = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
     

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to TechMart</h2>
          <p className="text-xl mb-8">Discover the latest in tech innovation</p>
          <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded inline-flex items-center hover:bg-gray-100 transition-colors">
            Shop Now
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image?.url} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                  <button onClick={() => handleAddToCart(product)} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <button key={index} className="bg-white h-32 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center">
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="text-lg font-semibold">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for the latest deals and tech news</p>
          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button type="submit" className="bg-white text-blue-600 font-bold py-2 px-4 rounded-r-lg hover:bg-gray-100 transition-colors inline-flex items-center">
              Subscribe
              <Mail className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TechMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;