import '../styles/global.css';  // Import the global CSS file
import Navbar from '../components/navbar';
import Footer from '../components/footer';

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main className="content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;