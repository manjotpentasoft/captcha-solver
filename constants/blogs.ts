export type Blog = {
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  tag?: string;
  link: string;
};

export const blogs: Blog[] = [
  {
    title: "Integrating CAPTCHA Handling into Automated Tests",
    description:
      "Learn how to integrate CAPTCHA-solving APIs into authorized QA and testing workflows.",
    image: "/blog1.png",
    author: "Jane Doe",
    date: "16 Dec 2025",
    tag: "Testing",
    link: "/blog/captcha-testing-integration",
  },
  {
    title: "Improving Accessibility with Audio CAPTCHA Support",
    description:
      "How AI-powered audio CAPTCHA solutions can help improve accessibility and user experience.",
    image: "/blog1.png",
    author: "John Smith",
    date: "12 Dec 2025",
    tag: "Accessibility",
    link: "/blog/audio-captcha-accessibility",
  },
  {
    title: "Designing Secure & Compliant CAPTCHA Pipelines",
    description:
      "Best practices for building compliant CAPTCHA workflows using API-based solutions.",
    image: "/blog1.png",
    author: "Alice Lee",
    date: "10 Dec 2025",
    tag: "Developer",
    link: "/blog/secure-captcha-pipelines",
  },
];
