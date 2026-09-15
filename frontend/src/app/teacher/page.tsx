"use client";
import { useState, useEffect } from "react";
import { UploadCloud, FileText, PlusCircle, LayoutDashboard } from "lucide-react";

export default function TeacherPortal() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/materials`);
      if (res.ok) {
        const data = await res.json();
        setMaterials(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMaterialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/upload`, {
          method: "POST",
          body: formData,
        });
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/materials`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      }
      
      setTitle("");
      setContent("");
      setFile(null);
      fetchMaterials();
      alert("Material saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save material");
    }
    setLoading(false);
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterialId) return;
    
    const file = (window as any).qFile;
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/materials/${selectedMaterialId}/questions/upload`, {
          method: "POST",
          body: formData,
        });
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/materials/${selectedMaterialId}/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question_text: questionText }),
        });
      }
      setQuestionText("");
      (window as any).qFile = null;
      alert(file ? "Questions uploaded successfully!" : "Question assigned successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to assign question(s).");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex items-center space-x-4 pb-6 border-b border-slate-800">
          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <LayoutDashboard className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Teacher Portal
            </h1>
            <p className="text-slate-400 text-sm mt-1">Upload study materials and assign questions.</p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Material Section */}
          <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/10 transition-colors duration-700" />
            
            <h2 className="text-xl font-semibold flex items-center mb-6">
              <UploadCloud className="w-5 h-5 mr-3 text-indigo-400" />
              Upload Source Material
            </h2>
            
            <form onSubmit={handleMaterialSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Material Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  placeholder="e.g., Biology Chapter 4"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">Upload Document (PDF/DOCX)</label>
                
                <div className="relative border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-2xl p-8 text-center transition-colors bg-slate-950/30 group">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center pointer-events-none">
                    <FileText className="w-10 h-10 text-slate-500 mb-3 group-hover:text-indigo-400 transition-colors" />
                    <p className="text-slate-300 font-medium">
                      {file ? file.name : "Drag & drop a file here or click to browse"}
                    </p>
                    <p className="text-slate-500 text-xs mt-2">Supports .pdf and .docx</p>
                  </div>
                </div>

                <div className="text-center text-slate-500 text-sm font-medium">OR</div>

                <textarea
                  value={content}
                  onChange={(e) => { setContent(e.target.value); setFile(null); }}
                  disabled={!!file}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all min-h-[120px] disabled:opacity-50"
                  placeholder="Paste raw text here if you don't have a file..."
                />
              </div>

              <button
                type="submit"
                disabled={loading || (!file && !content)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]"
              >
                {loading ? "Processing via AI..." : "Upload & Vectorize"}
              </button>
            </form>
          </section>

          {/* Question Assignment Section */}
          <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 p-32 bg-purple-500/5 rounded-full blur-3xl -z-10 group-hover:bg-purple-500/10 transition-colors duration-700" />
            
            <h2 className="text-xl font-semibold flex items-center mb-6">
              <PlusCircle className="w-5 h-5 mr-3 text-purple-400" />
              Assign Questions
            </h2>
            
            <form onSubmit={handleQuestionSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Select Source Material</label>
                <div className="relative">
                  <select
                    required
                    onChange={(e) => setSelectedMaterialId(Number(e.target.value))}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none"
                  >
                    <option value="">-- Choose Material --</option>
                    {materials.map((m) => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">Upload Questions File (TXT/PDF/DOCX)</label>
                
                <div className="relative border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-2xl p-8 text-center transition-colors bg-slate-950/30 group">
                  <input
                    type="file"
                    accept=".txt,.pdf,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) {
                        // We need a separate state for question file, let's reuse a new one we'll add
                        // Wait, I need to add state for this. I will use 'qFile' (I will add it to the top of the file)
                        (window as any).qFile = file;
                        setQuestionText(`Selected file: ${file.name}`);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center pointer-events-none">
                    <FileText className="w-10 h-10 text-slate-500 mb-3 group-hover:text-purple-400 transition-colors" />
                    <p className="text-slate-300 font-medium">
                      {"Drag & drop a file here with 1 question per line"}
                    </p>
                    <p className="text-slate-500 text-xs mt-2">Supports .txt, .pdf and .docx</p>
                  </div>
                </div>

                <div className="text-center text-slate-500 text-sm font-medium">OR</div>

                <label className="block text-sm font-medium text-slate-400 mb-2">Manually Type Question</label>
                <textarea
                  value={questionText}
                  onChange={(e) => { setQuestionText(e.target.value); (window as any).qFile = null; }}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all min-h-[80px]"
                  placeholder="e.g., What are the main causes mentioned in the text?"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedMaterialId || (!questionText && !(window as any).qFile)}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_-5px_rgba(147,51,234,0.5)]"
              >
                Assign Question(s)
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
