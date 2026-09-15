import Link from "next/link";
import { BookOpen, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Educational Answer Grounding Checker
        </h1>
        <p className="text-lg text-slate-600">
          Select your portal to continue.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link href="/teacher" className="group flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all">
            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Teacher Portal</h2>
            <p className="text-slate-500 mt-2 text-sm text-center">Upload materials and create questions</p>
          </Link>

          <Link href="/student" className="group flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all">
            <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Student Portal</h2>
            <p className="text-slate-500 mt-2 text-sm text-center">Answer questions and verify them</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
