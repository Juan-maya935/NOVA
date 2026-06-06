import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../constants/novaData';
import type { ProjectBlock } from '../constants/novaData';
import { Rocket, Terminal, Pin, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

export const Proyectos: React.FC = () => {
  // Animación del contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // Animación para cada tarjeta
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="proyectos" className="py-24 border-t border-nova-gray-border/60 relative overflow-hidden bg-nova-dark">
      {/* Background ambient elements */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,85,217,0.06)_0%,transparent_65%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-nova-purple mb-4">
            <Rocket className="w-5 h-5 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">
              // REGISTRO DE DESPLIEGUE OPERACIONAL
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight mb-6">
            Bitácora de <span className="text-nova-electric">Soluciones Desplegadas</span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Consola de control que documenta la ejecución de nuestras misiones tecnológicas y gemelos digitales desplegados para optimizar el rendimiento industrial.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project: ProjectBlock) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group border border-nova-gray-border bg-nova-gray-tech/10 hover:border-nova-electric rounded-sm overflow-hidden transition-all duration-300 relative flex flex-col justify-between h-[310px] shadow-xl hover:shadow-[0_10px_30px_rgba(0,240,255,0.06)]"
            >
              {/* Internal decorative terminal scanline overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nova-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />

              {/* Card Header (HUD Status Bar) */}
              <div className="bg-nova-indigo-deep/55 px-5 py-3 border-b border-nova-gray-border/80 flex items-center justify-between font-mono text-[10px]">
                <div className="flex items-center space-x-2 text-nova-electric">
                  <span className="w-1.5 h-1.5 rounded-full bg-nova-electric animate-pulse" />
                  <span className="font-semibold tracking-wider">{project.id}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Pin className="w-3 h-3 text-nova-purple" />
                    <span>LOC: {project.location}</span>
                  </span>

                  <span className={`flex items-center space-x-1 px-2 py-0.5 rounded-[2px] border ${
                    project.status === 'COMPLETED'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}>
                    {project.status === 'COMPLETED' ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : (
                      <AlertCircle className="w-2.5 h-2.5 animate-pulse" />
                    )}
                    <span className="font-bold tracking-widest text-[8px]">{project.status}</span>
                  </span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl font-sans font-bold text-white group-hover:text-nova-electric transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags & Mission Action */}
                <div className="border-t border-nova-gray-border/40 pt-4 flex items-center justify-between flex-wrap gap-3 mt-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techTags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-nova-dark/80 border border-nova-gray-border/80 text-gray-400 rounded-sm font-mono text-[8px] tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link (Faux System Console Log View) */}
                  <div className="flex items-center space-x-1 font-mono text-[10px] text-nova-purple-glow group-hover:text-nova-electric transition-colors cursor-pointer select-none">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>SYS_LOG</span>
                    <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5" />
                  </div>
                </div>
              </div>

              {/* HUD corner lines */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-nova-electric transition-colors pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-transparent group-hover:border-nova-purple transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
