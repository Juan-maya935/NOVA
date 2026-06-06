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

export interface ProjectBlock {
  id: string;
  title: string;
  description: string;
  status: 'COMPLETED' | 'ACTIVE' | 'TESTING';
  location: string;
  techTags: string[];
}

export const navbarLinks: NavbarLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Stack", href: "#stack" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" }
];

export const heroSection: HeroSection = {
  title: "NOVA",
  subtitle: "Ingeniería · Tecnología · Soluciones Integrales",
  description: "Desarrollamos soluciones tecnológicas avanzadas mediante analítica de datos, reconstrucción geoespacial y automatización inteligente para optimizar la infraestructura y los procesos industriales de alta complejidad."
};

export const techStack: string[] = [
  "Python",
  "Unity",
  "Blender",
  "Docker",
  "Kafka",
  "Drones de Alta Precisión",
  "Visión Artificial",
  "PostgreSQL",
  "Dashboards Interactivos",
  "React & TypeScript",
  "APIs de Alta Disponibilidad",
  "Fotogrametría 3D"
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

export const projects: ProjectBlock[] = [
  {
    id: "SOL_REG-001",
    title: "Inspección de Infraestructura Energética",
    description: "Reconstrucción geoespacial 3D y análisis térmico automatizado de subestaciones y tendidos eléctricos de alta tensión para prevención de fallas.",
    status: "COMPLETED",
    location: "Valle del Cauca, Col",
    techTags: ["Drones de Precisión", "Python", "Fotogrametría 3D"]
  },
  {
    id: "SOL_REG-002",
    title: "Monitoreo Ambiental de Alta Frecuencia",
    description: "Fusión de telemetría de sensores remotos terrestres y visión por computadora para el control ecológico continuo de variables críticas.",
    status: "ACTIVE",
    location: "Cali, Col",
    techTags: ["Visión Artificial", "Kafka", "Docker"]
  },
  {
    id: "SOL_REG-003",
    title: "Gemelos Digitales y Recreación Forense",
    description: "Reconstrucción 3D exacta de accidentes industriales y de tránsito terrestre a escala real con simulación física inmersiva interactiva.",
    status: "COMPLETED",
    location: "Bogotá, Col",
    techTags: ["Unity", "Blender", "Fotogrametría 3D"]
  },
  {
    id: "SOL_REG-004",
    title: "Telemetría y Control Termográfico",
    description: "Plataforma central de dashboards interactivos que consolida alarmas termográficas predictivas en hornos industriales de alta temperatura.",
    status: "ACTIVE",
    location: "Medellín, Col",
    techTags: ["React & TypeScript", "PostgreSQL", "Dashboards"]
  }
];
