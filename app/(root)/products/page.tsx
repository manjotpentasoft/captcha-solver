"use client";

import { motion, Variants } from "framer-motion";
import { products } from "@/constants/products";
import { ArrowRight } from "lucide-react";
import WhyBetterSection from "@/components/WhyBetterSection";
import CTASection from "@/components/CTASection";
import CaptchaFlowSection from "@/components/products/OrbitSection";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductsPage() {
  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="hero-section max-w-screen-2xl mx-auto text-center px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-primary">AI-Powered</span> CAPTCHA Solvers
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Solve text, image, and audio CAPTCHAs automatically with our reliable,
          high-speed APIs. Designed for developers, automation, and
          data-intensive workflows.
        </p>
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <a
            href="mailto:support@recaptchasolver.com"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition"
          >
            Talk to Sales <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-primary font-semibold hover:bg-primary hover:text-white transition"
          >
            Get Free Trial <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section max-w-screen-2xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Solve Any CAPTCHA, Effortlessly
        </h2>

        <motion.div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.title}
                className="product-card p-6 border border-border rounded-xl shadow-sm hover:shadow-md transition"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <span className="font-medium text-sm text-primary">
                    Example API Request:
                  </span>
                  <pre className="p-4 rounded text-sm overflow-x-auto bg-foreground/10">
                    {product.example}
                  </pre>
                </div>

                <a
                  href={product.apiEndpoint}
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                >
                  View API <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
      <CaptchaFlowSection />
      <WhyBetterSection />
      <CTASection />
    </div>
  );
}
