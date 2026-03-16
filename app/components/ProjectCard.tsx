import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="bg-gray-200 px-2 py-1 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <a
            href={project.urlPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Visit Project →
          </a>
          
          <Link
            href={`/projects/${project.id}`}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}