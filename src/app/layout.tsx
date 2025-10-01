import '../styles/global.css';  // Import the global CSS file
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { ReactNode } from 'react';
import { auth } from '../../lib/auth';
import { headers } from 'next/headers';

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return (
    <html>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lalezar&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="App">
          <Navbar session={session} />
          <main className="content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default Layout;