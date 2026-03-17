import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Building2, BarChart3, Tag, Coins, Receipt, 
  Users, TrendingUp, RefreshCcw, Landmark, FileText, 
  Store, CreditCard, Calculator, MapPin, PieChart,
  CheckCircle2, ExternalLink, MessageSquare, Globe
} from 'lucide-react';
import { RoutePath } from '../../types';

type Language = 'en' | 'bn';

interface Resource {
  id: string;
  title: { en: string; bn: string };
  subtitle: { en: string; bn: string };
  icon: React.ElementType;
  image: string;
  features: { en: string[]; bn: string[] };
  tryLink: string;
  consultLink: string;
  tryLabel: { en: string; bn: string };
}

const RESOURCES: Resource[] = [
  {
    id: 'business-setup',
    title: { en: 'Business Setup Finder', bn: 'ব্যবসা স্থাপন ফাইন্ডার' },
    subtitle: { 
      en: 'Identify the right legal structure for your business in Bangladesh with expert guidance.',
      bn: 'বাংলাদেশে আপনার ব্যবসার জন্য সঠিক আইনি কাঠামো নির্ধারণ করুন—বিশেষজ্ঞ পরামর্শসহ।'
    },
    icon: Building2,
    image: 'https://picsum.photos/seed/business-setup/800/600',
    features: {
      en: ['Compare business types', 'Check eligibility instantly', 'Document guidance', 'Legal compliance ready'],
      bn: ['ব্যবসার ধরন তুলনা করুন', 'যোগ্যতা যাচাই করুন', 'ডকুমেন্ট গাইডলাইন', 'আইনগত প্রস্তুতি']
    },
    tryLink: 'https://elawyersbd.com/legal-business-structures-available-in-bangladesh/',
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Try Finder', bn: 'ফাইন্ডার ব্যবহার করুন' }
  },
  {
    id: 'tax-rate',
    title: { en: 'Tax Rate Finder', bn: 'ট্যাক্স রেট ফাইন্ডার' },
    subtitle: { 
      en: 'Check applicable income tax rates instantly with accurate legal updates.',
      bn: 'সর্বশেষ আইন অনুযায়ী প্রযোজ্য আয়কর হার দ্রুত যাচাই করুন।'
    },
    icon: BarChart3,
    image: 'https://picsum.photos/seed/tax-rate/800/600',
    features: {
      en: ['Individual & corporate rates', 'Updated slabs', 'Instant results', 'Legal compliance'],
      bn: ['ব্যক্তি ও কোম্পানি হার', 'আপডেটেড স্ল্যাব', 'তাৎক্ষণিক ফলাফল', 'আইনগত সম্মতি']
    },
    tryLink: RoutePath.PAYROLL_CALCULATOR,
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Try Finder', bn: 'ফাইন্ডার ব্যবহার করুন' }
  },
  {
    id: 'vat-rate',
    title: { en: 'VAT Rate Finder', bn: 'ভ্যাট রেট ফাইন্ডার' },
    subtitle: { 
      en: 'Determine the correct VAT rate for your product or service as per NBR rules.',
      bn: 'এনবিআর নিয়ম অনুযায়ী পণ্য বা সেবার সঠিক ভ্যাট হার নির্ধারণ করুন।'
    },
    icon: Tag,
    image: 'https://picsum.photos/seed/vat-rate/800/600',
    features: {
      en: ['Standard & reduced rates', 'NBR compliant', 'Sector wise classification', 'Avoid penalties'],
      bn: ['স্ট্যান্ডার্ড ও রিডিউসড হার', 'এনবিআর সম্মত', 'সেক্টর ভিত্তিক', 'জরিমানা এড়ান']
    },
    tryLink: '#',
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Try Finder', bn: 'ফাইন্ডার ব্যবহার করুন' }
  },
  {
    id: 'tax-rebate',
    title: { en: 'Tax Rebate Calculator', bn: 'ট্যাক্স রিবেট ক্যালকুলেটর' },
    subtitle: { 
      en: 'Estimate your eligible tax rebate based on investment and legal limits.',
      bn: 'বিনিয়োগ ও আইনগত সীমার ভিত্তিতে আপনার প্রাপ্য ট্যাক্স রিবেট হিসাব করুন।'
    },
    icon: Coins,
    image: 'https://picsum.photos/seed/tax-rebate/800/600',
    features: {
      en: ['Investment limits', 'Auto calculation', 'Tax saving insights', 'Legal compliance'],
      bn: ['বিনিয়োগ সীমা', 'স্বয়ংক্রিয় হিসাব', 'ট্যাক্স সেভিং', 'আইনগত সম্মতি']
    },
    tryLink: RoutePath.PAYROLL_CALCULATOR,
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Try Calculator', bn: 'ক্যালকুলেটর ব্যবহার করুন' }
  },
  {
    id: 'tds-calc',
    title: { en: 'TDS Calculator', bn: 'টিডিএস ক্যালকুলেটর' },
    subtitle: { 
      en: 'Calculate Tax Deducted at Source as per applicable rules.',
      bn: 'প্রযোজ্য নিয়ম অনুযায়ী উৎসে কর কর্তন (TDS) হিসাব করুন।'
    },
    icon: Receipt,
    image: 'https://picsum.photos/seed/tds-calculator/800/600',
    features: {
      en: ['Contractor TDS', 'Rent deduction', 'Service TDS', 'Monthly ready'],
      bn: ['কন্ট্রাক্টর টিডিএস', 'ভাড়া কর্তন', 'সেবা টিডিএস', 'মাসিক প্রস্তুত']
    },
    tryLink: RoutePath.PAYROLL_CALCULATOR,
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Try Calculator', bn: 'ক্যালকুলেটর ব্যবহার করুন' }
  },
  {
    id: 'payroll-calc',
    title: { en: 'Payroll Calculator', bn: 'পেরোল ক্যালকুলেটর' },
    subtitle: { 
      en: 'Automate salary and deduction calculations for employees.',
      bn: 'কর্মীদের বেতন ও কর্তন স্বয়ংক্রিয়ভাবে হিসাব করুন।'
    },
    icon: Users,
    image: 'https://picsum.photos/seed/payroll-calculator/800/600',
    features: {
      en: ['Gross to net', 'Tax adjustment', 'PF deduction', 'HR friendly'],
      bn: ['গ্রস থেকে নেট', 'ট্যাক্স সমন্বয়', 'PF কর্তন', 'HR বান্ধব']
    },
    tryLink: RoutePath.PAYROLL_CALCULATOR,
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Try Calculator', bn: 'ক্যালকুলেটর ব্যবহার করুন' }
  },
  {
    id: 'tax-liability',
    title: { en: 'Tax Liability Calculator', bn: 'ট্যাক্স লায়াবিলিটি ক্যালকুলেটর' },
    subtitle: { 
      en: 'Know your total payable income tax instantly with legal accuracy.',
      bn: 'আইনগত সঠিকতাসহ আপনার মোট আয়কর দায় দ্রুত জানুন।'
    },
    icon: TrendingUp,
    image: 'https://picsum.photos/seed/tax-liability/800/600',
    features: {
      en: ['Progressive slabs', 'Instant result', 'Legal compliance', 'Risk free'],
      bn: ['প্রগ্রেসিভ স্ল্যাব', 'তাৎক্ষণিক ফলাফল', 'আইনগত সম্মতি', 'ঝুঁকিমুক্ত']
    },
    tryLink: RoutePath.PAYROLL_CALCULATOR,
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Try Calculator', bn: 'ক্যালকুলেটর ব্যবহার করুন' }
  },
  {
    id: 'vat-tax-calc',
    title: { en: 'VAT & Tax Calculator', bn: 'ভ্যাট ও ট্যাক্স ক্যালকুলেটর' },
    subtitle: { 
      en: 'Integrated calculator for VAT and income tax computation.',
      bn: 'ভ্যাট ও আয়কর একসাথে হিসাব করার সমন্বিত ক্যালকুলেটর।'
    },
    icon: RefreshCcw,
    image: 'https://picsum.photos/seed/vat-tax-calculator/800/600',
    features: {
      en: ['Combined tool', 'Instant breakdown', 'Business ready', 'Time saving'],
      bn: ['সমন্বিত টুল', 'তাৎক্ষণিক বিভাজন', 'ব্যবসা প্রস্তুত', 'সময় সাশ্রয়']
    },
    tryLink: RoutePath.CALCULATOR,
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Try Calculator', bn: 'ক্যালকুলেটর ব্যবহার করুন' }
  },
  {
    id: 'rjsc-deadline',
    title: { en: 'RJSC Deadline Finder', bn: 'আরজেএসসি ডেডলাইন ফাইন্ডার' },
    subtitle: { 
      en: 'Track company return filing deadlines to maintain compliance.',
      bn: 'কমপ্লায়েন্স বজায় রাখতে কোম্পানি রিটার্ন ফাইলিং ডেডলাইন ট্র্যাক করুন।'
    },
    icon: Landmark,
    image: 'https://picsum.photos/seed/rjsc-deadline/800/600',
    features: {
      en: ['Annual return', 'Compliance alert', 'Penalty avoid', 'Reminder system'],
      bn: ['বার্ষিক রিটার্ন', 'কমপ্লায়েন্স সতর্কতা', 'জরিমানা এড়ান', 'রিমাইন্ডার']
    },
    tryLink: 'https://academy.elawyersbd.com/rjsc-deadline/',
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Check Deadline', bn: 'ডেডলাইন দেখুন' }
  },
  {
    id: 'company-reg',
    title: { en: 'Company Registration Form', bn: 'কোম্পানি রেজিস্ট্রেশন ফর্ম' },
    subtitle: { 
      en: 'Apply for company registration with expert guidance and support.',
      bn: 'বিশেষজ্ঞ সহায়তাসহ কোম্পানি রেজিস্ট্রেশন আবেদন করুন।'
    },
    icon: FileText,
    image: 'https://picsum.photos/seed/company-registration/800/600',
    features: {
      en: ['Name clearance', 'MOA guidance', 'RJSC filing', 'Full support'],
      bn: ['নাম ক্লিয়ারেন্স', 'MOA গাইডলাইন', 'আরজেএসসি ফাইলিং', 'সম্পূর্ণ সহায়তা']
    },
    tryLink: '#',
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Apply Now', bn: 'আবেদন করুন' }
  },
  {
    id: 'trade-licence',
    title: { en: 'Trade Licence Form', bn: 'ট্রেড লাইসেন্স ফর্ম' },
    subtitle: { 
      en: 'Apply or renew trade licence as per city corporation rules.',
      bn: 'সিটি কর্পোরেশন নিয়ম অনুযায়ী ট্রেড লাইসেন্স আবেদন/নবায়ন করুন।'
    },
    icon: Store,
    image: 'https://picsum.photos/seed/trade-licence/800/600',
    features: {
      en: ['City support', 'Checklist', 'New & renewal', 'Fast process'],
      bn: ['সিটি সহায়তা', 'চেকলিস্ট', 'নতুন ও নবায়ন', 'দ্রুত প্রসেস']
    },
    tryLink: '#',
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Apply Now', bn: 'আবেদন করুন' }
  },
  {
    id: 'tin-reg',
    title: { en: 'TIN Registration Form', bn: 'টিআইএন রেজিস্ট্রেশন ফর্ম' },
    subtitle: { 
      en: 'Obtain your e-TIN with accurate NBR compliant application.',
      bn: 'এনবিআর সম্মতভাবে ই-টিআইএন আবেদন করুন।'
    },
    icon: CreditCard,
    image: 'https://picsum.photos/seed/tin-registration/800/600',
    features: {
      en: ['Online submission', 'Error free', 'NBR ready', 'Quick process'],
      bn: ['অনলাইন সাবমিশন', 'ত্রুটিমুক্ত', 'এনবিআর প্রস্তুত', 'দ্রুত প্রসেস']
    },
    tryLink: '#',
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Apply Now', bn: 'আবেদন করুন' }
  },
  {
    id: 'vat-reg',
    title: { en: 'VAT Registration Form', bn: 'ভ্যাট রেজিস্ট্রেশন ফর্ম' },
    subtitle: { 
      en: 'Register BIN as per VAT law for business compliance.',
      bn: 'ব্যবসা সম্মতির জন্য ভ্যাট আইন অনুযায়ী BIN রেজিস্ট্রেশন করুন।'
    },
    icon: Calculator,
    image: 'https://picsum.photos/seed/vat-registration/800/600',
    features: {
      en: ['BIN support', 'Mushak guidance', 'Compliance', 'Fast approval'],
      bn: ['BIN সহায়তা', 'মুশক গাইডলাইন', 'কমপ্লায়েন্স', 'দ্রুত অনুমোদন']
    },
    tryLink: '#',
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Apply Now', bn: 'আবেদন করুন' }
  },
  {
    id: 'company-cost',
    title: { en: 'Company Cost Calculator', bn: 'কোম্পানি খরচ ক্যালকুলেটর' },
    subtitle: { 
      en: 'Estimate company formation cost including government fees.',
      bn: 'সরকারি ফি সহ কোম্পানি গঠন খরচ হিসাব করুন।'
    },
    icon: Calculator,
    image: 'https://picsum.photos/seed/company-cost/800/600',
    features: {
      en: ['Govt fees', 'Capital based', 'RJSC breakdown', 'Budget plan'],
      bn: ['সরকারি ফি', 'ক্যাপিটাল ভিত্তিক', 'আরজেএসসি বিভাজন', 'বাজেট পরিকল্পনা']
    },
    tryLink: '#',
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Estimate Cost', bn: 'খরচ হিসাব করুন' }
  },
  {
    id: 'trade-cost',
    title: { en: 'Trade Licence Cost', bn: 'ট্রেড লাইসেন্স খরচ' },
    subtitle: { 
      en: 'Calculate trade licence cost based on city corporation rules.',
      bn: 'সিটি কর্পোরেশন নিয়ম অনুযায়ী ট্রেড লাইসেন্স খরচ হিসাব করুন।'
    },
    icon: MapPin,
    image: 'https://picsum.photos/seed/trade-licence-cost/800/600',
    features: {
      en: ['Area based', 'Transparent', 'City variation', 'Smart planning'],
      bn: ['এলাকা ভিত্তিক', 'স্বচ্ছ হিসাব', 'সিটি ভেরিয়েশন', 'পরিকল্পনা']
    },
    tryLink: 'https://elawyersbd.com/trade-license/',
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Estimate Cost', bn: 'খরচ হিসাব করুন' }
  },
  {
    id: 'rebate-limit',
    title: { en: 'Investment Rebate Limit', bn: 'বিনিয়োগ রিবেট সীমা' },
    subtitle: { 
      en: 'Calculate maximum investment limit eligible for tax rebate.',
      bn: 'ট্যাক্স রিবেটের জন্য সর্বোচ্চ বিনিয়োগ সীমা হিসাব করুন।'
    },
    icon: PieChart,
    image: 'https://picsum.photos/seed/investment-rebate/800/600',
    features: {
      en: ['Section based', 'Auto compute', 'Tax saving', 'Planning ready'],
      bn: ['সেকশন ভিত্তিক', 'স্বয়ংক্রিয় হিসাব', 'ট্যাক্স সেভিং', 'পরিকল্পনা']
    },
    tryLink: RoutePath.PAYROLL_CALCULATOR,
    consultLink: 'https://academy.elawyersbd.com/meetingtag/',
    tryLabel: { en: 'Try Calculator', bn: 'ক্যালকুলেটর' }
  }
];

