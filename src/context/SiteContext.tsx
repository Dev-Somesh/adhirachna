import React, { createContext, useContext, useState } from 'react';

interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  projects: Project[];
  stats: Stat[];
  contact: ContactContent;
  team: TeamMember[];
  testimonials: Testimonial[];
  clients: Client[];
  settings: Settings;
}

interface HeroContent {
  title: string;
  subtitle: string;
  image: string;
}

interface AboutContent {
  title: string;
  content: string;
  image: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface Stat {
  id: string;
  value: number;
  label: string;
}

interface ContactContent {
  address: string;
  email: string;
  phone: string;
  socialLinks: SocialLink[];
}

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  socialLinks: SocialLink[];
}

interface Testimonial {
  id: string;
  author: string;
  content: string;
  image: string;
}

interface Client {
  id: string;
  name: string;
  logo: string;
  website: string;
}

interface Settings {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  favicon: string;
}

interface SiteContextType {
  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => void;
  addService: (service: Service) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
    addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const defaultSiteContent: SiteContent = {
  hero: {
    title: 'Your Engineering Solutions',
    subtitle: 'We provide top-notch engineering services.',
    image: '/placeholder.jpg',
  },
  about: {
    title: 'About Us',
    content: 'We are a team of dedicated engineers...',
    image: '/placeholder.jpg',
  },
  services: [],
  projects: [],
  stats: [],
  contact: {
    address: '123 Main St, Anytown',
    email: 'info@example.com',
    phone: '555-1234',
    socialLinks: [],
  },
  team: [],
  testimonials: [],
  clients: [],
  settings: {
    primaryColor: '#007BFF',
    secondaryColor: '#28A745',
    logo: '/logo.png',
    favicon: '/favicon.ico',
  },
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  const updateSiteContent = (content: Partial<SiteContent>) => {
    setSiteContent(prev => ({ ...prev, ...content }));
  };

  const addService = (service: Service) => {
    setSiteContent(prev => ({
      ...prev,
      services: [...prev.services, service]
    }));
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setSiteContent(prev => ({
      ...prev,
      services: prev.services.map(service =>
        service.id === id ? { ...service, ...updates } : service
      )
    }));
  };

  const deleteService = (id: string) => {
    setSiteContent(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== id)
    }));
  };

  const addProject = (project: Project) => {
    setSiteContent(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setSiteContent(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    }));
  };

  const deleteProject = (id: string) => {
    setSiteContent(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

    const addTeamMember = (member: TeamMember) => {
    const newMember = {
      ...member,
      id: Date.now().toString(),
    };
    setSiteContent(prev => ({
      ...prev,
      team: [...prev.team, newMember]
    }));
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setSiteContent(prev => ({
      ...prev,
      team: prev.team.map(member =>
        member.id === id ? { ...member, ...updates } : member
      )
    }));
  };

  const deleteTeamMember = (id: string) => {
    setSiteContent(prev => ({
      ...prev,
      team: prev.team.filter(member => member.id !== id)
    }));
  };

  const value: SiteContextType = {
    siteContent,
    updateSiteContent,
    addService,
    updateService,
    deleteService,
    addProject,
    updateProject,
    deleteProject,
        addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
