"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Loader2,
} from "lucide-react";
import WhyBetterSection from "@/components/WhyBetterSection";
import CTASection from "@/components/CTASection";
import PricingSection from "@/components/PricingSection";

export default function VoiceCaptchaPage() {
  const [audioUrl, setAudioUrl] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const solveCaptcha = async () => {
    if (!audioUrl && !audioFile) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      let formData = new FormData();
      if (audioFile) {
        formData.append("file", audioFile);
      } else {
        formData.append("url", audioUrl);
      }

      const res = await fetch("/api/voiceCaptcha", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to transcribe audio");

      setResult(data.sentence);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-32">
        {/* HERO */}
        <section className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" /> AI-Powered Audio OCR
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
              Audio-to-Text CAPTCHA Solver
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Instantly transcribe and extract answers from audio CAPTCHAs using advanced AI models. Trusted by developers for automation and verification workflows.
            </p>
          </motion.div>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-white font-semibold shadow hover:bg-primary/90 transition"
            >
              Try Live Demo <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl border border-primary px-8 py-4 font-semibold text-primary hover:bg-primary hover:text-white transition"
            >
              View API Docs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* WHAT IS CAPTCHA */}
        <section className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ImageIcon className="w-14 h-14 text-primary" />
              <h2 className="text-4xl font-bold">What is a Audio CAPTCHA?</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Audio CAPTCHAs play audio prompts or spoken challenges to prevent automated bots from accessing content.
            </p>
            <p className="text-muted-foreground">
              Solving them manually is slow and error-prone. Our AI-powered solver transcribes and extracts answers accurately, even from noisy or complex audio.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-xl flex items-center justify-center">
            <p className="text-gray-500 text-center">
              Example: Audio says "Say the sum of 12 and 7" → The AI returns "19".
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="space-y-12 bg-foreground py-16 rounded-4xl px-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-gray-300">
              Simple three-step workflow to extract answers from audio CAPTCHAs:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="flex flex-col items-center gap-4">
              <Upload className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold text-white">1. Upload or Provide URL</h3>
              <p className="text-center text-gray-300">
                Upload an audio file or provide a link to the audio CAPTCHA.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold text-white">2. AI Transcription</h3>
              <p className="text-center text-gray-300">
                Advanced AI transcribes the audio and extracts the correct answer.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold text-white">3. Receive Answer</h3>
              <p className="text-center text-gray-300">
                Get the transcribed answer instantly for automation, verification, or quizzes.
              </p>
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold">Key Features</h2>
            <p className="mt-4 text-muted-foreground">
              Designed for developers and enterprises seeking fast, reliable, and accurate audio CAPTCHA solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Upload,
                title: "AI-Powered Transcription",
                desc: "Automatically transcribes and extracts answers from audio CAPTCHAs.",
              },
              {
                icon: Loader2,
                title: "Fast Processing",
                desc: "Transcribes audio and returns results in seconds for real-time workflows.",
              },
              {
                icon: Sparkles,
                title: "High Accuracy",
                desc: "Reliable transcription even from noisy or distorted audio clips.",
              },
              {
                icon: ImageIcon,
                title: "Batch Support",
                desc: "Process multiple audio CAPTCHAs simultaneously with minimal latency.",
              },
              {
                icon: Upload,
                title: "Flexible Integration",
                desc: "Works with API, scripts, or automation tools for easy deployment.",
              },
              {
                icon: Loader2,
                title: "Supports Multiple Formats",
                desc: "Handles MP3, WAV, and other common audio formats.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow hover:shadow-lg transition"
              >
                <feature.icon className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-center text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* DEMO */}
        <section id="demo" className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-center mb-10">Live Demo</h2>

            <div className="grid lg:grid-cols-2 gap-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl hover:shadow-3xl transition-all">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Audio URL</label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    placeholder="https://example.com/captcha.mp3"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Or Upload File</label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
                    className="w-full"
                  />
                </div>

                <button
                  onClick={solveCaptcha}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-white font-semibold shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Transcribing...
                    </>
                  ) : (
                    <>
                      Extract Text <Upload className="w-4 h-4" />
                    </>
                  )}
                </button>

                {result && (
                  <pre className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm whitespace-pre-wrap shadow-inner">
                    {result}
                  </pre>
                )}

                {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
              </div>

              <div className="rounded-xl border p-4 flex items-center justify-center bg-gray-50">
                <p className="text-gray-400 text-center">
                  Audio CAPTCHA Example: "Please say the sum of 12 and 7."
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <PricingSection />
        <WhyBetterSection />
      </main>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
