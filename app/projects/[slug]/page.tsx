import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs } from '../../data/projects';
import { ProjectHero } from '@/components/project/ProjectHero';
import { ProjectOverview } from '@/components/project/ProjectOverview';
import { ProjectTechStack } from '@/components/project/ProjectTechStack';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { ProjectLinks } from '@/components/project/ProjectLinks';
import { ProjectNavigation } from '@/components/project/ProjectNavigation';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // 🎯 FLEXIBLE COMPONENT ARRANGEMENT
  // You can easily reorder, comment out, or duplicate these components
  const projectComponents = [
    <ProjectHero 
      key="hero"
      title={project.title}
      image={project.image}
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
      {/* 🎨 RENDER COMPONENTS IN ORDER */}
      {/* To reorder: simply move the components up/down in the array above */}
      {/* To hide: comment out the component in the array above */}
      {/* To duplicate: add another instance to the array above */}
      {projectComponents}
    </div>
  );
}
