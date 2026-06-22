import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../constants/novaData';
import type { ServiceBlock } from '../constants/novaData';
import { Database, Plane, Box, Cpu, Briefcase, Activity, CheckCircle } from 'lucide-react';
import { DataSimulation } from './DataSimulation';
import { DroneSimulation } from './DroneSimulation';
import { Interactive3DViewer } from './Interactive3DViewer';
import { VisionSimulation } from './VisionSimulation';

// Map icon name from constant to Lucide component
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'database':
      return <Database className="w-8 h-8 text-nova-purple-glow" />;
    case 'plane':
      return <Plane className="w-8 h-8 text-nova-electric" />;
    case 'box':
      return <Box className="w-8 h-8 text-nova-purple-glow" />;
    case 'cpu':
      return <Cpu className="w-8 h-8 text-nova-electric" />;
    default:
      return <Briefcase className="w-8 h-8 text-nova-purple" />;
  }
};

export const Servicios: React.FC = () => {
  // Stagger animation for services grid entrance
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="servicios" className="py-24 border-t border-nova-gray-border/60 relative overflow-hidden bg-nova-indigo-deep/10">
      {/* Background abstract lights */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] bg-nova-purple/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-nova-electric/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-nova-purple mb-4">
            <Briefcase className="w-5 h-5 text-nova-purple animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">// DIVISIONES OPERATIVAS</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight mb-6">
            Servicios <span className="text-nova-electric">Integrales de Ingeniería</span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Diseñamos soluciones optimizadas para la industria moderna, fusionando analítica predictiva, automatizaciones ciberfísicas y modelado 3D de alta fidelidad.
          </p>
        </div>

        {/* Services Grid (2 Columns on tablet/desktop) */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service: ServiceBlock) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="p-8 bg-nova-gray-tech/15 border border-nova-gray-border hover:border-nova-electric/50 rounded-sm tech-corner relative group transition-all duration-500 hover:bg-nova-indigo-deep/30 shadow-xl hover:shadow-[0_15px_40px_rgba(0,240,255,0.08)] overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Animated hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-nova-purple/5 via-transparent to-nova-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Card Header Info */}
                <div className="flex items-center justify-between border-b border-nova-gray-border/50 pb-4 mb-6">
                  <span className="font-mono text-xs text-nova-purple-glow font-semibold tracking-wider">
                    // {service.id}
                  </span>
                  
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest flex items-center space-x-1">
                    <Activity className="w-3 h-3 text-nova-electric" />
                    <span>MOD_DEPLOYED</span>
                  </span>
                </div>

                {/* Icon & Title Row */}
                <div className="flex items-start space-x-5 mb-6">
                  <div className="p-3 bg-nova-dark/90 border border-nova-gray-border group-hover:border-nova-electric/60 transition-colors rounded-sm shadow-md flex items-center justify-center">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-white group-hover:text-nova-electric transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-mono text-[10px] text-nova-purple-glow mt-1 tracking-wider">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Main Description */}
                <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>

                {/* Interactive Simulation element */}
                <div className="mb-6 w-full rounded-sm overflow-hidden">
                  {service.id === 'SOL_01' && <DataSimulation />}
                  {service.id === 'SOL_02' && <DroneSimulation />}
                  {service.id === 'SOL_03' && <Interactive3DViewer />}
                  {service.id === 'SOL_04' && <VisionSimulation />}
                </div>
              </div>

              {/* Key Benefit Banner */}
              <div className="p-4 bg-nova-dark/60 border border-nova-gray-border/60 rounded-sm flex items-start space-x-3 group-hover:border-nova-purple/40 transition-colors">
                <CheckCircle className="w-4 h-4 text-nova-electric mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-mono text-[9px] text-gray-500 block uppercase tracking-wider">// VENTAJA CLAVE</span>
                  <span className="text-xs text-gray-300 font-sans font-medium">
                    {service.benefit}
                  </span>
                </div>
              </div>

              {/* Corner tech highlights */}
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-transparent group-hover:border-nova-electric transition-colors pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-transparent group-hover:border-nova-purple transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
