import React from 'react';
import { 
  GraduationCap, BarChart3, Briefcase, Building2, Gavel, 
  BookOpen, Monitor, Landmark, Video, Folder, CheckCircle2,
  ExternalLink, Calendar
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  image: string;
  features: string[];
  link: string;
}

const COURSES: Course[] = [
  {
    id: 'vat',
    title: 'VAT Training Programs',
    subtitle: 'VAT Law & Compliance',
    icon: BarChart3,
    image: 'https://elawyersbd.com/wp-content/uploads/2026/03/unnamed-2.jpg',
    features: ['VAT Act Overview', 'BIN Registration', 'Mushak Forms', 'Monthly Return Filing', 'Audit Preparation'],
    link: '#'
  },
  {
    id: 'tax',
    title: 'Income Tax Course',
    subtitle: 'Complete Tax Training',
    icon: Briefcase,
    image: 'https://elawyersbd.com/wp-content/uploads/2026/03/unnamed-3.jpg',
    features: ['Tax Law Basics', 'Income Categories', 'Deductions', 'Return Preparation', 'e-Return Filing'],
    link: '#'
  },
  {
    id: 'rjsc',
    title: 'RJSC Training',
    subtitle: 'Company Compliance',
    icon: Building2,
    image: 'https://elawyersbd.com/wp-content/uploads/2026/03/unnamed-5.jpg',
    features: ['Company Registration', 'Annual Returns', 'Director Changes', 'Documentation', 'Penalty Avoidance'],
    link: '#'
  },
  {
    id: 'barcouncil',
    title: 'Bar Council Preparation',
    subtitle: 'Exam & Licensing',
    icon: Gavel,
    image: 'https://elawyersbd.com/wp-content/uploads/2026/03/unnamed-6.jpg',
    features: ['Syllabus Coverage', 'Legal Reasoning', 'MCQ Practice', 'Written Guidance', 'Exam Strategy'],
    link: '#'
  },
  {
    id: 'accounting',
    title: 'Practical Accounting',
    subtitle: 'Hands-on Training',
    icon: BookOpen,
    image: 'https://elawyersbd.com/wp-content/uploads/2026/03/unnamed-7.jpg',
    features: ['Journal Entries', 'Ledger Posting', 'Trial Balance', 'Financial Statements', 'Software Basics'],
    link: '#'
  },
  {
    id: 'msoffice',
    title: 'MS Office Training',
    subtitle: 'Excel & Productivity',
    icon: Monitor,
    image: 'https://elawyersbd.com/wp-content/uploads/2026/03/unnamed-8.jpg',
    features: ['Word Essentials', 'Excel Formulas', 'Pivot Tables', 'PowerPoint', 'Practical Tasks'],
    link: '#'
  },
  {
    id: 'highcourt',
    title: 'High Court Preparation',
    subtitle: 'Legal Practice Ready',
    icon: Landmark,
    image: 'https://elawyersbd.com/wp-content/uploads/2026/03/unnamed-9.jpg',
    features: ['Procedure Basics', 'Case Study', 'Drafting Skills', 'Advocacy Practice', 'Exam Preparation'],
    link: '#'
  },
  {
    id: 'live-tax',
    title: 'Online Income Tax (Live)',
    subtitle: 'Interactive Live Class',
    icon: Video,
    image: 'https://elawyersbd.com/wp-content/uploads/2026/03/unnamed-10.jpg',
    features: ['Live Sessions', 'Real Examples', 'Q&A Support', 'Practical Filing', 'Certificate'],
    link: '#'
  },
  {
    id: 'personal-tax',
    title: 'Personal Income Tax',
    subtitle: 'Recorded Training',
    icon: Folder,
    image: 'https://elawyersbd.com/wp-content/uploads/2026/03/unnamed-11.jpg',
    features: ['Tax Basics', 'Income Sources', 'Exemptions', 'Return Completion', 'Mistake Avoidance'],
    link: '#'
  }
];

import ServiceSummary from '../../components/ServiceSummary';

const Academy: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="relative z-10 w-full rounded-[2.5rem] border border-white/80 bg-gradient-to-b from-white/60 to-white/40 backdrop-blur-[60px] p-10 sm:p-14 shadow-[0_30px_90px_-20px_rgba(50,60,100,0.1)] overflow-hidden group transition-all duration-500 hover:shadow-[0_45px_110px_-15px_rgba(50,60,100,0.15)] ring-1 ring-white/60">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/5 to-transparent pointer-events-none opacity-60" />
        <div className="relative z-10 flex flex-col items-start gap-8 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[11px] font-bold tracking-wide text-indigo-700 uppercase backdrop-blur-md">
                <GraduationCap size={11} className="text-indigo-600" />
                <span>Professional Academy</span>
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1] drop-shadow-sm">
              Professional <br />
              <span className="text-indigo-600">Academic Courses</span>
            </h1>
            <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed tracking-normal">
              Practical Legal, Tax & Accounting Training Programs designed to elevate your professional expertise.
            </p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {COURSES.map((course) => (
          <div 
            key={course.id}
            className="group flex flex-col rounded-3xl sm:rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* Course Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white">
                  <course.icon size={20} />
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm font-semibold text-indigo-600/80 uppercase tracking-wider">
                  {course.subtitle}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {course.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 mt-auto">
                <a 
                  href={course.link}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-[0.98]"
                >
                  <span>Learn More</span>
                  <ExternalLink size={14} />
                </a>
                <a 
                  href={course.link}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/40 active:scale-[0.98]"
                >
                  <Calendar size={14} />
                  <span>Book Class</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Summary Section */}
      <div className="space-y-6 relative z-10 pt-10">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Quick Access</h2>
        </div>
        <ServiceSummary />
      </div>
    </div>
  );
};

export default Academy;
