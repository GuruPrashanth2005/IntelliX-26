import Link from "next/link";
import { BookOpen, GraduationCap, BrainCircuit, ArrowRight, Sparkles, Database, Code2, Zap, Search, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background glow effects - Grand Scale */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[80%] h-[20%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Header/Nav */}
      <nav className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center relative z-20">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-indigo-500 to-fuchsia-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            IntelliX
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex text-slate-400 text-sm font-medium items-center gap-2">
            by <span className="text-white font-bold tracking-wide">Binary Brains</span>
          </div>
          <Link href="/teacher" className="px-5 py-2.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-8 backdrop-blur-sm animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-indigo-200">Introducing the Next-Gen Educational AI</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto mb-8">
          The Future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-500">
            Answer Grounding
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
          IntelliX leverages advanced Retrieval-Augmented Generation (RAG) to instantly verify student answers against source materials with absolute precision. No hallucinations. Just facts.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link href="/teacher" className="group relative px-8 py-4 bg-white text-slate-950 font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-fuchsia-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center">
              Teacher Portal
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link href="/student" className="group px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-white font-bold text-lg rounded-full transition-all flex items-center">
            Student Portal
          </Link>
        </div>
      </section>

      {/* Tech Stack / Architecture Bar */}
      <section className="border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-md relative z-10 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
            Powered by state-of-the-art AI infrastructure
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center space-x-2 text-xl font-bold text-white"><Code2 className="w-6 h-6 text-indigo-500" /><span>Next.js 14</span></div>
            <div className="flex items-center space-x-2 text-xl font-bold text-white"><Zap className="w-6 h-6 text-emerald-500" /><span>FastAPI</span></div>
            <div className="flex items-center space-x-2 text-xl font-bold text-white"><Database className="w-6 h-6 text-cyan-500" /><span>Qdrant Vector DB</span></div>
            <div className="flex items-center space-x-2 text-xl font-bold text-white"><BrainCircuit className="w-6 h-6 text-orange-500" /><span>Groq LLMs</span></div>
            <div className="flex items-center space-x-2 text-xl font-bold text-white"><Sparkles className="w-6 h-6 text-blue-500" /><span>Gemini Embeddings</span></div>
          </div>
        </div>
      </section>

      {/* How it Works / System Design */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How IntelliX Works</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">An elegant, multi-stage pipeline designed for uncompromising accuracy and speed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2 -z-10" />

            {/* Step 1 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
              <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 text-2xl font-black text-indigo-400">1</div>
              <h3 className="text-2xl font-bold text-white mb-4">Vectorization</h3>
              <p className="text-slate-400 leading-relaxed">
                Teachers upload PDFs or raw text. We chunk the documents and generate 3072-dimensional semantic embeddings using <span className="text-slate-200 font-semibold">Gemini</span>, storing them securely in <span className="text-slate-200 font-semibold">Qdrant</span>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors mt-8 md:mt-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors" />
              <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 text-2xl font-black text-cyan-400">2</div>
              <h3 className="text-2xl font-bold text-white mb-4">Semantic Search</h3>
              <p className="text-slate-400 leading-relaxed">
                When a student submits an answer, their text is vectorized in real-time. We perform a cosine-similarity search against the database to fetch the exact context needed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:border-fuchsia-500/50 transition-colors mt-8 md:mt-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/20 transition-colors" />
              <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 text-2xl font-black text-fuchsia-400">3</div>
              <h3 className="text-2xl font-bold text-white mb-4">LLM Verification</h3>
              <p className="text-slate-400 leading-relaxed">
                The retrieved context and student answer are fed into high-speed <span className="text-slate-200 font-semibold">Groq LLMs</span> for strict evaluation. If the answer isn't in the material, it's flagged as NOT FOUND.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 relative z-10 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white leading-tight">Built for Educators. <br/> Designed for Students.</h2>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 mt-1"><ShieldCheck className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Zero Hallucinations</h4>
                  <p className="text-slate-400 mt-2">Our strict system prompts force the AI to rely exclusively on the uploaded materials. External knowledge is ignored.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-fuchsia-500/10 rounded-xl text-fuchsia-400 mt-1"><Search className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Deep Semantic Understanding</h4>
                  <p className="text-slate-400 mt-2">Keywords aren't enough. We use 3072-dimensional vector embeddings to understand the true meaning behind student answers.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 p-1 rounded-3xl">
              <div className="bg-slate-900 rounded-[22px] p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">Portal Access</h3>
                <div className="space-y-4">
                  <Link href="/teacher" className="flex items-center justify-between p-6 bg-slate-950 border border-slate-800 rounded-2xl hover:border-indigo-500 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <BookOpen className="w-8 h-8 text-indigo-400" />
                      <div className="text-left">
                        <div className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Teacher Portal</div>
                        <div className="text-sm text-slate-500">Upload & Manage</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link href="/student" className="flex items-center justify-between p-6 bg-slate-950 border border-slate-800 rounded-2xl hover:border-fuchsia-500 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <GraduationCap className="w-8 h-8 text-fuchsia-400" />
                      <div className="text-left">
                        <div className="text-lg font-bold text-white group-hover:text-fuchsia-400 transition-colors">Student Portal</div>
                        <div className="text-sm text-slate-500">Submit & Evaluate</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-fuchsia-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 text-center border-t border-slate-800/50 mt-auto relative z-10 bg-slate-950">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <BrainCircuit className="w-5 h-5 text-slate-500" />
          <span className="text-xl font-bold text-slate-300">IntelliX</span>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Designed by <span className="text-slate-400 font-semibold">Binary Brains</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
