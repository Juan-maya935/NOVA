import React, { useState, useEffect } from 'react';
import { navbarLinks } from '../constants/novaData';
import { ShieldCheck, Cpu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('#inicio');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [systemPing, setSystemPing] = useState<number>(45);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Simulate telemetry ping fluctuations
    const pingInterval = setInterval(() => {
      setSystemPing(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const next = prev + delta;
        return next > 60 ? 58 : next < 20 ? 25 : next;
      });
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-nova-dark/80 backdrop-blur-md border-nova-purple/20 py-3 shadow-lg shadow-nova-purple/5' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Side: Brand Logo and Title */}
        <a 
          href="#inicio" 
          className="flex items-center space-x-3 group"
          onClick={() => setActiveSection('#inicio')}
        >
          <div className="relative flex items-center justify-center w-9 h-9 border border-nova-purple/50 bg-nova-indigo-deep/50 rounded-sm tech-corner overflow-hidden group-hover:border-nova-electric transition-colors">
            <Cpu className="w-5 h-5 text-nova-purple group-hover:text-nova-electric transition-colors animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-tr from-nova-purple/10 to-nova-electric/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2">
            <span className="font-sans font-bold text-2xl tracking-wider bg-gradient-to-r from-nova-purple-glow via-nova-purple to-nova-electric bg-clip-text text-transparent group-hover:brightness-110 transition-all">
              NOVA
            </span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-widest text-nova-electric/70 uppercase">
              // Ingeniería e Innovación
            </span>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-nova-indigo-deep/30 border border-nova-gray-border/60 p-1 rounded-sm backdrop-blur-sm">
          {navbarLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(link.href)}
                className={`relative px-4 py-1.5 font-mono text-xs tracking-wider uppercase transition-all duration-300 rounded-[2px] ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-nova-electric'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-nova-purple/20 border-b border-nova-electric rounded-[2px]" />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Side: Operational System Status */}
        <div className="flex items-center space-x-3 bg-nova-gray-tech/40 border border-nova-gray-border/80 px-3 py-1.5 rounded-sm select-none">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <div className="flex flex-col text-[8px] font-mono leading-tight">
            <div className="text-emerald-400 flex items-center space-x-1 font-semibold">
              <ShieldCheck className="w-2.5 h-2.5 inline" />
              <span>SISTEMA OPERATIVO // ONLINE</span>
            </div>
            <div className="text-gray-500 tracking-wider">
              PING: <span className="text-nova-electric">{systemPing}ms</span> // SECURE_CON
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual scanning line underneath the navbar in active mode */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-nova-electric/40 to-transparent animate-pulse" />
      )}
    </header>
  );
};
