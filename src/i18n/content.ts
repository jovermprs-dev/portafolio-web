export type Lang = "en" | "es";

export interface Job {
  role: string;
  period: string;
}

export interface ExperienceEntry {
  company: string;
  project: string;
  location: string;
  period: string;
  jobs: Job[];
  bullets: string[];
  technologies: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface EducationEntry {
  title: string;
  school: string;
  period: string;
}

export interface ProjectCard {
  name: string;
  description: string;
}

export interface Content {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    contact: string;
    /** Accessible label for the EN/ES switch (its visible content is just the two flags). */
    langSwitchLabel: string;
  };
  hero: {
    name: string;
    title: string;
    location: string;
    availability: string[];
    downloadCv: string;
    contactMe: string;
  };
  about: {
    heading: string;
    paragraph: string;
  };
  experience: {
    heading: string;
    entries: ExperienceEntry[];
  };
  skills: {
    heading: string;
    groups: SkillGroup[];
  };
  education: {
    heading: string;
    entries: EducationEntry[];
    languagesLabel: string;
    languages: string[];
  };
  projects: {
    heading: string;
    subheading: string;
    comingSoon: string;
    cards: ProjectCard[];
  };
  contact: {
    heading: string;
    paragraph: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
  };
  footer: {
    text: string;
  };
}

const en: Content = {
  meta: {
    title: "Sergio Jover Penalva — Full Stack Developer",
    description:
      "Full Stack Developer specializing in Java, Spring Boot and Angular. Based in Alicante, Spain, open to remote work worldwide.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    langSwitchLabel: "English / Spanish language switch",
  },
  hero: {
    name: "Sergio Jover Penalva",
    title: "Full Stack Developer · Java · Spring Boot · Angular · TypeScript · SQL",
    location: "Alicante, Spain",
    availability: [
      "Available immediately",
      "Open to remote work worldwide",
      "On-site / hybrid in Alicante, Spain",
    ],
    downloadCv: "Download CV",
    contactMe: "Contact me",
  },
  about: {
    heading: "About me",
    paragraph:
      "Full Stack Developer with 1 year and 7 months of continuous professional experience on a production project, working primarily with Java, Spring Boot and Angular. Experience delivering end-to-end features, integrating REST APIs, working with Oracle databases using SQL, and writing unit tests with Jest and JUnit 5. After joining Inetum as an intern, I was hired as Software Engineer 2 to continue working on the same production project, including refactoring and modularizing an Angular component from more than 1,000 lines to approximately 80 lines.",
  },
  experience: {
    heading: "Experience",
    entries: [
      {
        company: "Inetum",
        project: "FranceAgriMer Project",
        location: "Alicante, Spain",
        period: "October 2024 – April 2026",
        jobs: [
          { role: "Software Engineer 2", period: "April 2025 – April 2026" },
          { role: "Full Stack Developer Intern", period: "October 2024 – March 2025" },
        ],
        bullets: [
          "Developed end-to-end features for a production application in the French agricultural sector, working on business logic with Java and Spring Boot and on the user interface with Angular 17.",
          "Refactored and modularized an Angular component from more than 1,000 lines to approximately 80 lines, improving maintainability and making it easier to develop new features.",
          "Integrated REST APIs and worked with Oracle data using SQL, contributing to communication between frontend and backend.",
          "Implemented and maintained unit tests with Jest and JUnit 5 to validate features and reduce the risk of regressions.",
          "Used Git for version control and Liquibase for database schema changes while collaborating in an Agile Scrum team.",
        ],
        technologies: [
          "Java",
          "Spring Boot",
          "Angular 17",
          "TypeScript",
          "SQL",
          "Oracle",
          "REST APIs",
          "Liquibase",
          "Jest",
          "JUnit 5",
          "Git",
          "HTML5",
          "CSS3",
          "SASS",
        ],
      },
    ],
  },
  skills: {
    heading: "Technical skills",
    groups: [
      { label: "Backend", items: ["Java", "Spring Boot", "REST APIs"] },
      {
        label: "Frontend",
        items: ["Angular 17", "TypeScript", "JavaScript", "HTML5", "CSS3", "SASS"],
      },
      {
        label: "Data, testing & tools",
        items: [
          "Oracle",
          "SQL",
          "Jest",
          "JUnit 5",
          "Liquibase",
          "Git",
          "Scrum",
          "Jira",
          "Jenkins",
          "SonarQube",
        ],
      },
    ],
  },
  education: {
    heading: "Education",
    entries: [
      {
        title: "Higher Technician in Cross-Platform Application Development (DAM)",
        school: "IES San Vicente — Alicante",
        period: "2022 – 2025",
      },
      {
        title: "Higher Technician in Web Application Development (DAW)",
        school: "IES San Vicente — Alicante",
        period: "2022 – 2025",
      },
    ],
    languagesLabel: "Languages",
    languages: ["Spanish: Native", "English: B2 — Cambridge English Certification"],
  },
  projects: {
    heading: "Projects",
    subheading: "A selection of projects I've worked on.",
    comingSoon: "Coming soon",
    cards: [
      { name: "Project #1", description: "Details coming soon." },
      { name: "Project #2", description: "Details coming soon." },
      { name: "Project #3", description: "Details coming soon." },
    ],
  },
  contact: {
    heading: "Get in touch",
    paragraph:
      "Feel free to reach out for opportunities, collaborations, or just to say hi.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
  },
  footer: {
    text: "Built with Astro.",
  },
};

