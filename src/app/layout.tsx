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
      <body>
        <Navbar session={session} />
        <main className="content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;