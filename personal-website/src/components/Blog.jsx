import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    setIsVisible(true);
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    // For now, we'll manually define posts. In a real app, you might fetch from an API
    const blogPosts = [
      {
        id: 1,
        title: "Welcome to My Blog",
        excerpt: "Welcome to my personal blog! This is where I'll share my thoughts on development, tools, and technology.",
        date: "2025-01-19",
        filename: "welcome.md"
      }
      // Add more posts here as you create them
    ];
    setPosts(blogPosts);
  };

  const loadPostContent = async (filename) => {
    try {
      // In a real app, you'd fetch from your server or use dynamic imports
      // For now, we'll use a simple approach
      const response = await fetch(`/src/blog-posts/${filename}`);
      if (response.ok) {
        const content = await response.text();
        setPostContent(content);
      } else {
        // Fallback content if file doesn't exist
        setPostContent(`# ${selectedPost.title}\n\nContent coming soon...`);
      }
    } catch (error) {
      console.error('Error loading post:', error);
      setPostContent(`# ${selectedPost.title}\n\nError loading post content.`);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    loadPostContent(post.filename);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setPostContent('');
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm z-40 border-b border-neutral-700">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
              Feraldy
            </a>
            <nav className="flex gap-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                Home
              </a>
              <a href="/portfolio" className="text-gray-300 hover:text-white transition-colors duration-300">
                Portfolio
              </a>
              <a href="/tools" className="text-gray-300 hover:text-white transition-colors duration-300">
                Tools
              </a>
              <a href="/blog" className="text-yellow-400 font-semibold">
                Blog
              </a>
            </nav>
          </div>
        </header>

        {/* Post Content */}
        <main className="pt-16 md:pt-20 px-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBackToList}
              className="mb-8 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </button>

            <article className="bg-neutral-800 rounded-lg p-4 md:p-8 prose prose-invert prose-sm md:prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({children}) => <h1 className="text-4xl font-bold text-white mb-6">{children}</h1>,
                  h2: ({children}) => <h2 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl font-bold text-white mb-3 mt-6">{children}</h3>,
                  p: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                  ul: ({children}) => <ul className="text-gray-300 mb-4 list-disc list-inside">{children}</ul>,
                  ol: ({children}) => <ol className="text-gray-300 mb-4 list-decimal list-inside">{children}</ol>,
                  li: ({children}) => <li className="mb-2">{children}</li>,
                  code: ({inline, children}) => 
                    inline 
                      ? <code className="bg-gray-700 text-yellow-400 px-2 py-1 rounded text-sm">{children}</code>
                      : <code className="block bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">{children}</code>,
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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm z-40 border-b border-neutral-700">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <a href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
              Feraldy
            </a>
            <nav className="flex gap-3 md:gap-6">
              <a href="/" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
                Home
              </a>
              <a href="/resume" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
                Resume
              </a>
              <a href="/projects" className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300">
                Projects
              </a>
              <a href="/blog" className="text-sm md:text-base text-yellow-400 font-semibold">
                Blog
              </a>
            </nav>
          </div>
        </header>
        {/* Main Content */}
        <main className="pt-16 md:pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12 md:mb-16 pt-8 md:pt-12">
              <h1 
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Blog
              </h1>
              <p 
                className={`text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '0.2s' }}
              >
                Thoughts on development, tools, and technology.
              </p>
            </div>
          {/* Blog Posts */}
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <article
                    key={post.id}
                    className={`bg-neutral-800 rounded-lg p-8 hover:bg-neutral-750 transition-all duration-300 cursor-pointer ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${0.4 + index * 0.2}s` }}
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
                    <div className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300">
                      <span className="text-sm font-medium">Read more</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;