import { ProjectCard } from './ProjectCard';

interface SectionProps {
  title: string;
  projects: { title: string; description: string; image: string; link: string }[];
}

export default function ProjectsSection({ title, projects }: SectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-light text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