import ServiceSummary from '../../components/ServiceSummary';

const Resources: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="relative z-10 w-full rounded-[2.5rem] border border-white/80 bg-gradient-to-b from-white/60 to-white/40 backdrop-blur-[60px] p-10 sm:p-14 shadow-[0_30px_90px_-20px_rgba(50,60,100,0.1)] overflow-hidden group transition-all duration-500 hover:shadow-[0_45px_110px_-15px_rgba(50,60,100,0.15)] ring-1 ring-white/60">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/5 to-transparent pointer-events-none opacity-60" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col items-start gap-8 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[11px] font-bold tracking-wide text-indigo-700 uppercase backdrop-blur-md">
                  <BookOpen size={11} className="text-indigo-600" />
                  <span>{lang === 'en' ? 'Knowledge Base' : 'জ্ঞান ভাণ্ডার'}</span>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1] drop-shadow-sm">
                {lang === 'en' ? 'Professional' : 'পেশাদার'} <br />
                <span className="text-indigo-600">{lang === 'en' ? 'Legal Resources' : 'আইনি সম্পদ'}</span>
              </h1>
              <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed tracking-normal">
                {lang === 'en' 
                  ? 'Access expert tools, finders, and calculators to navigate the legal and tax landscape of Bangladesh.'
                  : 'বাংলাদেশের আইনি ও কর ব্যবস্থা পরিচালনার জন্য বিশেষজ্ঞ টুলস, ফাইন্ডার এবং ক্যালকুলেটর ব্যবহার করুন।'}
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

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {RESOURCES.map((resource) => (
          <div 
            key={resource.id}
            className="group flex flex-col rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* Resource Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={resource.image} 
                alt={resource.title[lang]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white">
                  <resource.icon size={20} />
                </div>
              </div>
            </div>

            {/* Resource Content */}
            <div className="p-8 flex flex-col flex-1">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {resource.title[lang]}
                </h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {resource.subtitle[lang]}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {resource.features[lang].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 mt-auto">
                {resource.tryLink.startsWith('/') ? (
                  <Link 
                    to={resource.tryLink}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    <span>{resource.tryLabel[lang]}</span>
                    <Calculator size={14} />
                  </Link>
                ) : (
                  <a 
                    href={resource.tryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    <span>{resource.tryLabel[lang]}</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                <a 
                  href={resource.consultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-indigo-600 bg-white px-4 py-3 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white active:scale-[0.98]"
                >
                  <MessageSquare size={14} />
                  <span>{lang === 'en' ? 'Consultation' : 'পরামর্শ'}</span>
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

export default Resources;
