import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getPageSEO, generateStructuredData, generateCanonicalUrl, generateImageUrl } from '../utils/seoData';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = (props) => {
  const location = useLocation();
  const pageData = getPageSEO(location.pathname);
  const structuredData = generateStructuredData(location.pathname);
  
  // Use props if provided, otherwise fall back to page data
  const title = props.title || pageData.title;
  const description = props.description || pageData.description;
  const keywords = props.keywords || pageData.keywords;
  const image = generateImageUrl(props.image || pageData.image || '/og-images/default.jpg');
  const url = props.url || generateCanonicalUrl(location.pathname);
  const type = props.type || pageData.type || 'website';
  
  const siteTitle = 'Feraldy Nathanael';
  const fullTitle = title === siteTitle ? title : `${title}`;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Feraldy Nathanael" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${fullTitle} - Preview Image`} />
      <meta property="og:site_name" content="Feraldy Nathanael Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${fullTitle} - Preview Image`} />
      <meta name="twitter:creator" content="@feraldy" />
      <meta name="twitter:site" content="@feraldy" />
      
      {/* Additional meta tags */}
      <meta name="theme-color" content="#0d1117" />
      <meta name="msapplication-TileColor" content="#0d1117" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;