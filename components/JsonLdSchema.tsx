'use client';

import { useEffect } from 'react';

interface JsonLdSchemaProps {
  type: 'person' | 'organization' | 'website' | 'article' | 'project';
  data?: any;
}

export function JsonLdSchema({ type, data }: JsonLdSchemaProps) {
  useEffect(() => {
    const generateSchema = () => {
      const baseUrl = 'https://mileswaite.net';
      
      switch (type) {
        case 'person':
          return {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Miles Waite",
            "jobTitle": "Creative Technologist & Complex Systems Specialist",
            "description": "Certified by the Santa Fe Institute of Complex Science, with expertise in complex, adaptive systems and 20+ years experience in large-scale real-time systems.",
            "url": baseUrl,
            "image": `${baseUrl}/op-image.jpg`,
            "sameAs": [
              "https://github.com/Milesy1",
              "https://linkedin.com/in/miles-waite"
            ],
            "knowsAbout": [
              "Complex Systems",
              "TouchDesigner",
              "Music Production",
              "Python",
              "Next.js",
              "Creative Technology",
              "Real-time Systems",
              "Generative Art"
            ],
            "alumniOf": "Santa Fe Institute of Complex Science",
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Santa Fe Institute of Complex Science"
              }
            },
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance Creative Technologist"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "London",
              "addressCountry": "UK"
            }
          };

        case 'organization':
          return {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Miles Waite Portfolio",
            "url": baseUrl,
            "logo": `${baseUrl}/favicon.jpg`,
            "description": "Creative technology portfolio showcasing music, code, and complex systems projects.",
            "founder": {
              "@type": "Person",
              "name": "Miles Waite"
            },
            "sameAs": [
              "https://github.com/Milesy1"
            ]
          };

        case 'website':
          return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "mileswaite.net",
            "url": baseUrl,
            "description": "Modern portfolio showcasing music, code, and creative projects. Built with Next.js 14+ App Router and Tailwind CSS.",
            "author": {
              "@type": "Person",
              "name": "Miles Waite"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Miles Waite Portfolio"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          };

        case 'article':
          return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data?.title || "Blog Post",
            "description": data?.excerpt || "Article description",
            "author": {
              "@type": "Person",
              "name": "Miles Waite",
              "url": baseUrl
            },
            "publisher": {
              "@type": "Organization",
              "name": "mileswaite.net",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/favicon.jpg`
              }
            },
            "datePublished": data?.date || new Date().toISOString(),
            "dateModified": data?.date || new Date().toISOString(),
            "url": `${baseUrl}/blog/${data?.slug}`,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${baseUrl}/blog/${data?.slug}`
            }
          };

        case 'project':
          return {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": data?.title || "Project",
            "description": data?.description || "Project description",
            "creator": {
              "@type": "Person",
              "name": "Miles Waite"
            },
            "url": `${baseUrl}/projects/${data?.slug}`,
            "image": data?.image || `${baseUrl}/op-image.jpg`,
            "dateCreated": data?.dateCreated || new Date().toISOString(),
            "genre": data?.category || "Creative Technology",
            "keywords": data?.techStack?.join(", ") || "Technology, Creative, Code"
          };

        default:
          return null;
      }
    };

    const schema = generateSchema();
    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [type, data]);

  return null;
}

// Pre-built schemas for common use cases
export const PersonSchema = () => <JsonLdSchema type="person" />;
export const OrganizationSchema = () => <JsonLdSchema type="organization" />;
export const WebsiteSchema = () => <JsonLdSchema type="website" />;
export const ArticleSchema = ({ post }: { post: any }) => <JsonLdSchema type="article" data={post} />;
export const ProjectSchema = ({ project }: { project: any }) => <JsonLdSchema type="project" data={project} />;

