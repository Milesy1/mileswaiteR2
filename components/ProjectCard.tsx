'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export function ProjectCard({ title, description, image, link }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group"
    >
      <Link 
        href={link} 
        className="block"
        prefetch={true}
      >
        <div className="overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          </div>

          {/* Title */}
          <div className="pt-4">
            <h3 className="text-base font-medium text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
              {title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
