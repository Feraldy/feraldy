export interface SEOPageData {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  author?: {
    '@type': string;
    name: string;
    url?: string;
  };
  jobTitle?: string;
  worksFor?: {
    '@type': string;
    name: string;
  };
  alumniOf?: {
    '@type': string;
    name: string;
  };
  knowsAbout?: string[];
  sameAs?: string[];
}

const baseUrl = 'https://feraldy.dev'; // Update with your actual domain

export const seoData: Record<string, SEOPageData> = {
  '/': {
    title: 'Feraldy Nathanael - Test Engineer & Project Manager',
    description: 'Experienced Test Engineer and Project Manager with 3+ years in QA automation, E2E testing, and product development. Specializing in Playwright, TypeScript, and process improvement.',
    keywords: [
      'test engineer',
      'qa automation', 
      'project manager',
      'playwright',
      'typescript',
      'e2e testing',
      'quality assurance',
      'software testing',
      'test automation',
      'agile',
      'scrum'
    ],
    image: `${baseUrl}/og-images/home.jpg`,
    type: 'website'
  },
  '/projects': {
    title: 'Projects - Feraldy Nathanael',
    description: 'Explore my portfolio of web applications and tools including Well Balance wellness tracker, Coffee with Dy brewing guide, and other React/Next.js projects.',
    keywords: [
      'portfolio',
      'web development',
      'react',
      'next.js',
      'projects',
      'well balance',
      'coffee with dy',
      'web applications',
      'frontend development',
      'tailwind css'
    ],
    image: `${baseUrl}/og-images/projects.jpg`,
    type: 'website'
  },
  '/resume': {
    title: 'Resume - Feraldy Nathanael',
    description: 'Professional resume of Feraldy Nathanael - Test Engineer and Project Manager with expertise in QA automation, Playwright, and product development.',
    keywords: [
      'resume',
      'cv',
      'test engineer',
      'project manager',
      'qa automation',
      'career',
      'experience',
      'skills',
      'qualifications',
      'professional background'
    ],
    image: `${baseUrl}/og-images/resume.jpg`,
    type: 'profile'
  },
  '/blog': {
    title: 'Blog - Feraldy Nathanael',
    description: 'Technical blog posts about software testing, QA automation, project management, and web development insights from a Test Engineer perspective.',
    keywords: [
      'blog',
      'technical writing',
      'software testing',
      'qa automation',
      'project management',
      'web development',
      'testing insights',
      'automation tips',
      'development process'
    ],
    image: `${baseUrl}/og-images/blog.jpg`,
    type: 'blog'
  },
  '/photography': {
    title: 'Photography - Feraldy Nathanael',
    description: 'Personal photography portfolio showcasing creative work and visual storytelling alongside my technical expertise.',
    keywords: [
      'photography',
      'portfolio',
      'creative work',
      'visual storytelling',
      'personal projects',
      'artistic expression'
    ],
    image: `${baseUrl}/og-images/photography.jpg`,
    type: 'website'
  }
};

export const getPageSEO = (pathname: string): SEOPageData => {
  return seoData[pathname] || seoData['/'];
};

export const generateStructuredData = (pathname: string): StructuredData => {
  const pageData = getPageSEO(pathname);
  
  if (pathname === '/') {
    // Person schema for homepage
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Feraldy Nathanael',
      description: pageData.description,
      url: baseUrl,
      image: pageData.image,
      jobTitle: 'Test Engineer & Project Manager',
      worksFor: {
        '@type': 'Organization',
        name: 'RiddleStory / Enboq'
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Institut Teknologi Sepuluh Nopember (ITS)'
      },
      knowsAbout: [
        'Software Testing',
        'QA Automation',
        'Project Management',
        'Playwright',
        'TypeScript',
        'E2E Testing',
        'Test Planning',
        'Agile Methodologies',
        'Web Development',
        'Process Improvement'
      ],
      sameAs: [
        'https://linkedin.com/in/feraldy',
        'https://github.com/feraldy',
        'https://well-balance.vercel.app',
        'https://coffeewith-dy.vercel.app'
      ]
    };
  } else if (pathname === '/projects') {
    // CreativeWork schema for projects
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: 'Feraldy Nathanael - Projects Portfolio',
      description: pageData.description,
      url: `${baseUrl}/projects`,
      image: pageData.image,
      author: {
        '@type': 'Person',
        name: 'Feraldy Nathanael',
        url: baseUrl
      }
    };
  } else if (pathname === '/blog') {
    // Blog schema
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Feraldy Nathanael - Technical Blog',
      description: pageData.description,
      url: `${baseUrl}/blog`,
      image: pageData.image,
      author: {
        '@type': 'Person',
        name: 'Feraldy Nathanael',
        url: baseUrl
      }
    };
  }
  
  // Default WebPage schema
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData.title,
    description: pageData.description,
    url: `${baseUrl}${pathname}`,
    image: pageData.image,
    author: {
      '@type': 'Person',
      name: 'Feraldy Nathanael',
      url: baseUrl
    }
  };
};

export const generateCanonicalUrl = (pathname: string): string => {
  return `${baseUrl}${pathname}`;
};

export const generateImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${baseUrl}${imagePath}`;
};