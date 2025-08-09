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

const baseUrl = 'https://feraldy.dev';

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
    image: `${baseUrl}/og-images/home.svg`,
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
    image: `${baseUrl}/og-images/projects.svg`,
    type: 'website'
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
    image: `${baseUrl}/og-images/blog.svg`,
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
    image: `${baseUrl}/og-images/photography.svg`,
    type: 'website'
  }
};

// Function to extract blog post metadata from markdown frontmatter
export const getBlogPostSEO = async (slug: string): Promise<SEOPageData | null> => {
  try {
    const response = await fetch(`/blog/${slug}.md`);
    if (!response.ok) return null;
    
    const content = await response.text();
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) return null;
    
    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
    const excerptMatch = frontmatter.match(/excerpt:\s*["'](.+?)["']/);
    const dateMatch = frontmatter.match(/date:\s*["'](.+?)["']/);
    
    const title = titleMatch ? titleMatch[1] : slug;
    const excerpt = excerptMatch ? excerptMatch[1] : '';
    const date = dateMatch ? dateMatch[1] : '';
    
    return {
      title: `${title} - Feraldy Nathanael`,
      description: excerpt || `Read about ${title} on Feraldy's technical blog covering software testing, QA automation, and web development.`,
      keywords: [
        'blog',
        'technical writing',
        'software testing',
        'qa automation',
        'web development',
        title.toLowerCase(),
        ...excerpt.toLowerCase().split(' ').filter(word => word.length > 3).slice(0, 3)
      ],
      image: `${baseUrl}/og-images/blog.svg`,
      type: 'article',
      publishedTime: date,
      modifiedTime: date
    };
  } catch (error) {
    console.warn('Failed to fetch blog post metadata:', error);
    return null;
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