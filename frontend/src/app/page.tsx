"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, BrainCircuit, ArrowRight, Sparkles, Database, Code2, Zap, Search, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Animated Background glow effects */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0], 
          y: [0, -40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-20%] w-[40%] h-[40%] rounded-full bg-fuchsia-500/10 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[20%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" 
      />

      {/* Header/Nav */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto p-4 md:p-6 flex justify-between items-center relative z-20"
      >
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-indigo-500 to-fuchsia-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            IntelliX
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex text-slate-400 text-sm font-medium items-center gap-2">
            by <span className="text-white font-bold tracking-wide">Binary Brains</span>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24 px-6 flex flex-col items-center text-center">
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-indigo-200">Introducing the Next-Gen Educational AI</span>
        </motion.div>
        
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6"
        >
          The Future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-500">
            Answer Grounding
          </span>
        </motion.h1>
        
        <motion.p 
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          IntelliX leverages advanced Retrieval-Augmented Generation (RAG) to instantly verify student answers against source materials with absolute precision.
        </motion.p>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/teacher" className="group relative px-6 py-3 bg-white text-slate-950 font-bold text-base rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-fuchsia-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center">
              Teacher Portal
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link href="/student" className="group px-6 py-3 bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-white font-bold text-base rounded-full transition-all flex items-center">
            Student Portal
          </Link>
        </motion.div>
      </section>

      {/* Tech Stack / Architecture Bar */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
        className="border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-md relative z-10 py-8"
      >
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
            Powered by state-of-the-art AI infrastructure
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center space-x-2 text-lg font-bold text-white"><Code2 className="w-5 h-5 text-indigo-500" /><span>Next.js</span></div>
            <div className="flex items-center space-x-2 text-lg font-bold text-white"><Zap className="w-5 h-5 text-emerald-500" /><span>FastAPI</span></div>
            <div className="flex items-center space-x-2 text-lg font-bold text-white"><Database className="w-5 h-5 text-cyan-500" /><span>Qdrant</span></div>
            <div className="flex items-center space-x-2 text-lg font-bold text-white"><BrainCircuit className="w-5 h-5 text-orange-500" /><span>Groq LLMs</span></div>
            <div className="flex items-center space-x-2 text-lg font-bold text-white"><Sparkles className="w-5 h-5 text-blue-500" /><span>Gemini</span></div>
          </div>
        </div>
      </motion.section>

      {/* How it Works / System Design */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How IntelliX Works</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">An elegant, multi-stage pipeline designed for uncompromising accuracy.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 relative"
          >
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2 -z-10" />

            {/* Step 1 */}
            <motion.div variants={fadeUp} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-4 text-xl font-black text-indigo-400">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Vectorization</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Teachers upload PDFs. Documents are chunked and converted to semantic embeddings using <span className="text-slate-200 font-semibold">Gemini</span> and stored in <span className="text-slate-200 font-semibold">Qdrant</span>.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={fadeUp} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors mt-6 md:mt-0">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors" />
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-4 text-xl font-black text-cyan-400">2</div>
              <h3 className="text-xl font-bold text-white mb-3">Semantic Search</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                When a student submits an answer, we perform a cosine-similarity search against the database to fetch the exact context needed.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={fadeUp} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-fuchsia-500/50 transition-colors mt-6 md:mt-0">
              <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/20 transition-colors" />
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-4 text-xl font-black text-fuchsia-400">3</div>
              <h3 className="text-xl font-bold text-white mb-3">LLM Verification</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Context and answers are fed into high-speed <span className="text-slate-200 font-semibold">Groq LLMs</span>. If the answer isn't in the material, it's flagged immediately.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 relative z-10 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="space-y-6"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white leading-tight">Built for Educators. <br/> Designed for Students.</motion.h2>
              
              <motion.div variants={fadeUp} className="flex items-start space-x-4">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 mt-1"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Zero Hallucinations</h4>
                  <p className="text-sm text-slate-400 mt-1">Our strict system prompts force the AI to rely exclusively on the uploaded materials. External knowledge is ignored.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-start space-x-4">
                <div className="p-2.5 bg-fuchsia-500/10 rounded-xl text-fuchsia-400 mt-1"><Search className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Deep Semantic Understanding</h4>
                  <p className="text-sm text-slate-400 mt-1">Keywords aren't enough. We use 3072-dimensional vector embeddings to understand the true meaning behind student answers.</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-gradient-to-br from-indigo-500/40 to-fuchsia-500/40 p-1 rounded-[28px] shadow-[0_0_50px_-15px_rgba(99,102,241,0.3)]"
            >
              <div className="bg-slate-900 rounded-[24px] p-6 md:p-8 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Portal Access</h3>
                <div className="space-y-4">
                  <Link href="/teacher" className="flex items-center justify-between p-5 bg-slate-950 border-2 border-indigo-500/30 rounded-2xl hover:border-indigo-400 hover:bg-indigo-500/10 shadow-[0_0_20px_-10px_rgba(99,102,241,0.2)] transition-all group hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-indigo-500/20 rounded-xl group-hover:bg-indigo-500/30 transition-colors">
                        <BookOpen className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300" />
                      </div>
                      <div className="text-left">
                        <div className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">Teacher Portal</div>
                        <div className="text-sm text-slate-400 mt-0.5 font-medium">Upload & Manage</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-indigo-500 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link href="/student" className="flex items-center justify-between p-5 bg-slate-950 border-2 border-fuchsia-500/30 rounded-2xl hover:border-fuchsia-400 hover:bg-fuchsia-500/10 shadow-[0_0_20px_-10px_rgba(217,70,239,0.2)] transition-all group hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-fuchsia-500/20 rounded-xl group-hover:bg-fuchsia-500/30 transition-colors">
                        <GraduationCap className="w-7 h-7 text-fuchsia-400 group-hover:text-fuchsia-300" />
                      </div>
                      <div className="text-left">
                        <div className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition-colors">Student Portal</div>
                        <div className="text-sm text-slate-400 mt-0.5 font-medium">Submit & Evaluate</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-fuchsia-500 group-hover:text-fuchsia-300 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-800/50 mt-auto relative z-10 bg-slate-950">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <BrainCircuit className="w-4 h-4 text-slate-500" />
          <span className="text-lg font-bold text-slate-300">IntelliX</span>
        </div>
        <p className="text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} Designed by <span className="text-slate-400 font-semibold">Binary Brains</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
