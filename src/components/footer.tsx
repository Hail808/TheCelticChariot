import '../styles/footer.css';  // Import the CSS file for the Footer

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrappers'>
          <div className='footer-link-items'>
            <h2>About</h2>
            {/* Link to about page */}
          </div>
          <div className='footer-link-items'>
            <h2>Test</h2>
            {/* Link to test */}
          </div>
        </div>
        <div className='footer-link-wrappers'>
          <div className='footer-link-items'>
            <h2>Test</h2>
            {/* link to test */}
          </div>
          <div className='footer-link-items'>
            <h2>Test</h2>
            {/* link to test */}
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            {/* Footer logo */}
          </div>
          <small className="website-rights">The Celtic Chariot © 2025</small>
          <div className="social-icons">
            {/* Put social media icons here with URL link redirection */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;