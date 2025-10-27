import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '../../data/projects';
import { ProjectHero } from '@/components/project/ProjectHero';
import { ProjectOverview } from '@/components/project/ProjectOverview';
import { ProjectTechStack } from '@/components/project/ProjectTechStack';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { ProjectLinks } from '@/components/project/ProjectLinks';
import { ProjectNavigation } from '@/components/project/ProjectNavigation';

// Generate metadata for the generative art project
export async function generateMetadata(): Promise<Metadata> {
  const project = getProjectBySlug('generative');
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Miles Portfolio`,
    description: project.longDescription,
    openGraph: {
      title: project.title,
      description: project.longDescription,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.longDescription,
      images: [project.image],
    },
  };
}

export default async function GenerativeArtPage() {
  const project = getProjectBySlug('generative');
  
  if (!project) {
    notFound();
  }

  // Use the same component structure as other project pages
  const projectComponents = [
    <ProjectHero 
      key="hero"
      title={project.title}
      image={project.image}
      heroImage={project.heroImage}
      category={project.category}
    />,
    
    <ProjectOverview 
      key="overview"
      description={project.description}
      longDescription={project.longDescription}
      problem={project.problem}
      solution={project.solution}
      challenges={project.challenges}
      results={project.results}
    />,
    
    <ProjectTechStack 
      key="tech"
      techStack={project.techStack}
    />,
    
    <ProjectGallery 
      key="gallery"
      gallery={project.gallery}
      title={project.title}
    />,
    
    <ProjectLinks 
      key="links"
      liveUrl={project.liveUrl}
      githubUrl={project.githubUrl}
      title={project.title}
    />,
    
    <ProjectNavigation 
      key="navigation"
      currentSlug={project.slug}
    />
  ];

  return (
    <div className="min-h-screen">
      {projectComponents}
    </div>
  );
}
