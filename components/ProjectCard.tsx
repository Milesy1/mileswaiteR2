'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  video?: string;
  link: string;
}

export function ProjectCard({ title, description, image, video, link }: ProjectCardProps) {
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
          {/* Image/Video Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            {video ? (
              <video
                src={video}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                muted
                loop
                playsInline
                preload="none"
                poster={image}
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
              />
            ) : (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>

          {/* Title */}
          <div className="pt-4">
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
              {title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

