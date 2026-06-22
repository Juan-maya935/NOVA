import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stack } from './components/Stack';
import { Servicios } from './components/Servicios';
import { Proyectos } from './components/Proyectos';
import { Contacto } from './components/Contacto';
import './App.css';
import logoImg from './assets/logo.png';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-nova-dark text-gray-300 relative select-none">
      {/* Background ambient lighting effects */}
      <div className="absolute top-[15%] left-[5%] w-80 h-80 bg-nova-purple/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] right-[5%] w-[450px] h-[450px] bg-nova-electric/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-nova-purple/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Floating Header */}
      <Navbar />

      {/* Hero Welcome Panel */}
      <Hero />

      {/* Main Container for scroll sections */}
      <main className="relative z-10">
        {/* Sleek section dividers */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-nova-purple/25 to-transparent w-full" />
        
        {/* Technology Stack Grid */}
        <Stack />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-nova-electric/20 to-transparent w-full" />

        {/* Services Showcase */}
        <Servicios />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-nova-purple/20 to-transparent w-full" />

        {/* Project logs Showcase */}
        <Proyectos />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-nova-electric/25 to-transparent w-full" />

        {/* Contact form system */}
        <Contacto />
      </main>

      {/* Control center bottom bar footer */}
      <footer className="py-8 border-t border-nova-gray-border/60 bg-nova-dark/95 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between font-mono text-[9px] text-gray-500 tracking-wider">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white/95 rounded-sm overflow-hidden p-0.5 flex items-center justify-center border border-nova-purple/30">
              <img src={logoImg} alt="NOVA Logo" className="w-full h-full object-contain" />
            </div>
            <span>NOVA INGENIERÍA & SERVICIOS INTEGRALES © {new Date().getFullYear()}</span>
          </div>
          <div className="mt-4 md:mt-0">
            <span>TERMINAL STATUS: DEPLOYED_STABLE // BUILD_2026.06</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
