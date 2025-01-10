// src/components/Layout/Layout.tsx
import React from "react";
import Navbar from "./Navbar";  // Assuming you have a Navbar component
import Sidebar from "./Sidebar";  // Assuming you have a Sidebar component
import Footer from "./Footer";  // Assuming you have a Footer component

interface LayoutProps {
  children: React.ReactNode;  // Allow dynamic content to be rendered inside the layout
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
