import React from 'react';
import { motion } from 'framer-motion';
import { heroSection, operacionalesMetrics } from '../constants/novaData';
import { Terminal, ArrowUpRight, Cpu, Radio } from 'lucide-react';

export const Hero: React.FC = () => {
  // Container variant for staggering children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Item variants for smooth fade-in + slide-up
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  // Metrics variant with delay
  const metricsVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.8, ease: 'easeOut' as const }
    }
  };

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden cyber-grid"
    >
      {/* Deep Spatial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-nova-dark via-transparent to-nova-dark pointer-events-none z-1" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,15,35,0.85)_0%,rgba(5,5,8,0.98)_70%)] pointer-events-none z-1" />
      
      {/* Decorative Technical Crosshairs / Cyber HUD Elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 border-l border-t border-nova-purple/10 pointer-events-none hidden md:block" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border-r border-b border-nova-purple/10 pointer-events-none hidden md:block" />
      
      {/* Decorative Radar Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-nova-purple/5 opacity-5 pointer-events-none hidden lg:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-nova-electric/5 opacity-5 pointer-events-none hidden lg:block" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left / Center Text Column (8 cols in LG) */}
          <motion.div 
            className="lg:col-span-8 space-y-6 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* System Status Tag */}
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center space-x-2 bg-nova-purple/10 border border-nova-purple/30 px-3 py-1 rounded-sm text-xs font-mono text-nova-purple-glow tracking-widest uppercase"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-nova-purple-glow" />
              <span>SISTEMA DE CONTROL ACTIVO</span>
            </motion.div>

            {/* Giant Title with gradient */}
            <motion.h1 
              variants={itemVariants}
              className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white select-none leading-none"
            >
              <span className="relative">
                {heroSection.title}
                {/* Tech glitch line decoration */}
                <span className="absolute -bottom-2 left-0 w-2/3 h-1 bg-gradient-to-r from-nova-purple via-nova-electric to-transparent" />
              </span>
            </motion.h1>

            {/* Subtitle / Tech lines */}
            <motion.h2 
              variants={itemVariants}
              className="text-xl sm:text-2xl font-mono text-nova-electric tracking-wide flex items-center flex-wrap gap-2"
            >
              <Cpu className="w-5 h-5 text-nova-electric" />
              <span>{heroSection.subtitle}</span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed font-sans font-light"
            >
              {heroSection.description}
            </motion.p>

            {/* CTA Buttons in Console Style */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <a 
                href="#contacto" 
                className="group relative px-6 py-3 bg-nova-purple/10 border border-nova-purple text-white font-mono text-sm tracking-wider uppercase rounded-sm hover:bg-nova-purple/20 transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(99,85,217,0.15)] hover:shadow-[0_0_25px_rgba(99,85,217,0.35)]"
              >
                {/* Neon-like border corners */}
                <span className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t-2 border-l-2 border-nova-electric pointer-events-none group-hover:w-3 group-hover:h-3 transition-all" />
                <span className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b-2 border-r-2 border-nova-electric pointer-events-none group-hover:w-3 group-hover:h-3 transition-all" />
                
                <Terminal className="w-4 h-4 text-nova-electric" />
                <span>ESTABLECER CONTACTO</span>
                <ArrowUpRight className="w-4 h-4 text-nova-purple-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a 
                href="#servicios" 
                className="px-6 py-3 border border-nova-gray-border hover:border-nova-purple/50 text-gray-400 hover:text-white font-mono text-sm tracking-wider uppercase rounded-sm transition-all duration-300 text-center flex items-center justify-center space-x-2"
              >
                <span>VER SERVICIOS</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Decorative HUD / Console Panel (4 cols in LG) */}
          <motion.div 
            className="lg:col-span-4 hidden lg:flex flex-col justify-center items-center relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          >
            <div className="w-full max-w-sm bg-nova-indigo-deep/40 border border-nova-gray-border p-6 rounded-sm tech-corner relative scanline shadow-xl shadow-black/80">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-nova-gray-border/80 pb-3 mb-4 font-mono text-[10px] text-gray-400">
                <span className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-nova-electric animate-pulse" />
                  <span className="tracking-widest">DIAGNOSTICO_M24.sys</span>
                </span>
                <span className="text-nova-purple-glow">VER 4.10.8</span>
              </div>

              {/* Panel Details */}
              <div className="space-y-4 font-mono text-xs text-left">
                <div className="bg-nova-dark/80 p-3 border border-nova-gray-border/50 rounded-sm">
                  <div className="text-nova-electric text-[10px] uppercase mb-1">// TELEMETRÍA GEOESPACIAL</div>
                  <div className="text-gray-400 font-light">
                    Sistemas LIDAR + Fotogrametría Aérea enlazados. Fusión de nube de puntos activa.
                  </div>
                </div>

                <div className="bg-nova-dark/80 p-3 border border-nova-gray-border/50 rounded-sm">
                  <div className="text-nova-purple-glow text-[10px] uppercase mb-1">// PROCESAMIENTO ANALÍTICO</div>
                  <div className="text-gray-400 font-light">
                    Predicción de fallas en infraestructura mediante visión artificial avanzada.
                  </div>
                </div>

                {/* Cyberpunk progress bars */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>ANÁLISIS DE RED</span>
                    <span className="text-nova-electric">94.8%</span>
                  </div>
                  <div className="w-full h-1 bg-nova-dark border border-nova-gray-border/60 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-nova-purple to-nova-electric w-[94.8%]" />
                  </div>

                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>RENDIMIENTO DE PROCESO</span>
                    <span className="text-nova-purple-glow">82.1%</span>
                  </div>
                  <div className="w-full h-1 bg-nova-dark border border-nova-gray-border/60 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-nova-purple to-nova-electric w-[82.1%]" />
                  </div>
                </div>
              </div>

              {/* Tech corner accents */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-nova-electric pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-nova-purple pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Metrics Grid */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 mt-12 lg:mt-0"
        variants={metricsVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 border border-nova-gray-border divide-y md:divide-y-0 md:divide-x divide-nova-gray-border bg-nova-dark/60 backdrop-blur-xs rounded-sm overflow-hidden shadow-2xl">
          {operacionalesMetrics.map((metric, idx) => (
            <div 
              key={idx} 
              className="p-6 sm:p-8 flex flex-col justify-center items-start text-left relative group hover:bg-nova-indigo-deep/10 transition-colors"
            >
              {/* Dynamic light element on metrics card hover */}
              <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-nova-electric transition-all duration-300" />
              
              <div className="flex items-baseline space-x-2">
                <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text">
                  {metric.value}
                </span>
                <span className="text-nova-electric font-mono text-xs">// ACTIVE</span>
              </div>
              
              <div className="font-sans font-medium text-sm text-gray-200 mt-2 tracking-wide">
                {metric.label}
              </div>
              
              {metric.description && (
                <div className="font-mono text-[10px] text-gray-500 mt-1 font-light tracking-wide">
                  {metric.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
