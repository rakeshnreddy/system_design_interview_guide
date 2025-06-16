import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    // Uses body styles from global.css for base background/text
    <div className="flex h-screen font-sans">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
export default Layout;
