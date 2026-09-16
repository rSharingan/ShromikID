import React, { useState } from 'react';
import { Navbar, Footer } from '../common';
import { Menu, X } from 'lucide-react';

/**
 * EmployerLayout - for employer dashboard pages
 */
const EmployerLayout = ({ children, sidebarItems }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-4 space-y-2 overflow-y-auto h-full">
            {sidebarItems && sidebarItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${item.active 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:min-h-[calc(100vh-4rem)]">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed bottom-6 right-6 z-30 p-3 bg-primary-600 text-white rounded-full shadow-lg"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Backdrop for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default EmployerLayout;