const es: Content = {
  meta: {
    title: "Sergio Jover Penalva — Desarrollador Full Stack",
    description:
      "Desarrollador Full Stack especializado en Java, Spring Boot y Angular. Con base en Alicante, España, abierto a trabajar en remoto en cualquier lugar del mundo.",
  },
  nav: {
    about: "Sobre mí",
    experience: "Experiencia",
    skills: "Skills",
    projects: "Proyectos",
    contact: "Contacto",
    langSwitchLabel: "Selector de idioma inglés / español",
  },
  hero: {
    name: "Sergio Jover Penalva",
    title: "Desarrollador Full Stack · Java · Spring Boot · Angular · TypeScript · SQL",
    location: "Alicante, España",
    availability: [
      "Disponibilidad inmediata",
      "Abierto a trabajar en remoto en cualquier lugar del mundo",
      "Presencial / híbrido en Alicante, España",
    ],
    downloadCv: "Descargar CV",
    contactMe: "Contáctame",
  },
  about: {
    heading: "Sobre mí",
    paragraph:
      "Desarrollador Full Stack con 1 año y 7 meses de experiencia profesional continua en un proyecto de producción, trabajando principalmente con Java, Spring Boot y Angular. Experiencia entregando funcionalidades end-to-end, integrando APIs REST, trabajando con bases de datos Oracle mediante SQL, y escribiendo tests unitarios con Jest y JUnit 5. Tras incorporarme a Inetum como becario, fui contratado como Software Engineer 2 para seguir trabajando en el mismo proyecto de producción, incluyendo la refactorización y modularización de un componente Angular de más de 1.000 líneas a aproximadamente 80.",
  },
  experience: {
    heading: "Experiencia",
    entries: [
      {
        company: "Inetum",
        project: "Proyecto FranceAgriMer",
        location: "Alicante, España",
        period: "Octubre 2024 – Abril 2026",
        jobs: [
          { role: "Software Engineer 2", period: "Abril 2025 – Abril 2026" },
          { role: "Becario Full Stack Developer", period: "Octubre 2024 – Marzo 2025" },
        ],
        bullets: [
          "Desarrollo de funcionalidades end-to-end para una aplicación en producción del sector agrícola francés, trabajando en la lógica de negocio con Java y Spring Boot y en la interfaz de usuario con Angular 17.",
          "Refactorización y modularización de un componente Angular de más de 1.000 líneas a aproximadamente 80, mejorando la mantenibilidad y facilitando el desarrollo de nuevas funcionalidades.",
          "Integración de APIs REST y trabajo con datos de Oracle mediante SQL, contribuyendo a la comunicación entre frontend y backend.",
          "Implementación y mantenimiento de tests unitarios con Jest y JUnit 5 para validar funcionalidades y reducir el riesgo de regresiones.",
          "Uso de Git para control de versiones y Liquibase para cambios de esquema de base de datos, colaborando en un equipo Agile Scrum.",
        ],
        technologies: [
          "Java",
          "Spring Boot",
          "Angular 17",
          "TypeScript",
          "SQL",
          "Oracle",
          "REST APIs",
          "Liquibase",
          "Jest",
          "JUnit 5",
          "Git",
          "HTML5",
          "CSS3",
          "SASS",
        ],
      },
    ],
  },
  skills: {
    heading: "Skills técnicos",
    groups: [
      { label: "Backend", items: ["Java", "Spring Boot", "REST APIs"] },
      {
        label: "Frontend",
        items: ["Angular 17", "TypeScript", "JavaScript", "HTML5", "CSS3", "SASS"],
      },
      {
        label: "Datos, testing y herramientas",
        items: [
          "Oracle",
          "SQL",
          "Jest",
          "JUnit 5",
          "Liquibase",
          "Git",
          "Scrum",
          "Jira",
          "Jenkins",
          "SonarQube",
        ],
      },
    ],
  },
  education: {
    heading: "Formación",
    entries: [
      {
        title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)",
        school: "IES San Vicente — Alicante",
        period: "2022 – 2025",
      },
      {
        title: "Técnico Superior en Desarrollo de Aplicaciones Web (DAW)",
        school: "IES San Vicente — Alicante",
        period: "2022 – 2025",
      },
    ],
    languagesLabel: "Idiomas",
    languages: ["Español: Nativo", "Inglés: B2 — Cambridge English Certification"],
  },
  projects: {
    heading: "Proyectos",
    subheading: "Una selección de proyectos en los que he trabajado.",
    comingSoon: "Próximamente",
    cards: [
      { name: "Proyecto #1", description: "Detalles próximamente." },
      { name: "Proyecto #2", description: "Detalles próximamente." },
      { name: "Proyecto #3", description: "Detalles próximamente." },
    ],
  },
  contact: {
    heading: "Hablemos",
    paragraph:
      "No dudes en escribirme para oportunidades, colaboraciones, o simplemente para saludar.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
  },
  footer: {
    text: "Construido con Astro.",
  },
};

export const content: Record<Lang, Content> = { en, es };

export const contactInfo = {
  email: "jovermprs@gmail.com",
  linkedin: "https://linkedin.com/in/sergio-jover-penalva-31babb388",
  github: "https://github.com/jovermprs-dev",
};
