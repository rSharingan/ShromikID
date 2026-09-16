import React from 'react';
import { Navbar, Footer } from '../common';

/**
 * PublicLayout - for public pages
 */
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
