import React, { useState } from 'react';
import { Terminal, Shield, ChevronRight } from 'lucide-react';
import SoundManager from '../utils/sound';

interface CommandOption {
  cmd: string;
  label: string;
  response: string[];
}

export const FaqTerminal: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'SYS: NOVA Diagnostic FAQ Terminal loaded.',
    'SYS: Escriba o seleccione un comando para iniciar diagnóstico...',
    'SYS: Ingrese "/ayuda" para desplegar comandos.'
  ]);
  const [userInput, setUserInput] = useState<string>('');

  const commands: CommandOption[] = [
    {
      cmd: '/ayuda',
      label: 'Listar Comandos',
      response: [
        '--- COMANDOS DISPONIBLES ---',
        '/cobertura   - Rango geográfico de operación.',
        '/precision   - Tolerancia y precisión métrica.',
        '/drones      - Flota y regulaciones civiles.',
        '/seguridad   - Confidencialidad y protección de datos.',
        '/limpiar     - Limpiar pantalla de consola.'
      ]
    },
    {
      cmd: '/cobertura',
      label: 'Cobertura Geográfica',
      response: [
        'SYS: Consultando base de geolocalización...',
        'OK: Cobertura principal establecida en Colombia.',
        'INFO: Coordinamos logística y vuelos nacionales desde Cali.',
        'INFO: Operaciones aéreas sujetas a viabilidad meteorológica.'
      ]
    },
    {
      cmd: '/precision',
      label: 'Precisión y Tolerancia',
      response: [
        'SYS: Diagnóstico de hardware concluido.',
        'PRECISIÓN AÉREA: LiDAR GSD < 1.5 cm/píxel.',
        'PRECISIÓN FORENSE: Tolerancia física de ± 2mm.',
        'INFO: Datos exportables a formatos CAD, GIS y nube de puntos (LAS/LAZ).'
      ]
    },
    {
      cmd: '/drones',
      label: 'Flota y Regulaciones',
      response: [
        'SYS: Conectando con bases de Aeronáutica Civil...',
        'REGULACIÓN: Pilotos certificados ante Aerocivil.',
        'INFRAESTRUCTURA: Drones profesionales de alto cilindraje y autonomía.',
        'POLÍTICA: Seguros de responsabilidad civil extracontractual vigentes.'
      ]
    },
    {
      cmd: '/seguridad',
      label: 'Seguridad y Datos',
      response: [
        'SYS: Iniciando análisis de protocolo de datos...',
        'CONFIDENCIALIDAD: Firma de acuerdos NDA garantizados.',
        'PROCESAMIENTO: Almacenamiento local seguro de nubes de puntos.',
        'INFO: No compartimos telemetría ni gemelos digitales sin autorización.'
      ]
    }
  ];

  const handleCommandClick = (cmdOption: CommandOption) => {
    SoundManager.playClick();
    
    // Add command to history
    setTerminalHistory(prev => {
      let nextHistory = [...prev, `USER: ${cmdOption.cmd}`];
      
      if (cmdOption.cmd === '/limpiar') {
        return ['SYS: Consola vaciada.', 'SYS: Esperando entrada de señal...'];
      }
      
      return [...nextHistory, ...cmdOption.response];
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    SoundManager.playClick();
    const cleanInput = userInput.trim().toLowerCase();
    const matchedCmd = commands.find(c => c.cmd === cleanInput);

    setTerminalHistory(prev => {
      let nextHistory = [...prev, `USER: ${userInput}`];
      
      if (cleanInput === '/limpiar') {
        setUserInput('');
        return ['SYS: Consola vaciada.', 'SYS: Esperando entrada de señal...'];
      }

      if (matchedCmd) {
        return [...nextHistory, ...matchedCmd.response];
      } else {
        return [
          ...nextHistory,
          `ERR: Comando "${userInput}" no reconocido.`,
          'SYS: Escriba "/ayuda" para desplegar comandos disponibles.'
        ];
      }
    });

    setUserInput('');
  };

  return (
    <section id="soporte-faq" className="py-24 border-t border-nova-gray-border/60 bg-nova-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,85,217,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-nova-purple mb-4">
            <Shield className="w-5 h-5 text-nova-purple animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">// SISTEMA DE RESOLUCIÓN DE DIAGNÓSTICOS</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight mb-6">
            Consola de <span className="text-nova-electric">Consultas Frecuentes</span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Ejecute comandos de diagnóstico en nuestra terminal de soporte para responder dudas comunes sobre cobertura, precisión y políticas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Quick Commands Menu - Left (4 Cols) */}
          <div className="lg:col-span-4 bg-nova-gray-tech/20 border border-nova-gray-border p-6 rounded-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <label className="font-mono text-[9px] text-gray-500 tracking-wider uppercase block border-b border-nova-gray-border pb-2 mb-4">
                // DIAGNOSTIC_COMMANDS.sys
              </label>

              {commands.map(cmdOption => (
                <button
                  key={cmdOption.cmd}
                  onMouseEnter={() => SoundManager.playHover()}
                  onClick={() => handleCommandClick(cmdOption)}
                  className="w-full p-3 bg-nova-dark/80 border border-nova-gray-border/60 hover:border-nova-electric hover:bg-nova-indigo-deep/15 transition-all text-left font-mono text-[11px] text-gray-400 hover:text-white rounded-sm flex items-center justify-between group"
                >
                  <span className="text-nova-electric group-hover:text-nova-electric-glow">{cmdOption.cmd}</span>
                  <span className="text-[9px] text-gray-500 font-sans tracking-wide">{cmdOption.label}</span>
                </button>
              ))}

              <button
                onMouseEnter={() => SoundManager.playHover()}
                onClick={() => handleCommandClick({ cmd: '/limpiar', label: 'Clear Logs', response: [] })}
                className="w-full p-3 bg-nova-dark/40 border border-nova-gray-border/30 hover:border-rose-500/50 hover:bg-rose-500/5 transition-all text-left font-mono text-[11px] text-gray-500 hover:text-rose-400 rounded-sm flex items-center justify-between group"
              >
                <span>/limpiar</span>
                <span className="text-[9px] font-sans tracking-wide">Limpiar Consola</span>
              </button>
            </div>
            
            <div className="font-mono text-[8px] text-gray-600 border-t border-nova-gray-border/40 pt-3">
              * Pulse cualquiera de los comandos para inyectar la señal correspondiente a la consola.
            </div>
          </div>

          {/* Interactive CRT Terminal - Right (8 Cols) */}
          <div className="lg:col-span-8 bg-nova-darker border border-nova-gray-border p-6 rounded-sm tech-corner relative flex flex-col justify-between min-h-[340px] shadow-2xl scanline">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-nova-gray-border/60 pb-3 mb-4 font-mono text-[9px] text-gray-500 select-none">
              <span className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-nova-electric" />
                <span className="tracking-widest">SOPORTE_TERMINAL_V1.log</span>
              </span>
              <span className="text-emerald-400">// SECURE_SHELL</span>
            </div>

            {/* Terminal Output history */}
            <div className="flex-grow font-mono text-[11px] space-y-2 overflow-y-auto mb-6 max-h-[220px] text-left pr-2">
              {terminalHistory.map((log, index) => {
                const isUser = log.startsWith('USER:');
                const isErr = log.startsWith('ERR:');
                const isSys = log.startsWith('SYS:');
                const isHeader = log.startsWith('---');
                
                let logClass = 'text-gray-400';
                if (isUser) logClass = 'text-nova-electric font-semibold';
                else if (isErr) logClass = 'text-rose-400';
                else if (isSys) logClass = 'text-gray-500';
                else if (isHeader) logClass = 'text-nova-purple-glow font-bold';

                return (
                  <div key={index} className={`leading-relaxed ${logClass}`}>
                    {log}
                  </div>
                );
              })}
            </div>

            {/* Custom Input form */}
            <form onSubmit={handleCustomSubmit} className="flex items-center space-x-2 border-t border-nova-gray-border/50 pt-3">
              <ChevronRight className="w-4 h-4 text-nova-electric" />
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escriba /ayuda o ingrese comando manual..."
                className="flex-grow bg-transparent font-mono text-xs text-white focus:outline-none placeholder-gray-600"
              />
              <button 
                type="submit" 
                className="hidden" 
              />
            </form>

            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-nova-electric pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-nova-purple pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
export default FaqTerminal;
