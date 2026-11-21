
import React, { useState } from 'react';
import {
  Search, ShoppingCart, MapPin, Menu, Plus, Minus,
  Leaf, Store, Clock, ArrowRight, X, ShoppingBag
} from 'lucide-react';

const categories = [
  { name: 'All', icon: '🛍️' },
  { name: 'Grocery', icon: '🛒' },
  { name: 'Food', icon: '🍛' },
  { name: 'Vegetables', icon: '🥦' },
  { name: 'Fruits', icon: '🍎' },
  { name: 'Meat', icon: '🍗' }
];

const products = [
  { id: 1, name: 'Fresh Tomatoes', category: 'Vegetables', price: 30, unit: '500 g', emoji: '🍅', tag: 'Fresh' },
  { id: 2, name: 'Fresh Potatoes', category: 'Vegetables', price: 25, unit: '1 kg', emoji: '🥔' },
  { id: 3, name: 'Banana', category: 'Fruits', price: 40, unit: '1 dozen', emoji: '🍌', tag: 'Popular' },
  { id: 4, name: 'Fresh Apples', category: 'Fruits', price: 120, unit: '1 kg', emoji: '🍎' },
  { id: 5, name: 'Basmati Rice', category: 'Grocery', price: 90, unit: '1 kg', emoji: '🍚' },
  { id: 6, name: 'Cooking Oil', category: 'Grocery', price: 145, unit: '1 litre', emoji: '🫗' },
  { id: 7, name: 'Chicken Curry Cut', category: 'Meat', price: 180, unit: '500 g', emoji: '🍗' },
  { id: 8, name: 'Fresh Fish', category: 'Meat', price: 160, unit: '500 g', emoji: '🐟' },
  { id: 9, name: 'Veg Thali', category: 'Food', price: 90, unit: '1 plate', emoji: '🍱' },
  { id: 10, name: 'Chicken Biryani', category: 'Food', price: 150, unit: '1 plate', emoji: '🍛', tag: 'Popular' },
  { id: 11, name: 'Milk', category: 'Grocery', price: 30, unit: '500 ml', emoji: '🥛' },
  { id: 12, name: 'Fresh Oranges', category: 'Fruits', price: 60, unit: '1 kg', emoji: '🍊' }
];

export default function App() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts = products.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartItems = products.filter(p => cart[p.id] > 0);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);

  function changeQty(id, amount) {
    setCart(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + amount)
    }));
  }

  return (
    <div className="app">
      <header className="header">
        <div className="nav">
          <a className="brand" href="#">
            <span className="brand-icon">🌿</span>
            <span>AROKA <b>FRESH</b><small>LOCAL DELIVERY</small></span>
          </a>

          <div className="location">
            <MapPin size={18} />
            <span><small>Delivering to</small><b>Hinjilicut, Odisha</b></span>
          </div>

          <button className="cart-button" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} />
            Cart <span>{count}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">🌱 YOUR LOCAL MARKET, ONLINE</span>
            <h1>Freshness at your <em>doorstep.</em></h1>
            <p>Fresh groceries, delicious food and daily essentials from your favourite local shops.</p>
            <a href="#products" className="hero-btn">Start Shopping <ArrowRight size={18} /></a>
            <div className="hero-note"><Clock size={15} /> Local delivery in Hinjilicut</div>
          </div>
          <div className="hero-art">
            <div className="hero-circle">🥬</div>
            <span className="float-one">🍅</span>
            <span className="float-two">🥕</span>
            <span className="float-three">🍊</span>
          </div>
        </section>

        <section className="benefits">
          <div><Leaf /><span><b>Fresh Products</b><small>Local market picks</small></span></div>
          <div><Store /><span><b>Local Shops</b><small>Support local sellers</small></span></div>
          <div><Clock /><span><b>Quick Delivery</b><small>At your doorstep</small></span></div>
        </section>

        <section className="shop-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">EXPLORE OUR MARKET</span>
              <h2>What are you looking for?</h2>
            </div>
          </div>

          <div className="categories">
            {categories.map(c => (
              <button
                key={c.name}
                className={category === c.name ? 'category active' : 'category'}
                onClick={() => setCategory(c.name)}
              >
                <span>{c.icon}</span>{c.name}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={20} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search rice, vegetables, food..."
            />
            {search && <button onClick={() => setSearch('')}><X size={17}/></button>}
          </div>

          <div className="products-heading">
            <h2>{category === 'All' ? 'Popular Products' : category}</h2>
            <span>{visibleProducts.length} products</span>
          </div>

          <div className="product-grid">
            {visibleProducts.map(p => (
              <article className="product-card" key={p.id}>
                <div className="product-image">
                  {p.tag && <span className="tag">{p.tag}</span>}
                  <span>{p.emoji}</span>
                </div>
                <div className="product-info">
                  <small>{p.category}</small>
                  <h3>{p.name}</h3>
                  <p>{p.unit}</p>
                  <div className="product-bottom">
                    <b>₹{p.price}</b>
                    {cart[p.id] ? (
                      <div className="quantity">
                        <button onClick={() => changeQty(p.id, -1)}><Minus size={14}/></button>
                        <b>{cart[p.id]}</b>
                        <button onClick={() => changeQty(p.id, 1)}><Plus size={14}/></button>
                      </div>
                    ) : (
                      <button className="add-btn" onClick={() => changeQty(p.id, 1)}>
                        <Plus size={15}/> Add
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && <p className="empty">No products found. Try another search.</p>}
        </section>

        <section className="seller-banner">
          <div><span className="eyebrow">GROW WITH AROKA FRESH</span>
            <h2>Are you a local shop owner?</h2>
            <p>Bring your shop online and reach more customers in Hinjilicut.</p>
          </div>
          <button onClick={() => alert('Seller registration will be available in the next development phase.')}>
            Join as Seller <ArrowRight size={17}/>
          </button>
        </section>
      </main>

      <footer>
        <div className="brand">🌿 AROKA <b>FRESH</b></div>
        <p>Your town. Your shops. Your delivery.</p>
        <small>© 2026 Aroka Fresh · Hinjilicut, Odisha 761102</small>
      </footer>

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-panel" onClick={e => e.stopPropagation()}>
            <div className="cart-title">
              <h2><ShoppingBag size={22}/> Your Cart ({count})</h2>
              <button onClick={() => setCartOpen(false)}><X/></button>
            </div>
            {cartItems.length === 0 ? (
              <div className="empty-cart"><span>🛒</span><h3>Your cart is empty</h3><p>Add something fresh to get started.</p></div>
            ) : (
              <>
                {cartItems.map(p => (
                  <div className="cart-item" key={p.id}>
                    <span>{p.emoji}</span>
                    <div><b>{p.name}</b><small>₹{p.price} × {cart[p.id]}</small></div>
                    <div className="quantity">
                      <button onClick={() => changeQty(p.id, -1)}><Minus size={13}/></button>
                      {cart[p.id]}
                      <button onClick={() => changeQty(p.id, 1)}><Plus size={13}/></button>
                    </div>
                  </div>
                ))}
                <div className="cart-total"><span>Subtotal</span><b>₹{total}</b></div>
                <p className="checkout-note">Delivery charge will be calculated at checkout.</p>
                <button className="checkout-btn" onClick={() => alert('Checkout and customer login will be connected in the next phase.')}>
                  Proceed to Checkout · ₹{total}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <button className="mobile-cart" onClick={() => setCartOpen(true)}>
        <ShoppingCart size={18}/> View Cart ({count}) · ₹{total}
      </button>
    </div>
  );
}
