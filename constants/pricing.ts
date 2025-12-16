export const pricingPlans = [
  {
    title: "Starter",
    description:
      "For individual developers who are testing CAPTCHA-solving APIs.",
    price: "$5",
    unit: "one-time credit",
    speed: "Standard",
    highlight: false,
    features: [
      "Image, Text & Audio CAPTCHA APIs",
      "Pay-per-request usage",
      "Dashboard access",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    description:
      "Best for production workloads and higher request volume.",
    price: "$25",
    unit: "one-time credit",
    speed: "High",
    highlight: true,
    features: [
      "All CAPTCHA APIs unlocked",
      "Faster processing priority",
      "Higher concurrency limits",
      "Usage analytics",
      "Priority support",
    ],
  },
  {
    title: "Enterprise",
    description:
      "Custom solutions for large-scale or specialized use cases.",
    price: "Custom",
    unit: "pricing",
    speed: "Maximum",
    highlight: false,
    features: [
      "Dedicated processing capacity",
      "Custom rate limits",
      "SLA & uptime guarantees",
      "Dedicated account manager",
    ],
  },
];
