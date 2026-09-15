"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Trash2, BookOpen, HelpCircle, Eye, X } from "lucide-react";
import Link from "next/link";

export default function TeacherDashboard() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingMaterial, setViewingMaterial] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [matRes, qRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/materials`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/questions`)
      ]);
      
      if (matRes.ok) setMaterials(await matRes.json());
      if (qRes.ok) setQuestions(await qRes.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const deleteMaterial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this material and all its questions?")) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/materials/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setMaterials(materials.filter(m => m.id !== id));
        setQuestions(questions.filter(q => q.material_id !== id));
      } else {
        alert("Failed to delete material");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting material");
    }
  };

  const deleteQuestion = async (id: number) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/questions/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setQuestions(questions.filter(q => q.id !== id));
      } else {
        alert("Failed to delete question");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting question");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans selection:bg-indigo-500/30">
      {/* Full Material View Modal */}
      {viewingMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white pr-4">{viewingMaterial.title}</h2>
              <button 
                onClick={() => setViewingMaterial(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-slate-300 leading-relaxed font-medium">
                  {viewingMaterial.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-3 text-slate-400 mb-2">
              <Link href="/teacher" className="hover:text-white transition-colors flex items-center space-x-1 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Upload</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-white">Manage Materials</h1>
            <p className="text-slate-400 text-sm mt-1">View and manage uploaded materials and assigned questions.</p>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : materials.length === 0 ? (
          <div className="text-center p-12 bg-slate-900/30 border border-slate-800 rounded-2xl">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-300">No Materials Found</h3>
            <p className="text-slate-500 mt-2">Upload some materials in the teacher portal to see them here.</p>
            <Link href="/teacher" className="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors">
              Go to Upload
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {materials.map(material => {
              const materialQuestions = questions.filter(q => q.material_id === material.id);
              
              return (
                <div key={material.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  {/* Material Header */}
                  <div className="p-6 bg-slate-800/30 flex items-start justify-between border-b border-slate-800">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">{material.title}</h2>
                        <p className="text-sm text-slate-400 mt-1 line-clamp-2 max-w-2xl">{material.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button 
                        onClick={() => setViewingMaterial(material)}
                        className="p-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-400/10 rounded-lg transition-colors flex items-center space-x-2"
                        title="View Full Material"
                      >
                        <Eye className="w-5 h-5" />
                        <span className="text-sm font-medium">View Material</span>
                      </button>
                      <button 
                        onClick={() => deleteMaterial(material.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete Material"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Questions List */}
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Assigned Questions ({materialQuestions.length})
                    </h3>
                    
                    {materialQuestions.length === 0 ? (
                      <p className="text-sm text-slate-500 italic">No questions assigned to this material yet.</p>
                    ) : (
                      <ul className="space-y-3">
                        {materialQuestions.map(q => (
                          <li key={q.id} className="flex items-start justify-between bg-slate-950/50 border border-slate-800 p-4 rounded-xl group hover:border-slate-700 transition-colors">
                            <span className="text-slate-300 pr-4 whitespace-pre-wrap">{q.question_text}</span>
                            <button 
                              onClick={() => deleteQuestion(q.id)}
                              className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 flex-shrink-0"
                              title="Delete Question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
