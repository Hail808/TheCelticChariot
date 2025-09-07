import './App.css';
import Navbar from './components/navbar.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home.tsx'
import Login from './components/pages/login.tsx'
import ForgotPassword from './components/pages/forgot_password.tsx';
import Footer from './components/footer.tsx';
import About from './components/pages/about_me.tsx';
import Cart from './components/pages/cart.tsx'; 
import Review from './components/pages/reviews.tsx';
import ProductPage from './components/pages/product_page.tsx';
import OrdersPage from './components/pages/order.tsx';

function App() {
  return (
    <div className="App"> 
      <Router>
        <Navbar />
        {/* Content wrapper to expand and push footer down */}
        <main className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about_me' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reviews" element={<Review />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product_page" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

