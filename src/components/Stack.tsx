import React from 'react';
import { motion } from 'framer-motion';
import { techStack } from '../constants/novaData';
import { Layers, Terminal, Activity } from 'lucide-react';

export const Stack: React.FC = () => {
  // Container variant to simulate system boot seq
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Item variants for each modules loading
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="stack" className="py-24 border-t border-nova-gray-border/60 relative overflow-hidden bg-nova-dark">
      {/* Grid overlay specifically for Stack section to enhance HUD feel */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-nova-dark via-transparent to-nova-dark pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Console Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-nova-gray-border/80 pb-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-nova-purple mb-3">
              <Layers className="w-4 h-4 text-nova-purple animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                // SEGURIDAD & INFRAESTRUCTURA DE CÓMPUTO
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
              Ecosistema Tecnológico <span className="text-nova-electric">Integrado</span>
            </h2>
          </div>

          {/* Glowing system tag */}
          <div className="flex items-center space-x-3 bg-nova-indigo-deep/60 border border-nova-purple/40 px-4 py-2 rounded-sm shadow-[0_0_15px_rgba(99,85,217,0.1)]">
            <Activity className="w-4 h-4 text-nova-electric animate-pulse" />
            <span className="font-mono text-xs text-nova-electric tracking-widest font-medium drop-shadow-[0_0_6px_#00f0ff]">
              [ SISTEMA.STACK_DE_INGENIERÍA ]
            </span>
          </div>
        </div>

        {/* Informative summary box */}
        <div className="mb-10 p-5 bg-nova-indigo-deep/20 border-l-2 border-nova-purple max-w-3xl rounded-r-sm">
          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            Nuestros procesos de análisis geoespacial, simulación pericial e inteligencia artificial se ejecutan sobre un stack robusto de última generación, asegurando eficiencia operativa y alta disponibilidad en cada despliegue.
          </p>
        </div>

        {/* Staggered Grid of Tech modules */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {techStack.map((tech, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-4 bg-nova-indigo-medium/20 border border-nova-purple/20 rounded-sm hover:border-nova-electric hover:bg-nova-indigo-deep/30 transition-all duration-300 group tech-corner flex flex-col justify-between h-28 relative shadow-lg shadow-black/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
            >
              {/* Top Bar inside card */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] text-gray-500 tracking-wider">
                  MOD_0{idx + 1} // SYS_LOADED
                </span>
                
                {/* Active Indicator LED */}
                <div className="flex items-center space-x-1.5 bg-nova-dark/60 px-2 py-0.5 border border-nova-gray-border/60 rounded-[2px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[7px] text-emerald-400 font-semibold tracking-widest">
                    READY
                  </span>
                </div>
              </div>

              {/* Tag name */}
              <div className="text-base font-sans font-bold text-gray-200 group-hover:text-white transition-colors">
                {tech}
              </div>

              {/* Status footer inside card */}
              <div className="flex items-center justify-between border-t border-nova-gray-border/40 pt-2 text-[8px] font-mono text-gray-500">
                <span className="flex items-center space-x-1">
                  <Terminal className="w-2.5 h-2.5 text-nova-purple" />
                  <span>PROCESS_OK</span>
                </span>
                <span className="text-nova-electric/80 font-semibold">100% HEALTH</span>
              </div>

              {/* Technical corner lines decoration on hover */}
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-transparent group-hover:border-nova-electric transition-colors pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-transparent group-hover:border-nova-purple transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
