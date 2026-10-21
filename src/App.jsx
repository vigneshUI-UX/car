import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#050505' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Home />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
}