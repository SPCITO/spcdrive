'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, FolderOpen, Clock3,
  CheckCircle2, Upload, Users, Sparkles,
} from "lucide-react";

// Import your new component
import { Button } from "@/components/ui/Button";

const FEATURES = [
  { icon: <Upload className="h-5 w-5" />, title: "Quick uploads", desc: "Upload files in seconds." },
  { icon: <Shield className="h-5 w-5" />, title: "Secure access", desc: "Only authorized users." },
  { icon: <Users className="h-5 w-5" />, title: "Simple sharing", desc: "Share across teams easily." },
  { icon: <Clock3 className="h-5 w-5" />, title: "Reliable backups", desc: "Your files stay safe." },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7faf8] text-slate-900">
      
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/assets/green.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center scale-105 opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/90 to-[#f7faf8]" />
        <div className="absolute left-1/2 -top-56 h-150 w-150 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -bottom-50 -right-25 h-125 w-125 rounded-full bg-green-200/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-6 py-4 shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
              <Image src="/assets/SPCLOGO.avif" alt="SPC" fill className="object-contain p-2" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900">
                SPC <span className="text-emerald-600">Drive</span>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Secure File Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard/auth">
              <Button variant="primary" size="default" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-36">
        <section className={`transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="grid items-center gap-20 lg:grid-cols-2">

            {/* LEFT CONTENT */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                <CheckCircle2 className="h-4 w-4" />
                Trusted by departments and institutions
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-7xl">
                Simple file storage <span className="block text-emerald-600">for everyone</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl font-medium">
                A calm, secure place to upload, organize, and access your files. Built to feel simple — not overwhelming.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/dashboard/auth">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Enter Platform
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Features
                </Button>
              </div>
            </div>

            {/* RIGHT PREVIEW CARD */}
            <div className="relative">
              <div className="overflow-hidden rounded-4xl border border-white bg-white/90 p-7 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Storage Overview</p>
                    <h3 className="mt-1 text-3xl font-black text-slate-900">Everything organized</h3>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <FolderOpen className="h-8 w-8" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {FEATURES.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 8 }}
                      className="flex gap-4 rounded-2xl bg-slate-50/50 p-4 border border-transparent hover:border-emerald-100 hover:bg-emerald-50/50 transition-all cursor-default"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-emerald-600 p-5 text-white shadow-lg shadow-emerald-600/10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold">Clean & simple</p>
                      <p className="text-sm opacity-90 font-medium text-emerald-50 text-emerald-50">Built for stress-free management.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white/70 py-10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 md:flex-row text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-white border border-slate-200">
              <Image src="/assets/SPCLOGO.avif" alt="SPC" fill className="object-contain p-2" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">SPC <span className="text-emerald-600">Drive</span></h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure File Platform</p>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">
            © 2026 SPC DRIVE • Powered by Security
          </p>
        </div>
      </footer>
    </div>
  );
}