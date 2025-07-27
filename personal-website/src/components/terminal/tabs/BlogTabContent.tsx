import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  filename: string;
  content?: string;
}

const BlogTabContent: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postContent, setPostContent] = useState<string>('');

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    const blogPosts = [
      {
        id: 1,
        title: "Welcome to My Blog",
        excerpt: "Welcome to my personal blog! This is where I'll share my thoughts on development, tools, and technology.",
        date: "2025-01-19",
        filename: "welcome.md"
      }
    ];
    setPosts(blogPosts);
  };

  const loadPostContent = async (filename: string) => {
    try {
      if (filename === 'welcome.md') {
        const welcomeContent = `# Welcome to My Blog

Welcome to my personal blog! This is where I'll share my thoughts on development, tools, and technology.

## Getting Started

This blog supports **Markdown** formatting, so I can easily write posts with:

- **Bold text**
- *Italic text*
- \`Code snippets\`
- Links and more!

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

Stay tuned for more posts about my projects and development journey!

---

*Published: January 2025*`;
        
        setPostContent(welcomeContent);
        return;
      }
      
      try {
        const response = await fetch(`/src/blog-posts/${filename}`);
        if (response.ok) {
          const content = await response.text();
          setPostContent(content);
        } else {
          setPostContent(`# ${selectedPost?.title}\n\nContent coming soon...`);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPostContent(`# ${selectedPost?.title}\n\nError loading post content.`);
      }
    } catch (error) {
      console.error('Error in loadPostContent:', error);
      setPostContent(`# ${selectedPost?.title}\n\nError loading post content.`);
    }
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    if (post.content) {
      setPostContent(post.content);
    } else {
      loadPostContent(post.filename);
    }
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setPostContent('');
  };

  if (selectedPost) {
    return (
      <div className="p-4 text-gray-300 terminal-font text-xs sm:text-sm md:text-base">
        <div className="mb-6 font-mono text-sm">
          <div className="flex items-center mb-2">
            <span className="text-blue-400 mr-2">$</span>
            <span className="text-gray-300">head -n 1 {selectedPost.filename}</span>
            <span className="text-green-400 ml-2">✓</span>
          </div>
          <div className="pl-4 text-gray-300 mb-4">
            Published: {new Date(selectedPost.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <button
          onClick={handleBackToList}
          className="mb-8 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>

        <article className="bg-slate-800 rounded-lg p-4 md:p-8 prose prose-invert prose-sm md:prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className="text-4xl font-bold text-white mb-6">{children}</h1>,
              h2: ({children}) => <h2 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h2>,
              h3: ({children}) => <h3 className="text-2xl font-bold text-white mb-3 mt-6">{children}</h3>,
              p: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
              ul: ({children}) => <ul className="text-gray-300 mb-4 list-disc list-inside">{children}</ul>,
              ol: ({children}) => <ol className="text-gray-300 mb-4 list-decimal list-inside">{children}</ol>,
              li: ({children}) => <li className="mb-2">{children}</li>,
              code: ({children, ...props}) => {
                const isInline = !props.className?.includes('language-');
                return isInline 
                  ? <code className="bg-gray-700 text-yellow-400 px-2 py-1 rounded text-sm">{children}</code>
                  : <code className="block bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">{children}</code>;
              },
              pre: ({children}) => <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 mb-4">{children}</blockquote>,
              a: ({href, children}) => <a href={href} className="text-blue-400 hover:text-blue-300 underline">{children}</a>,
              strong: ({children}) => <strong className="text-white font-bold">{children}</strong>,
              em: ({children}) => <em className="text-gray-200 italic">{children}</em>,
              hr: () => <hr className="border-gray-600 my-8" />
            }}
          >
            {postContent}
          </ReactMarkdown>
        </article>
      </div>
    );
  }

  return (
    <div className="p-4 text-gray-300 terminal-font text-xs sm:text-sm md:text-base">
      {/* Terminal command simulation */}
      <div className="mb-6 font-mono text-sm">
        <div className="flex items-center mb-2">
          <span className="text-blue-400 mr-2">$</span>
          <span className="text-gray-300">find . -name "*.md" | wc -l</span>
          <span className="text-green-400 ml-2">✓</span>
        </div>
        <div className="pl-4 text-gray-300 mb-4">
          {posts.length} blog posts found
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-400">
          Thoughts on development, tools, and technology.
        </p>
      </div>

      {/* Blog Posts */}
      <div className="w-full">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-neutral-800 rounded-lg p-8 hover:bg-neutral-750 transition-all duration-300 cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors duration-300">
                    {post.title}
                  </h2>
                  <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <button className="text-left w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition-colors duration-200">
                  <span className="text-yellow-400">cat</span> <span className="text-blue-400">{post.filename}</span>
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTabContent;