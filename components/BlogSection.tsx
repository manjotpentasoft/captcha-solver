"use client";

import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/constants/blogs";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BlogSection() {
  return (
    <motion.section
      id="blog"
      className="py-20 md:py-28 bg-foreground"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-background">
            Insights & Developer Guides
          </h2>
          <p className="mt-3 text-background/50">
            Latest insights, tutorials, and best practices for building
            accessible and authorized automation with our APIs.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {blogs.map((post) => (
            <motion.div
              key={post.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group rounded-2xl overflow-hidden shadow-lg border border-primary transition"
            >
              <Link href={post.link}>
                <div className="relative w-full h-50 xl:h-60 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-background line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-background/70 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-background/70">
                        {post.author}
                      </span>
                    </div>
                    <span className="text-sm text-background/70">{post.date}</span>
                  </div>
                  {post.tag && (
                    <span className="mt-3 inline-block text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
