import React, { useState } from 'react';
import { 
  Gavel, Scale, Handshake, Shield, Scroll, 
  Building2, Users, User, Calculator, IdCard, 
  Banknote, GraduationCap, Briefcase, FileCheck,
  TrendingUp, ClipboardCheck,
  CheckCircle2, ExternalLink, ChevronRight
} from 'lucide-react';

export type Language = 'en' | 'bn';
export type MainTab = 'legal' | 'tax' | 'vat' | 'corporate' | 'finance' | 'hr' | 'training';

interface Service {
  id: string;
  title: { en: string; bn: string };
  desc: { en: string; bn: string };
  tag: { en: string; bn: string };
  icon: React.ElementType;
  image: string;
  link: string;
  category: string;
}

const SERVICES: Record<MainTab, Service[]> = {
  legal: [
    {
      id: 'civil',
      title: { en: 'Civil Litigation', bn: 'সিভিল মামলা' },
      desc: { en: 'Assistance in civil disputes including money recovery and contractual claims.', bn: 'সিভিল বিরোধ, অর্থ আদায় ও চুক্তি সংক্রান্ত দাবি সমাধানে আইনি সহায়তা।' },
      tag: { en: 'Legal Representation', bn: 'আইনি প্রতিনিধিত্ব' },
      icon: Scale,
      image: 'https://picsum.photos/seed/civil-law/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    },
    {
      id: 'contract',
      title: { en: 'Specific Performance of Contract', bn: 'চুক্তি বাস্তবায়ন' },
      desc: { en: 'Legal action to enforce contractual obligations.', bn: 'চুক্তিগত বাধ্যবাধকতা বাস্তবায়নের জন্য আইনি ব্যবস্থা।' },
      tag: { en: 'Legal Representation', bn: 'আইনি প্রতিনিধিত্ব' },
      icon: Handshake,
      image: 'https://picsum.photos/seed/contract/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    },
    {
      id: 'injunction',
      title: { en: 'Injunction & Declaratory Suit', bn: 'নিষেধাজ্ঞা ও ঘোষণামূলক মামলা' },
      desc: { en: 'Court orders to protect rights or clarify legal status.', bn: 'অধিকার সুরক্ষা বা আইনি অবস্থা স্পষ্ট করার জন্য আদালতের আদেশ।' },
      tag: { en: 'Legal Representation', bn: 'আইনি প্রতিনিধিত্ব' },
      icon: Gavel,
      image: 'https://picsum.photos/seed/injunction/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    },
    {
      id: 'land',
      title: { en: 'Land & Property Disputes', bn: 'ভূমি ও সম্পত্তি বিরোধ' },
      desc: { en: 'Resolution of ownership, possession, and title conflicts.', bn: 'মালিকানা, দখল ও শিরোনামের বিরোধ সমাধান।' },
      tag: { en: 'Legal Representation', bn: 'আইনি প্রতিনিধিত্ব' },
      icon: Building2,
      image: 'https://picsum.photos/seed/land-law/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    },
    {
      id: 'criminal',
      title: { en: 'Criminal Case Representation', bn: 'ফৌজদারি মামলা প্রতিনিধিত্ব' },
      desc: { en: 'Defense and procedural support in criminal matters.', bn: 'ফৌজদারি বিষয়গুলিতে রক্ষণ ও প্রক্রিয়াগত সহায়তা।' },
      tag: { en: 'Legal Representation', bn: 'আইনি প্রতিনিধিত্ব' },
      icon: Shield,
      image: 'https://picsum.photos/seed/criminal-law/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    },
    {
      id: 'writ',
      title: { en: 'Writ Petition', bn: 'রিট পিটিশন' },
      desc: { en: 'Constitutional legal action before the Supreme Court for protection of rights.', bn: 'অধিকার সুরক্ষার জন্য সুপ্রিম কোর্টে সাংবিধানিক আইনি ব্যবস্থা।' },
      tag: { en: 'Appeal & Higher Court', bn: 'আপিল ও উচ্চ আদালত' },
      icon: Scroll,
      image: 'https://picsum.photos/seed/writ/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'appeal'
    },
    {
      id: 'family',
      title: { en: 'Family Law', bn: 'পারিবারিক আইন' },
      desc: { en: 'Legal support for divorce, child custody, and maintenance issues.', bn: 'বিবাহবিচ্ছেদ, সন্তানের হেফাজত এবং ভরণপোষণ সংক্রান্ত আইনি সহায়তা।' },
      tag: { en: 'Legal Representation', bn: 'আইনি প্রতিনিধিত্ব' },
      icon: Users,
      image: 'https://picsum.photos/seed/family-law/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    },
    {
      id: 'niact',
      title: { en: 'NI Act (Cheque Dishonor)', bn: 'এনআই অ্যাক্ট (চেক ডিজঅনার)' },
      desc: { en: 'Legal action for cheque dishonor and recovery of money.', bn: 'চেক ডিজঅনার এবং অর্থ আদায়ের জন্য আইনি ব্যবস্থা।' },
      tag: { en: 'Legal Representation', bn: 'আইনি প্রতিনিধিত্ব' },
      icon: Banknote,
      image: 'https://picsum.photos/seed/cheque/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    },
    {
      id: 'labour',
      title: { en: 'Labour & Employment Law', bn: 'শ্রম ও কর্মসংস্থান আইন' },
      desc: { en: 'Resolution of workplace disputes and compliance with labour laws.', bn: 'কর্মক্ষেত্রের বিরোধ সমাধান এবং শ্রম আইনের পরিপালন।' },
      tag: { en: 'Legal Representation', bn: 'আইনি প্রতিনিধিত্ব' },
      icon: Briefcase,
      image: 'https://picsum.photos/seed/labour-law/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    },
    {
      id: 'ip',
      title: { en: 'Intellectual Property', bn: 'মেধাসম্পদ আইন' },
      desc: { en: 'Registration and protection of trademarks, copyrights, and patents.', bn: 'ট্রেডমার্ক, কপিরাইট এবং পেটেন্ট নিবন্ধন ও সুরক্ষা।' },
      tag: { en: 'Legal Representation', bn: 'আইনি প্রতিনিধিত্ব' },
      icon: Shield,
      image: 'https://picsum.photos/seed/ip-law/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    },
    {
      id: 'notary',
      title: { en: 'Notary & Drafting', bn: 'নোটারি ও ড্রাফটিং' },
      desc: { en: 'Professional drafting of agreements, affidavits, and power of attorney.', bn: 'চুক্তি, হলফনামা এবং আমমোক্তারনামার পেশাদার ড্রাফটিং।' },
      tag: { en: 'Legal Support', bn: 'আইনি সহায়তা' },
      icon: Scroll,
      image: 'https://picsum.photos/seed/drafting/800/600',
      link: 'https://elawyersbd.com/legal-services/',
      category: 'legal'
    }
  ],
  tax: [
    {
      id: 'ind-tax',
      title: { en: 'Individual Tax Return', bn: 'ব্যক্তিগত কর রিটার্ন' },
      desc: { en: 'Accurate return preparation for individuals – salary, business & capital gains.', bn: 'ব্যক্তিদের জন্য নির্ভুল কর রিটার্ন প্রস্তুতি – বেতন, ব্যবসা ও মূলধনী লাভ।' },
      tag: { en: 'Return Filing', bn: 'রিটার্ন দাখিল' },
      icon: User,
      image: 'https://picsum.photos/seed/tax-return/800/600',
      link: 'https://elawyersbd.com/tax-vat-management-services/',
      category: 'return'
    },
    {
      id: 'corp-tax',
      title: { en: 'Company Tax Return', bn: 'কোম্পানি কর রিটার্ন' },
      desc: { en: 'Corporate income computation & director-approved filing.', bn: 'কর্পোরেট আয় নির্ণয় ও পরিচালক অনুমোদিত দাখিল।' },
      tag: { en: 'Return Filing', bn: 'রিটার্ন দাখিল' },
      icon: Building2,
      image: 'https://picsum.photos/seed/corp-tax/800/600',
      link: 'https://elawyersbd.com/tax-vat-management-services/',
      category: 'return'
    },
    {
      id: 'tin-reg',
      title: { en: 'e-TIN Registration', bn: 'ই-টিআইএন নিবন্ধন' },
      desc: { en: 'New e-TIN application with fast online processing.', bn: 'দ্রুত অনলাইন প্রক্রিয়ায় নতুন ই-টিআইএন আবেদন।' },
      tag: { en: 'Compliance', bn: 'পরিপালন' },
      icon: IdCard,
      image: 'https://picsum.photos/seed/tin-reg/800/600',
      link: 'https://elawyersbd.com/tax-vat-management-services/',
      category: 'registration'
    }
  ],
  vat: [
    {
      id: 'bin-reg',
      title: { en: 'New BIN Registration', bn: 'নতুন বিন নিবন্ধন' },
      desc: { en: 'Complete BIN registration with VAT enlistment support.', bn: 'সম্পূর্ণ বিন নিবন্ধন ও ভ্যাট তালিকাভুক্তি সহায়তা।' },
      tag: { en: 'Registration', bn: 'নিবন্ধন' },
      icon: IdCard,
      image: 'https://picsum.photos/seed/bin-reg/800/600',
      link: 'https://elawyersbd.com/tax-vat-management-services/',
      category: 'registration'
    },
    {
      id: 'vat-return',
      title: { en: 'VAT Return Preparation', bn: 'ভ্যাট রিটার্ন প্রস্তুতি' },
      desc: { en: 'Accurate monthly VAT calculation and timely filing.', bn: 'সঠিক মাসিক ভ্যাট গণনা ও সময়মত দাখিল।' },
      tag: { en: 'Return & Mushak', bn: 'রিটার্ন ও মুশক' },
      icon: Calculator,
      image: 'https://picsum.photos/seed/vat-return/800/600',
      link: 'https://elawyersbd.com/tax-vat-management-services/',
      category: 'return'
    }
  ],
  corporate: [
    {
      id: 'agm-doc',
      title: { en: 'Board Meeting & AGM', bn: 'বোর্ড সভা ও বার্ষিক সাধারণ সভা' },
      desc: { en: 'Complete preparation of board and AGM agendas and statutory records.', bn: 'বোর্ড ও বার্ষিক সাধারণ সভার এজেন্ডা এবং সংবিধিবদ্ধ রেকর্ড সম্পূর্ণ প্রস্তুতি।' },
      tag: { en: 'Secretarial', bn: 'সেক্রেটারিয়াল' },
      icon: Users,
      image: 'https://picsum.photos/seed/agm/800/600',
      link: 'https://elawyersbd.com/corporate-support-services/',
      category: 'secretarial'
    },
    {
      id: 'incorp',
      title: { en: 'New Company Incorporation', bn: 'নতুন কোম্পানি ইনকর্পোরেশন' },
      desc: { en: 'End-to-end support for registering a new private or public company.', bn: 'নতুন প্রাইভেট বা পাবলিক কোম্পানি নিবন্ধনের জন্য সম্পূর্ণ সহায়তা।' },
      tag: { en: 'Business Setup', bn: 'ব্যবসা সেটআপ' },
      icon: Building2,
      image: 'https://picsum.photos/seed/incorp/800/600',
      link: 'https://elawyersbd.com/corporate-support-services/',
      category: 'setup'
    }
  ],
  finance: [
    {
      id: 'bookkeeping',
      title: { en: 'General Bookkeeping', bn: 'সাধারণ হিসাবরক্ষণ' },
      desc: { en: 'Daily recording of financial transactions and ledger maintenance.', bn: 'দৈনিক আর্থিক লেনদেন রেকর্ড এবং লেজার রক্ষণাবেক্ষণ।' },
      tag: { en: 'Bookkeeping', bn: 'হিসাবরক্ষণ' },
      icon: Calculator,
      image: 'https://picsum.photos/seed/bookkeeping/800/600',
      link: 'https://elawyersbd.com/finance-accounting-services/',
      category: 'bookkeeping'
    },
    {
      id: 'audit',
      title: { en: 'Financial Audit', bn: 'আর্থিক নিরীক্ষা' },
      desc: { en: 'Statutory and internal audit services for companies.', bn: 'কোম্পানির জন্য সংবিধিবদ্ধ এবং অভ্যন্তরীণ নিরীক্ষা সেবা।' },
      tag: { en: 'Audit', bn: 'নিরীক্ষা' },
      icon: FileCheck,
      image: 'https://picsum.photos/seed/audit/800/600',
      link: 'https://elawyersbd.com/finance-accounting-services/',
      category: 'audit'
    },
    {
      id: 'project-profile',
      title: { en: 'Project Profile', bn: 'প্রজেক্ট প্রোফাইল' },
      desc: { en: 'Preparation of project profiles for bank loans and investments.', bn: 'ব্যাংক ঋণ এবং বিনিয়োগের জন্য প্রজেক্ট প্রোফাইল প্রস্তুতি।' },
      tag: { en: 'Finance', bn: 'ফিন্যান্স' },
      icon: TrendingUp,
      image: 'https://picsum.photos/seed/project/800/600',
      link: 'https://elawyersbd.com/finance-accounting-services/',
      category: 'finance'
    }
  ],
  hr: [
    {
      id: 'payroll',
      title: { en: 'Payroll Processing', bn: 'পেরোল প্রসেসিং' },
      desc: { en: 'Timely and accurate salary calculation and disbursements.', bn: 'সময়মতো এবং নির্ভুল বেতন গণনা ও বিতরণ।' },
      tag: { en: 'Payroll', bn: 'পেরোল' },
      icon: Banknote,
      image: 'https://picsum.photos/seed/payroll/800/600',
      link: 'https://elawyersbd.com/hr-payroll-management-services/',
      category: 'payroll'
    },
    {
      id: 'hr-policy',
      title: { en: 'HR Policy Development', bn: 'এইচআর পলিসি ডেভেলপমেন্ট' },
      desc: { en: 'Creating employee handbooks and workplace policies.', bn: 'কর্মচারী হ্যান্ডবুক এবং কর্মক্ষেত্রের নীতিমালা তৈরি।' },
      tag: { en: 'HR Support', bn: 'এইচআর সহায়তা' },
      icon: ClipboardCheck,
      image: 'https://picsum.photos/seed/hr-policy/800/600',
      link: 'https://elawyersbd.com/hr-payroll-management-services/',
      category: 'hr'
    }
  ],
  training: [
    {
      id: 'tax-training',
      title: { en: 'Income Tax Training', bn: 'আয়কর প্রশিক্ষণ' },
      desc: { en: 'Practical training on income tax return preparation and laws.', bn: 'আয়কর রিটার্ন প্রস্তুতি এবং আইন নিয়ে ব্যবহারিক প্রশিক্ষণ।' },
      tag: { en: 'Tax & VAT', bn: 'ট্যাক্স ও ভ্যাট' },
      icon: GraduationCap,
      image: 'https://picsum.photos/seed/tax-training/800/600',
      link: 'https://elawyersbd.com/training-academy/',
      category: 'tax-vat'
    },
    {
      id: 'vat-training',
      title: { en: 'VAT Management Training', bn: 'ভ্যাট ম্যানেজমেন্ট প্রশিক্ষণ' },
      desc: { en: 'Hands-on training on VAT registration, return, and compliance.', bn: 'ভ্যাট নিবন্ধন, রিটার্ন এবং পরিপালন নিয়ে হাতে-কলমে প্রশিক্ষণ।' },
      tag: { en: 'Tax & VAT', bn: 'ট্যাক্স ও ভ্যাট' },
      icon: GraduationCap,
      image: 'https://picsum.photos/seed/vat-training/800/600',
      link: 'https://elawyersbd.com/training-academy/',
      category: 'tax-vat'
    }
  ]
};

const MAIN_TABS: { id: MainTab; label: { en: string; bn: string } }[] = [
  { id: 'legal', label: { en: 'Legal Services', bn: 'আইনি সেবা' } },
  { id: 'tax', label: { en: 'Tax Services', bn: 'কর সেবা' } },
  { id: 'vat', label: { en: 'VAT Services', bn: 'ভ্যাট সেবা' } },
  { id: 'corporate', label: { en: 'Corporate Support', bn: 'কর্পোরেট সহায়তা' } },
  { id: 'finance', label: { en: 'Finance & Accounting', bn: 'ফিন্যান্স ও অ্যাকাউন্টিং' } },
  { id: 'hr', label: { en: 'HR & Payroll', bn: 'এইচআর ও পেরোল' } },
  { id: 'training', label: { en: 'Training & Academy', bn: 'প্রশিক্ষণ ও একাডেমি' } }
];

interface ProfessionalSuiteProps {
  defaultTab?: MainTab;
}

const ProfessionalSuite: React.FC<ProfessionalSuiteProps> = ({ defaultTab = 'legal' }) => {
  const [lang, setLang] = useState<Language>('en');
  const [activeMain, setActiveMain] = useState<MainTab>(defaultTab);
  const [filter, setFilter] = useState<string>('all');

  const filteredServices = SERVICES[activeMain].filter(s => 
    filter === 'all' || s.category === filter
  );

  const categories = Array.from(new Set(SERVICES[activeMain].map(s => s.category)));

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="relative z-10 w-full rounded-[2.5rem] border border-white/80 bg-gradient-to-b from-white/60 to-white/40 backdrop-blur-[60px] p-10 sm:p-14 shadow-[0_30px_90px_-20px_rgba(50,60,100,0.1)] overflow-hidden group transition-all duration-500 hover:shadow-[0_45px_110px_-15px_rgba(50,60,100,0.15)] ring-1 ring-white/60">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/5 to-transparent pointer-events-none opacity-60" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col items-start gap-8 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[11px] font-bold tracking-wide text-indigo-700 uppercase backdrop-blur-md">
                  <Gavel size={11} className="text-indigo-600" />
                  <span>{lang === 'en' ? 'Professional Suite' : 'প্রফেশনাল সুইট'}</span>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1] drop-shadow-sm">
                {lang === 'en' ? 'E-Lawyers' : 'ই-লয়ার্স'} <br />
                <span className="text-indigo-600">{lang === 'en' ? 'Complete Suite' : 'সম্পূর্ণ সুইট'}</span>
              </h1>
              <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed tracking-normal">
                {lang === 'en' 
                  ? 'Specialised professional services across 7 key domains. End-to-end solutions tailored to your needs.'
                  : '৭টি প্রধান ডোমেইন জুড়ে বিশেষায়িত পেশাদার সেবা। আপনার প্রয়োজন অনুযায়ী সম্পূর্ণ সমাধান।'}
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex p-1.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
            <button 
              onClick={() => setLang('en')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                lang === 'en' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              English
            </button>
            <button 
              onClick={() => setLang('bn')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                lang === 'bn' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="flex flex-wrap gap-3 p-2 rounded-[2rem] bg-slate-100/50 backdrop-blur-md border border-slate-200/60 shadow-inner relative z-10">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveMain(tab.id);
              setFilter('all');
            }}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
              activeMain === tab.id
                ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200'
                : 'text-slate-600 hover:bg-white/40'
            }`}
          >
            {tab.label[lang]}
          </button>
        ))}
      </div>

      {/* Sub-tab Controls */}
      <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-600 hover:bg-white/50'
            }`}
          >
            {lang === 'en' ? 'All Services' : 'সকল সেবা'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 capitalize ${
                filter === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredServices.map((service) => (
          <a 
            key={service.id}
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* Service Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title[lang]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white">
                  <service.icon size={20} />
                </div>
              </div>
            </div>

            {/* Service Content */}
            <div className="p-8 flex flex-col flex-1">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  {service.tag[lang]}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {service.title[lang]}
                </h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed line-clamp-2">
                  {service.desc[lang]}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                  {lang === 'en' ? 'Learn More' : 'আরও জানুন'}
                  <ChevronRight size={14} />
                </span>
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <ExternalLink size={14} />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSuite;
