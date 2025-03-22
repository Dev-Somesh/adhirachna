
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our site content
export type HeroSection = {
  title: string;
  subtitle: string;
  enabled: boolean;
};

export type AboutSection = {
  title: string;
  content: string;
  enabled: boolean;
};

export type ServicesSection = {
  title: string;
  subtitle: string;
  enabled: boolean;
  services?: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
};

export type ContactSection = {
  title: string;
  subtitle: string;
  enabled: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
};

export type StatsData = {
  totalVisits: number;
  totalMessages: number;
  newMessages: number;
  recentActivities: Array<{
    id: string;
    action: string;
    description: string;
    timestamp: string;
  }>;
};

export type SiteContent = {
  hero: HeroSection;
  about: AboutSection;
  services: ServicesSection;
  contact: ContactSection;
  teamMembers: TeamMember[];
  stats: StatsData;
};

type SiteContextType = {
  siteContent: SiteContent;
  updateSection: (sectionName: keyof SiteContent, newData: any) => void;
  updateTeamMember: (member: TeamMember) => void;
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  removeTeamMember: (id: string) => void;
  addActivity: (action: string, description: string) => void;
};

// Default site content
const defaultSiteContent: SiteContent = {
  hero: {
    title: "Building the Future Together",
    subtitle: "Specialized in Architectural Engineering, Management Consulting, and Technical Services since 2023.",
    enabled: true
  },
  about: {
    title: "About Adhirachna Engineering Solutions",
    content: "Leading infrastructure development and engineering consultancy committed to delivering exceptional quality and innovative solutions.",
    enabled: true
  },
  services: {
    title: "Our Services",
    subtitle: "We provide a wide range of engineering and consulting services to meet your needs.",
    enabled: true,
    services: [
      {
        id: "1",
        title: "Architectural Design",
        description: "Expert architectural design services for residential and commercial buildings.",
        icon: "penTool"
      },
      {
        id: "2",
        title: "Structural Engineering",
        description: "Comprehensive structural analysis and design for buildings and infrastructure.",
        icon: "layoutGrid"
      },
      {
        id: "3",
        title: "Project Management",
        description: "End-to-end project management services to ensure timely completion.",
        icon: "clipboardList"
      },
      {
        id: "4",
        title: "Sustainability Consulting",
        description: "Green building and sustainability solutions for modern construction.",
        icon: "leaf"
      }
    ]
  },
  contact: {
    title: "Contact Us",
    subtitle: "Have a project in mind or need expert engineering consultation? Get in touch with our team.",
    enabled: true
  },
  teamMembers: [
    {
      id: "1",
      name: "Anurag Pareek",
      position: "Co-founder & CEO",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Co-founder of Adhirachna Engineering Solutions with extensive experience in architectural engineering."
    },
    {
      id: "2",
      name: "Priya Sharma",
      position: "Chief Operating Officer",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      bio: "Experienced operations leader with a background in infrastructure project management."
    },
    {
      id: "3",
      name: "Rajesh Kumar",
      position: "Lead Engineer",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      bio: "Structural engineering expert with over 10 years of experience in the field."
    }
  ],
  stats: {
    totalVisits: 12849,
    totalMessages: 87,
    newMessages: 14,
    recentActivities: [
      {
        id: "1",
        action: "Website content",
        description: "was updated",
        timestamp: "2 days ago"
      },
      {
        id: "2",
        action: "New project",
        description: "was added to the portfolio",
        timestamp: "5 days ago"
      },
      {
        id: "3",
        action: "Team member",
        description: "profile was updated",
        timestamp: "1 week ago"
      }
    ]
  }
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load from localStorage or use default
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const savedContent = localStorage.getItem('adhirachna_site_content');
    return savedContent ? JSON.parse(savedContent) : defaultSiteContent;
  });

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('adhirachna_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  const updateSection = (sectionName: keyof SiteContent, newData: any) => {
    setSiteContent(prev => {
      const updated = {
        ...prev,
        [sectionName]: {
          ...prev[sectionName],
          ...newData
        }
      };
      return updated;
    });
    
    // Add activity record
    addActivity(`${sectionName} section`, "was updated");
  };

  const updateTeamMember = (member: TeamMember) => {
    setSiteContent(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(m => 
        m.id === member.id ? member : m
      )
    }));
    
    addActivity("Team member", `${member.name} profile was updated`);
  };

  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const newMember = {
      ...member,
      id: Date.now().toString()
    };
    
    setSiteContent(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember]
    }));
    
    addActivity("Team member", `${member.name} was added to the team`);
  };

  const removeTeamMember = (id: string) => {
    setSiteContent(prev => {
      const memberName = prev.teamMembers.find(m => m.id === id)?.name || "Unknown";
      
      return {
        ...prev,
        teamMembers: prev.teamMembers.filter(m => m.id !== id)
      };
    });
    
    addActivity("Team member", "was removed from the team");
  };

  const addActivity = (action: string, description: string) => {
    setSiteContent(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        recentActivities: [
          {
            id: Date.now().toString(),
            action,
            description,
            timestamp: "just now"
          },
          ...prev.stats.recentActivities.slice(0, 4) // Keep the most recent 5
        ]
      }
    }));
  };

  return (
    <SiteContext.Provider value={{ 
      siteContent, 
      updateSection, 
      updateTeamMember, 
      addTeamMember, 
      removeTeamMember,
      addActivity
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSiteContent must be used within a SiteProvider');
  }
  return context;
};
