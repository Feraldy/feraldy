import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Feraldy - Developer, Designer, Creator',
  description = 'Personal website of Feraldy, a passionate developer creating beautiful, functional, and user-friendly digital experiences.',
  keywords = ['developer', 'designer', 'creator', 'portfolio', 'react', 'typescript', 'web development'],
  image = '/og-image.jpg', // Default OG image
  url = 'https://feraldy.com', // Replace with your actual domain
  type = 'website'
}) => {
  const siteTitle = 'Feraldy';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;