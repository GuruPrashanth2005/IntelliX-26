import Link from "next/link";
import { BookOpen, GraduationCap, BrainCircuit, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden selection:bg-cyan-500/30">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Header/Nav */}
      <nav className="w-full p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-lg">
            <BrainCircuit className="w-6 h-6 text-slate-950" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            IntelliX
          </span>
        </div>
        <div className="text-slate-400 text-sm font-medium flex items-center gap-2">
          by <span className="text-slate-200 font-semibold tracking-wide">Binary Brains</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-4xl w-full text-center space-y-8 mb-16">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 border border-slate-800 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-slate-300">AI-Powered Educational Evaluation</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            The Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Answer Grounding
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            IntelliX uses advanced Retrieval-Augmented Generation (RAG) to instantly verify student answers against source materials with pinpoint accuracy.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
          <Link href="/teacher" className="group relative rounded-2xl bg-slate-900/50 border border-slate-800 p-8 hover:bg-slate-800/50 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />
            
            <div className="h-14 w-14 bg-slate-800 border border-slate-700 text-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
              <BookOpen className="h-7 w-7" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-between">
              Teacher Portal
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Upload course materials, assign questions, and let our AI evaluate student understanding seamlessly.
            </p>
          </Link>

          <Link href="/student" className="group relative rounded-2xl bg-slate-900/50 border border-slate-800 p-8 hover:bg-slate-800/50 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
            
            <div className="h-14 w-14 bg-slate-800 border border-slate-700 text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all">
              <GraduationCap className="h-7 w-7" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-between">
              Student Portal
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Submit your answers and get instant AI feedback grounded in your actual course materials.
            </p>
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-800/50 mt-12 relative z-10">
        &copy; {new Date().getFullYear()} IntelliX by Binary Brains. All rights reserved.
      </footer>
    </div>
  );
}
