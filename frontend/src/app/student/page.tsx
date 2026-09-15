"use client";
import { useState, useEffect } from "react";
import { BookOpen, Send, CheckCircle, AlertTriangle, HelpCircle, BrainCircuit } from "lucide-react";

export default function StudentPortal() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/questions");
      if (res.ok) {
        const data = await res.json();
        setQuestions(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestion) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:8000/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: selectedQuestion.id,
          answer: answer
        })
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const renderResultBadge = (label: string) => {
    if (label === "SUPPORTED") {
      return (
        <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/30 shadow-[0_0_15px_-3px_rgba(52,211,153,0.3)]">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold tracking-wide">SUPPORTED</span>
        </div>
      );
    }
    if (label === "CONTRADICTED") {
      return (
        <div className="flex items-center space-x-2 text-rose-400 bg-rose-400/10 px-4 py-2 rounded-full border border-rose-400/30 shadow-[0_0_15px_-3px_rgba(251,113,133,0.3)]">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold tracking-wide">CONTRADICTED</span>
        </div>
      );
    }
    if (label === "PARTIALLY_SUPPORTED") {
      return (
        <div className="flex items-center space-x-2 text-amber-400 bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/30 shadow-[0_0_15px_-3px_rgba(251,191,36,0.3)]">
          <HelpCircle className="w-5 h-5" />
          <span className="font-semibold tracking-wide">PARTIAL MATCH</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-2 text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
        <HelpCircle className="w-5 h-5" />
        <span className="font-semibold tracking-wide">NOT FOUND</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex items-center space-x-4 pb-6 border-b border-slate-800">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            <BookOpen className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Student Portal
            </h1>
            <p className="text-slate-400 text-sm mt-1">Answer questions and get instant AI verification.</p>
          </div>
        </header>

        {/* Question Selection */}
        {!selectedQuestion ? (
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-slate-300">Pending Assignments</h2>
            <div className="grid gap-4">
              {questions.length === 0 ? (
                <div className="text-slate-500 italic p-8 text-center bg-slate-900/30 rounded-2xl border border-slate-800/50">
                  No questions assigned yet.
                </div>
              ) : (
                questions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestion(q)}
                    className="flex text-left items-center justify-between p-6 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800 rounded-2xl transition-all group"
                  >
                    <span className="text-lg text-slate-200 font-medium group-hover:text-cyan-400 transition-colors">
                      {q.question_text}
                    </span>
                    <BrainCircuit className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))
              )}
            </div>
          </section>
        ) : (
          <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl -z-10 transition-colors duration-700" />
            
            <button 
              onClick={() => { setSelectedQuestion(null); setResult(null); setAnswer(""); }}
              className="text-sm text-cyan-400 hover:text-cyan-300 mb-6 flex items-center transition-colors"
            >
              ← Back to Assignments
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-slate-100">{selectedQuestion.question_text}</h2>

            <form onSubmit={handleVerify} className="space-y-6">
              <textarea
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={loading}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all min-h-[160px] text-lg"
                placeholder="Type your answer here..."
              />

              <button
                type="submit"
                disabled={loading || !answer.trim()}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] text-lg"
              >
                {loading ? (
                  <span className="flex items-center animate-pulse">
                    <BrainCircuit className="w-5 h-5 mr-2 animate-spin" /> Verifying Answer...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-5 h-5 mr-2" /> Submit for Verification
                  </span>
                )}
              </button>
            </form>

            {/* Results Display */}
            {result && (
              <div className="mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className={`bg-slate-950/60 backdrop-blur-md rounded-2xl p-8 relative overflow-hidden transition-all duration-500 border ${
                  result.overall_label === 'SUPPORTED' ? 'border-emerald-500/30 shadow-[0_0_40px_-10px_rgba(52,211,153,0.2)]' :
                  result.overall_label === 'CONTRADICTED' ? 'border-rose-500/30 shadow-[0_0_40px_-10px_rgba(251,113,133,0.2)]' :
                  result.overall_label === 'PARTIALLY_SUPPORTED' ? 'border-amber-500/30 shadow-[0_0_40px_-10px_rgba(251,191,36,0.2)]' :
                  'border-slate-800 shadow-xl'
                }`}>
                  
                  {/* Glowing background accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 opacity-50 ${
                    result.overall_label === 'SUPPORTED' ? 'bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0' :
                    result.overall_label === 'CONTRADICTED' ? 'bg-gradient-to-r from-rose-500/0 via-rose-500 to-rose-500/0' :
                    result.overall_label === 'PARTIALLY_SUPPORTED' ? 'bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0' :
                    'bg-slate-800'
                  }`} />

                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800/50">
                    <div className="flex items-center space-x-3">
                      <BrainCircuit className="w-6 h-6 text-slate-400" />
                      <h3 className="text-xl font-semibold text-slate-200">AI Analysis</h3>
                    </div>
                    {renderResultBadge(result.overall_label)}
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                      {result.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
