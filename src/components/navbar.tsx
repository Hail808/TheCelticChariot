import '../styles/navbar.css';  // Import the CSS file for the Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="logo.png" alt="The Celtic Chariot" />
        The Celtic Chariot
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/">Catalogue</a>
        <a href="/">Reviews</a>
        <a href="/about_me">About Me</a>
        <a href="/login">Sign in</a>
        <a className="cart" href="/cart">
          <img src="cart.png" alt="cart" width={30} height={30} />Cart
        </a>
      </div>
    </nav>
  );
};

export default Navbar;