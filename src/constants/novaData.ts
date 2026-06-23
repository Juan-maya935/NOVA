export interface NavbarLink {
  label: string;
  href: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
  description?: string;
}

export interface ServiceBlock {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefit: string;
  iconName: 'database' | 'plane' | 'box' | 'cpu';
}

export interface TechnicalAsset {
  title: string;
  category: string;
  description: string;
  health: string;
  status: 'NOMINAL' | 'ACTIVE' | 'CALIBRATING';
}

export const navbarLinks: NavbarLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Capacidades", href: "#stack" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" }
];

export const heroSection: HeroSection = {
  title: "NOVA",
  subtitle: "Ingeniería · Tecnología · Soluciones Integrales",
  description: "Desarrollamos soluciones tecnológicas avanzadas mediante analítica de datos, reconstrucción geoespacial y automatización inteligente para optimizar la infraestructura y los procesos industriales de alta complejidad."
};

export const techStack: TechnicalAsset[] = [
  {
    title: "Sistemas de Captura Aérea (LIDAR)",
    category: "EQUIPAMIENTO AÉREO",
    description: "Flota de drones industriales multiespectrales equipados con sensores LiDAR para mapeo geoespacial centimétrico.",
    health: "100%",
    status: "ACTIVE"
  },
  {
    title: "Motores de Simulación Física 3D",
    category: "PROCESAMIENTO DE SIMULACIÓN",
    description: "Algoritmos avanzados para la recreación pericial de incidentes industriales y dinámicas de colisión en tiempo real.",
    health: "100%",
    status: "NOMINAL"
  },
  {
    title: "Redes Neuronales de Visión Óptica",
    category: "INTELIGENCIA ARTIFICIAL",
    description: "Modelos convolucionales entrenados para la inspección automatizada en tiempo real de líneas de ensamble.",
    health: "98.4%",
    status: "ACTIVE"
  },
  {
    title: "Pipelines de Telemetría (Kafka)",
    category: "INFRAESTRUCTURA DE DATOS",
    description: "Ingesta y canalización de eventos en streaming para sensorización y telemetría industrial de alta frecuencia.",
    health: "100%",
    status: "NOMINAL"
  },
  {
    title: "Visualizadores de Control Central",
    category: "DESARROLLO DIGITAL",
    description: "Interfaces centralizadas interactivas que agrupan y grafican variables termográficas e históricas continuas.",
    health: "99.8%",
    status: "NOMINAL"
  },
  {
    title: "Hardware de Procesamiento Gráfico",
    category: "CÓMPUTO DE ALTO RENDIMIENTO",
    description: "Nodos de GPU dedicados para la optimización y procesamiento acelerado de nubes de puntos densas.",
    health: "100%",
    status: "ACTIVE"
  }
];

export const operacionalesMetrics: Metric[] = [
  { value: "100%", label: "Precisión Digital", description: "En reconstrucción tridimensional" },
  { value: "4K", label: "Resolución Aérea", description: "Captura de fotogrametría geoespacial" },
  { value: "24/7", label: "Monitoreo de Datos", description: "Procesamiento de telemetría en tiempo real" }
];

export const services: ServiceBlock[] = [
  {
    id: "SOL_01",
    title: "Desarrollo Digital y Datos",
    subtitle: "Páginas Web · Apps Corporativas · Dashboards",
    description: "Despliegue de plataformas web responsivas y de alto rendimiento, sistemas empresariales integrados y tableros interactivos para toma de decisiones tácticas en tiempo real.",
    benefit: "Control analítico centralizado y optimización de flujos operativos.",
    iconName: 'database'
  },
  {
    id: "SOL_02",
    title: "Soluciones Aéreas y Geoespaciales",
    subtitle: "Drones de Precisión · Fotogrametría Urbana · Nubes de Puntos",
    description: "Captura aérea de alta resolución con planificación de vuelo autónomo para el levantamiento topográfico y digitalización tridimensional de terrenos y estructuras complejas.",
    benefit: "Inspecciones exhaustivas con precisión geoespacial centimétrica.",
    iconName: 'plane'
  },
  {
    id: "SOL_03",
    title: "Recreación y Simulación 3D",
    subtitle: "Fotogrametría Forense · Reconstrucción de Accidentes · VR",
    description: "Recreación exacta de hechos y accidentes con valor pericial legal utilizando escaneo 3D, simulaciones físicas inmersivas y entornos interactivos de realidad virtual.",
    benefit: "Precisión pericial milimétrica y recreación interactiva objetiva.",
    iconName: 'box'
  },
  {
    id: "SOL_04",
    title: "Automatización y Visión Artificial",
    subtitle: "Detección Inteligente · Procesamiento de Imágenes · Modelos AI",
    description: "Implementación de redes neuronales y algoritmos de visión por computadora para control de calidad automático, clasificación y prevención de incidentes operativos.",
    benefit: "Reducción de error humano e inspección automatizada 24/7.",
    iconName: 'cpu'
  }
];
