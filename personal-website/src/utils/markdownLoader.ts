// Simple frontmatter parser for browser compatibility
const parseFrontmatter = (content: string) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatterText = match[1];
  const markdownContent = match[2];
  
  // Parse YAML-like frontmatter
  const data: any = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });
  
  return { data, content: markdownContent };
};

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: 'blog-post' | 'project-story';
  project?: string;
  filename: string;
  content: string;
}

interface BlogPostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: 'blog-post' | 'project-story';
  project?: string;
}

// Cache for loaded blog posts
let cachedBlogPosts: BlogPost[] | null = null;

const loadMarkdownFile = async (filename: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/blog/${filename}`);
    if (!response.ok) {
      console.warn(`Failed to load blog post: ${filename}`);
      return null;
    }
    
    const markdownContent = await response.text();
    const { data, content } = parseFrontmatter(markdownContent);
    const frontmatter = data as BlogPostFrontmatter;
    
    return {
      id: Math.random(), // Generate a random ID for now
      title: frontmatter.title,
      slug: frontmatter.slug,
      excerpt: frontmatter.excerpt,
      date: frontmatter.date,
      category: frontmatter.category,
      project: frontmatter.project,
      filename: filename,
      content: content
    };
  } catch (error) {
    console.error(`Error loading blog post ${filename}:`, error);
    return null;
  }
};

const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
  if (cachedBlogPosts) {
    return cachedBlogPosts;
  }

  // List of markdown files to load
  const blogFiles = [
    'welcome.md',
    'well-balance-story.md',
    'coffee-with-dy-story.md'
  ];

  const posts: BlogPost[] = [];
  
  for (const filename of blogFiles) {
    const post = await loadMarkdownFile(filename);
    if (post) {
      posts.push(post);
    }
  }

  // Sort by date (newest first)
  cachedBlogPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return cachedBlogPosts;
};

export const loadBlogPosts = (): BlogPost[] => {
  // For synchronous compatibility, return cached posts or empty array
  return cachedBlogPosts || [];
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = loadBlogPosts();
  return posts.find(post => post.slug === slug);
};

export const getAllBlogPosts = (): BlogPost[] => {
  return loadBlogPosts();
};

// Initialize blog posts loading
export const initializeBlogPosts = async (): Promise<BlogPost[]> => {
  return await loadAllBlogPosts();
};