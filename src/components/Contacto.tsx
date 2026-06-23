import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Terminal, Send, Radio, MessageSquare, MapPin, CheckCircle, ShieldAlert } from 'lucide-react';
import SoundManager from '../utils/sound';

export const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'SYS: Terminal de enlace iniciada.',
    'SYS: Canal de comunicación seguro establecido.',
    'SYS: Esperando entrada de señal del usuario...'
  ]);

  const addLog = (newLog: string) => {
    setConsoleLogs(prev => [...prev.slice(-4), newLog]);
  };

  useEffect(() => {
    const handleConfigTransferred = () => {
      const configMessage = sessionStorage.getItem('nova_config_message');
      if (configMessage) {
        setFormData(prev => ({ ...prev, message: configMessage }));
        addLog('SYS: Búfer de transmisión cargado con parámetros de misión.');
      }
    };

    window.addEventListener('nova_config_transferred', handleConfigTransferred);
    return () => window.removeEventListener('nova_config_transferred', handleConfigTransferred);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Add dynamic feedback to the terminal screen
    if (value.length > 0 && value.length % 5 === 0) {
      addLog(`INPUT: Recibiendo datos para campo [${name.toUpperCase()}]...`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      SoundManager.playClick();
      addLog('WARN: Envío abortado. Todos los campos son requeridos.');
      setSubmitStatus('error');
      return;
    }

    SoundManager.playClick();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    addLog('SYS: Iniciando codificación de paquete de datos...');

    setTimeout(() => {
      addLog('SYS: Enviando señal hacia la central (Cali, Colombia)...');
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        SoundManager.playSuccess();
        addLog('SYS: Señal transmitida con éxito. Código 200 OK.');
        setFormData({ name: '', email: '', message: '' });
        // Clean session storage
        sessionStorage.removeItem('nova_config_message');
      }, 1500);
    }, 1000);
  };

  const triggerWhatsApp = () => {
    SoundManager.playClick();
    addLog('SYS: Redireccionando a protocolo WHATSAPP...');
    // Simulated WhatsApp API link (replace with real business number if needed)
    window.open('https://wa.me/573000000000?text=Hola%20NOVA,%20quiero%20establecer%20contacto%20para%20un%20proyecto.', '_blank');
  };

  return (
    <section id="contacto" className="py-24 border-t border-nova-gray-border/60 relative overflow-hidden bg-nova-dark">
      {/* Background Spatial Deep Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,85,217,0.04)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-nova-indigo-deep/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-nova-purple mb-4">
            <Radio className="w-5 h-5 animate-pulse text-nova-purple-glow" />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">
              // CANAL DE COMUNICACIÓN
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight mb-6">
            Establecer <span className="text-nova-electric">Enlace de Señal</span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Señal abierta — Hablemos de su próximo proyecto de ingeniería, reconstrucción geoespacial o desarrollo tecnológico a la medida.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Diagnostics and Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Terminal Console Logs */}
            <div className="bg-nova-indigo-deep/40 border border-nova-gray-border p-5 rounded-sm scanline">
              <div className="flex items-center justify-between border-b border-nova-gray-border/60 pb-2 mb-4 font-mono text-[9px] text-gray-500">
                <span className="flex items-center space-x-1">
                  <Terminal className="w-3.5 h-3.5 text-nova-electric" />
                  <span>[ CONEXIÓN.LOG ]</span>
                </span>
                <span>STATUS: ACTIVE</span>
              </div>

              <div className="space-y-2 font-mono text-[11px] min-h-[110px] flex flex-col justify-end text-left">
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className={`leading-relaxed ${
                    log.startsWith('INPUT') ? 'text-nova-electric' :
                    log.startsWith('WARN') ? 'text-rose-400' :
                    log.startsWith('SYS') && log.includes('éxito') ? 'text-emerald-400' : 'text-gray-400'
                  }`}>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* WhatsApp Card */}
              <div 
                onClick={triggerWhatsApp}
                onMouseEnter={() => SoundManager.playHover()}
                className="p-5 bg-nova-gray-tech/20 border border-nova-gray-border hover:border-emerald-500/50 rounded-sm tech-corner cursor-pointer group transition-all duration-300 hover:bg-emerald-500/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span className="font-mono text-[8px] text-gray-500">// RAPID_COM</span>
                </div>
                <div className="font-sans font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                  WhatsApp Business
                </div>
                <div className="font-mono text-[9px] text-gray-400 mt-1">
                  Conexión directa en tiempo real.
                </div>
              </div>

              {/* Email Card */}
              <a 
                href="mailto:contacto@novaservicios.co"
                onClick={() => {
                  SoundManager.playClick();
                  addLog('SYS: Abriendo cliente de correo predeterminado...');
                }}
                onMouseEnter={() => SoundManager.playHover()}
                className="p-5 bg-nova-gray-tech/20 border border-nova-gray-border hover:border-nova-electric/50 rounded-sm tech-corner cursor-pointer group transition-all duration-300 hover:bg-nova-electric/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <Mail className="w-5 h-5 text-nova-electric" />
                  <span className="font-mono text-[8px] text-gray-500">// SECURE_MAIL</span>
                </div>
                <div className="font-sans font-bold text-sm text-white group-hover:text-nova-electric transition-colors">
                  contacto@novaservicios.co
                </div>
                <div className="font-mono text-[9px] text-gray-400 mt-1">
                  Envío formal de requerimientos.
                </div>
              </a>
            </div>

            {/* Location Technical Box */}
            <div className="p-4 bg-nova-gray-tech/30 border border-nova-gray-border rounded-sm flex items-center space-x-4">
              <div className="p-2 bg-nova-dark/95 border border-nova-gray-border rounded-sm">
                <MapPin className="w-5 h-5 text-nova-purple-glow" />
              </div>
              <div className="font-mono text-xs text-gray-400">
                <div className="text-[9px] text-gray-500">// ESTACIÓN CENTRAL</div>
                <div>UBICACIÓN: <span className="text-white">Cali, Colombia</span></div>
                <div>TELEMETRÍA LOCALIZADA // LAT_AM</div>
              </div>
            </div>

          </div>

          {/* Right Side: Secure Terminal Form (7 Cols) */}
          <div className="lg:col-span-7 bg-nova-indigo-medium/10 border border-nova-gray-border p-8 rounded-sm tech-corner relative shadow-2xl">
            <div className="text-nova-electric font-mono text-xs mb-6 uppercase tracking-wider flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nova-electric animate-ping" />
              <span>TERMINAL DE TRANSMISIÓN // INGENIERÍA NOVA</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2 text-left">
                  <label className="font-mono text-[9px] text-gray-500 tracking-wider">
                    // 01. NOMBRE O ENTIDAD
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Ing. Carlos Pérez"
                    className="w-full bg-nova-dark/90 border border-nova-gray-border/80 focus:border-nova-electric rounded-sm px-4 py-3 font-mono text-xs text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="font-mono text-[9px] text-gray-500 tracking-wider">
                    // 02. CORREO ELECTRÓNICO
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ej. carlos@empresa.com"
                    className="w-full bg-nova-dark/90 border border-nova-gray-border/80 focus:border-nova-electric rounded-sm px-4 py-3 font-mono text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="font-mono text-[9px] text-gray-500 tracking-wider">
                  // 03. REQUERIMIENTO TÉCNICO O DETALLE DEL PROYECTO
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Describa el alcance técnico del proyecto o su necesidad industrial..."
                  className="w-full bg-nova-dark/90 border border-nova-gray-border/80 focus:border-nova-electric rounded-sm px-4 py-3 font-mono text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => SoundManager.playHover()}
                className="w-full py-4 bg-nova-purple/20 hover:bg-nova-purple/35 border border-nova-purple text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-nova-purple/15 active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
                    <span>ENVIANDO SEÑAL ...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-nova-electric group-hover:translate-x-1 transition-transform" />
                    <span>ENVIAR SEÑAL // ESTABLECER CONTACTO</span>
                  </>
                )}
              </button>
            </form>

            {/* Form Response Overlays */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-nova-dark/95 flex flex-col items-center justify-center p-6 text-center z-20"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-400 animate-bounce mb-4" />
                  <h3 className="text-xl font-sans font-bold text-white mb-2">Transmisión Exitosa</h3>
                  <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
                    Hemos codificado su requerimiento. Nuestro equipo de ingeniería establecerá enlace de retorno a la brevedad.
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="px-5 py-2 border border-nova-gray-border text-gray-300 font-mono text-xs uppercase tracking-wider rounded-sm hover:border-nova-purple transition-all"
                  >
                    CERRAR TERMINAL
                  </button>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-nova-dark/95 flex flex-col items-center justify-center p-6 text-center z-20"
                >
                  <ShieldAlert className="w-16 h-16 text-rose-500 animate-pulse mb-4" />
                  <h3 className="text-xl font-sans font-bold text-white mb-2">ERROR DE DATOS</h3>
                  <p className="text-rose-400 text-sm max-w-sm mb-6 leading-relaxed font-mono">
                    ERROR: 400 BAD_REQUEST. Los campos obligatorios se encuentran vacíos o no válidos.
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="px-5 py-2 border border-rose-500/30 text-rose-400 bg-rose-500/5 font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-rose-500/10 transition-all"
                  >
                    REINTENTAR ENLACE
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner Tech Highlights */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-nova-electric pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-nova-purple pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
