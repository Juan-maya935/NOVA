import React, { useState, useEffect } from 'react';
import { Settings, Sliders, CheckCircle, Cpu, ArrowRight } from 'lucide-react';
import SoundManager from '../utils/sound';

type MissionType = 'aereo' | 'forense' | 'vision' | 'dashboard';

export const MissionConfigurator: React.FC = () => {
  const [missionType, setMissionType] = useState<MissionType>('aereo');
  const [scaleValue, setScaleValue] = useState<number>(10);

  // Computed variables
  const [flightTime, setFlightTime] = useState<number>(0);
  const [resolution, setResolution] = useState<string>('N/A');
  const [gflopsRequired, setGflopsRequired] = useState<number>(0);
  const [sensorRec, setSensorRec] = useState<string>('');

  useEffect(() => {
    // Calculate telemetry based on selection
    if (missionType === 'aereo') {
      setFlightTime(scaleValue * 8); // 8 minutes per hectare
      setResolution(`${(1.2 + scaleValue * 0.05).toFixed(2)} cm/px`);
      setGflopsRequired(scaleValue * 150);
      setSensorRec('RGB 4K + Sensor LiDAR Altitud');
    } else if (missionType === 'forense') {
      setFlightTime(scaleValue * 15); // 15 minutes per scan node
      setResolution('± 2.5 mm de tolerancia');
      setGflopsRequired(scaleValue * 450);
      setSensorRec('Escáner Terrestre + Cámara Termográfica');
    } else if (missionType === 'vision') {
      setFlightTime(scaleValue * 24); // hours of test required
      setResolution('Latencia < 15ms');
      setGflopsRequired(scaleValue * 600);
      setSensorRec('Cámara Óptica Industrial de Alta Frecuencia');
    } else {
      setFlightTime(scaleValue * 5); // hours of build
      setResolution('Refresco en tiempo real (1s)');
      setGflopsRequired(scaleValue * 80);
      setSensorRec('Pipeline IoT de Streaming de Eventos');
    }
  }, [missionType, scaleValue]);

  const handleTransfer = () => {
    SoundManager.playSuccess();
    
    // Format configuration message
    const serviceName = 
      missionType === 'aereo' ? 'Soluciones Aéreas y Geoespaciales' :
      missionType === 'forense' ? 'Recreación y Simulación 3D' :
      missionType === 'vision' ? 'Automatización y Visión Artificial' : 'Desarrollo Digital y Datos';
    
    const scaleUnit = 
      missionType === 'aereo' ? 'Hectáreas' :
      missionType === 'forense' ? 'Nodos de Escaneo' :
      missionType === 'vision' ? 'Puntos de Inspección' : 'Fuentes de Datos';

    const message = `SOLICITUD DE CONFIGURACIÓN TÁCTICA:
------------------------------------------
SERVICIO: ${serviceName}
ESCALA DE MISIÓN: ${scaleValue} ${scaleUnit}
TIEMPO CALCULADO: ${flightTime} Min/Horas
RESOLUCIÓN ESTIMADA: ${resolution}
EQUIPO DE SENSOR RECOMENDADO: ${sensorRec}
------------------------------------------
Favor contactar para análisis detallado de vialibilidad técnica.`;

    // Save in session storage to retrieve in Contact form
    sessionStorage.setItem('nova_config_message', message);
    
    // Dispatch custom event to notify Contact form component
    window.dispatchEvent(new Event('nova_config_transferred'));

    // Smooth scroll to contact section
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="configurador" className="py-24 border-t border-nova-gray-border/60 relative bg-nova-dark/45 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-nova-purple mb-4">
            <Settings className="w-5 h-5 text-nova-purple animate-spin-slow" />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">// SIMULACIÓN DE ESCALA</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight mb-6">
            Configurador de <span className="text-nova-electric">Misión Técnica</span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Calcule las variables técnicas iniciales de su requerimiento. Ajuste la escala del proyecto para verificar la demanda operativa estimada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Controls - Left (7 Cols) */}
          <div className="lg:col-span-7 bg-nova-gray-tech/20 border border-nova-gray-border p-8 rounded-sm tech-corner flex flex-col justify-between space-y-8">
            
            {/* Mission Type Selection */}
            <div className="space-y-4">
              <label className="font-mono text-[9px] text-gray-500 tracking-wider uppercase block">
                // 01. SELECCIONAR TIPO DE SERVICIO
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['aereo', 'forense', 'vision', 'dashboard'] as const).map(type => (
                  <button
                    key={type}
                    onMouseEnter={() => SoundManager.playHover()}
                    onClick={() => {
                      SoundManager.playClick();
                      setMissionType(type);
                      setScaleValue(type === 'aereo' ? 10 : type === 'forense' ? 5 : type === 'vision' ? 4 : 3);
                    }}
                    className={`p-4 border font-mono text-xs rounded-sm text-left flex flex-col justify-between h-20 transition-all ${
                      missionType === type
                        ? 'border-nova-electric bg-nova-electric/5 text-white shadow-[0_0_15px_rgba(0,240,255,0.08)]'
                        : 'border-nova-gray-border/80 text-gray-400 hover:text-white hover:border-nova-purple'
                    }`}
                  >
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block">
                      {type === 'aereo' ? 'AÉREO' : type === 'forense' ? '3D FORENSE' : type === 'vision' ? 'IA & VISIÓN' : 'DATOS & DASHBOARD'}
                    </span>
                    <span className="font-sans font-bold text-sm block">
                      {type === 'aereo' ? 'Fotogrametría Aérea' : type === 'forense' ? 'Reconstrucción 3D' : type === 'vision' ? 'Visión Artificial' : 'Digital y Analytics'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Scale Value */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="font-mono text-[9px] text-gray-500 tracking-wider uppercase">
                  // 02. DEFINIR ESCALA DE PROYECTO
                </label>
                <span className="font-mono text-xs text-nova-electric font-semibold">
                  {scaleValue} {
                    missionType === 'aereo' ? 'Hectáreas (ha)' :
                    missionType === 'forense' ? 'Nodos de Escaneo' :
                    missionType === 'vision' ? 'Puntos de Inspección' : 'Fuentes de Datos'
                  }
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min={1}
                  max={missionType === 'aereo' ? 150 : missionType === 'forense' ? 40 : 25}
                  value={scaleValue}
                  onChange={(e) => setScaleValue(Number(e.target.value))}
                  className="w-full accent-nova-electric h-1 bg-nova-dark border border-nova-gray-border rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between font-mono text-[8px] text-gray-600">
                <span>MIN: 1</span>
                <span>MAX: {missionType === 'aereo' ? '150 Has' : missionType === 'forense' ? '40 Nodos' : '25 Puntos'}</span>
              </div>
            </div>

            {/* Action Trigger */}
            <button
              onClick={handleTransfer}
              onMouseEnter={() => SoundManager.playHover()}
              className="w-full py-4 bg-nova-purple/20 hover:bg-nova-purple/35 border border-nova-purple text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md"
            >
              <span>TRANSFERIR AL FORMULARIO DE CONEXIÓN</span>
              <ArrowRight className="w-4 h-4 text-nova-electric group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Results Telemetry HUD - Right (5 Cols) */}
          <div className="lg:col-span-5 bg-nova-indigo-medium/10 border border-nova-gray-border p-6 rounded-sm tech-corner relative scanline flex flex-col justify-between">
            <div className="border-b border-nova-gray-border/80 pb-3 mb-6 flex items-center justify-between font-mono text-[9px] text-gray-500">
              <span className="flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-nova-electric" />
                <span className="tracking-widest">METRIC_CALCULATOR.dll</span>
              </span>
              <span className="text-nova-purple-glow">// CALC_NOMINAL</span>
            </div>

            {/* Computation Statistics */}
            <div className="space-y-5 flex-grow">
              
              <div className="bg-nova-dark/70 p-4 border border-nova-gray-border/60 rounded-sm">
                <div className="text-gray-500 font-mono text-[8px] uppercase tracking-wider">// DURACIÓN OPERATIVA ESTIMADA</div>
                <div className="text-2xl font-mono text-white font-bold mt-1">
                  {flightTime} {missionType === 'aereo' || missionType === 'forense' ? 'Minutos' : 'Horas'}
                </div>
              </div>

              <div className="bg-nova-dark/70 p-4 border border-nova-gray-border/60 rounded-sm">
                <div className="text-gray-500 font-mono text-[8px] uppercase tracking-wider">// RESOLUCIÓN Y TOLERANCIA</div>
                <div className="text-lg font-sans text-nova-electric font-bold mt-1">
                  {resolution}
                </div>
              </div>

              <div className="bg-nova-dark/70 p-4 border border-nova-gray-border/60 rounded-sm">
                <div className="text-gray-500 font-mono text-[8px] uppercase tracking-wider">// REQUERIMIENTO CÓMPUTO PREDICTIVO</div>
                <div className="text-lg font-mono text-nova-purple-glow font-bold mt-1 flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-nova-purple-glow" />
                  <span>{gflopsRequired} GFLOPS</span>
                </div>
              </div>

              <div className="bg-nova-dark/70 p-4 border border-nova-gray-border/60 rounded-sm">
                <div className="text-gray-500 font-mono text-[8px] uppercase tracking-wider">// RECOMENDACIÓN DE EQUIPO</div>
                <div className="text-xs font-sans text-gray-300 font-light mt-1">
                  {sensorRec}
                </div>
              </div>

            </div>

            {/* Verification Check */}
            <div className="mt-6 border-t border-nova-gray-border/50 pt-4 flex items-center space-x-2 text-[9px] font-mono text-emerald-400">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>CÁLCULO CONCLUIDO // SEÑAL CONFIGURADA CON ÉXITO</span>
            </div>

            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-nova-electric pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-nova-purple pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
};
export default MissionConfigurator;
