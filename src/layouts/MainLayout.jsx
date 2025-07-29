// src/layouts/MainLayout.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Navbar />
      <main className="min-h-[80vh] py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
