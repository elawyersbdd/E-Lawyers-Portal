import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Percent, 
  Hash, 
  ArrowRightLeft, 
  Info, 
  Copy,
  Check,
  RefreshCw,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
  Loader2,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Papa from 'papaparse';
import { RoutePath } from '../../types';

type CalcMode = 'INCLUDING' | 'EXCLUDING' | 'WITHOUT';

interface CalcResult {
  unitPrice: number;
  vatAmount: number;
  taxAmount: number;
  totalPrice: number;
  netPrice: number;
  totalVat: number;
  totalTax: number;
  grandTotal: number;
}

const VatTaxCalculator: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>('INCLUDING');
  const [inputValue, setInputValue] = useState<string>('100');
  const [vatRate, setVatRate] = useState<string>('10');
  const [taxRate, setTaxRate] = useState<string>('5');
  const [qty, setQty] = useState<string>('1');
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [sheetUrl] = useState('https://docs.google.com/spreadsheets/d/1yKaHDGZLgpbTGvbfRpnl6fAbKbSHNbnHn7Lshtbd8wk/edit?gid=0#gid=0');

  const importFromSheet = async () => {
    setIsSyncing(true);
    try {
      const sheetIdMatch = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (!sheetIdMatch) throw new Error('Invalid Google Sheet URL');
      
      const sheetId = sheetIdMatch[1];
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;
      
      const response = await fetch(csvUrl);
      const csvText = await response.text();
      
      const parsed = Papa.parse(csvText, { header: false });
      const rows = parsed.data as string[][];

      let priceLabel = '';
      if (mode === 'INCLUDING') priceLabel = 'Unit Price including VAT & AIT';
      else if (mode === 'EXCLUDING') priceLabel = 'Unit Price Not including VAT';
      else priceLabel = 'Unit Price without VAT & AIT';

      let foundPrice = '';
      let foundVat = '';
      let foundTax = '';
      let foundQty = '';

      rows.forEach(row => {
        row.forEach((cell, idx) => {
          const cleanCell = cell?.trim();
          if (cleanCell === priceLabel) {
            foundPrice = row[idx + 1]?.trim() || '';
          } else if (cleanCell === 'VAT Rate') {
            if (foundPrice && !foundVat) {
               foundVat = row[idx + 1]?.trim() || '';
            }
          } else if (cleanCell === 'Tax Rate') {
            if (foundPrice && !foundTax) {
              foundTax = row[idx + 1]?.trim() || '';
            }
          } else if (cleanCell === 'Qty') {
            if (foundPrice && !foundQty) {
              foundQty = row[idx + 1]?.trim() || '';
            }
          }
        });
      });

      if (foundPrice) setInputValue(foundPrice);
      if (foundVat) {
        const v = parseFloat(foundVat);
        if (v < 1 && v > 0) setVatRate((v * 100).toFixed(2));
        else setVatRate(foundVat);
      }
      if (foundTax) {
        const t = parseFloat(foundTax);
        if (t < 1 && t > 0) setTaxRate((t * 100).toFixed(2));
        else setTaxRate(foundTax);
      }
      if (foundQty) setQty(foundQty);

    } catch (error) {
      console.error('Error importing from sheet:', error);
      alert('Failed to import data. Please check the URL and ensure the sheet is public.');
    } finally {
      setIsSyncing(false);
    }
  };

  const results = useMemo((): CalcResult => {
    const val = parseFloat(inputValue) || 0;
    const vr = (parseFloat(vatRate) || 0) / 100;
    const tr = (parseFloat(taxRate) || 0) / 100;
    const q = parseFloat(qty) || 1;

    let unitPrice = 0;
    let vatAmount = 0;
    let taxAmount = 0;
    let totalPrice = 0;
    let netPrice = 0;

    if (mode === 'INCLUDING') {
      totalPrice = val;
      const pExclVat = totalPrice / (1 + vr);
      vatAmount = totalPrice - pExclVat;
      taxAmount = pExclVat * tr;
      unitPrice = pExclVat;
      netPrice = pExclVat - taxAmount;
    } else if (mode === 'EXCLUDING') {
      unitPrice = val;
      vatAmount = unitPrice * vr;
      taxAmount = unitPrice * tr;
      totalPrice = unitPrice + vatAmount + taxAmount;
      netPrice = unitPrice - vatAmount - taxAmount;
    } else {
      netPrice = val;
      totalPrice = netPrice / (1 - vr - tr);
      vatAmount = totalPrice * vr;
      taxAmount = totalPrice * tr;
      unitPrice = totalPrice - vatAmount;
    }

    return {
      unitPrice,
      vatAmount,
      taxAmount,
      totalPrice,
      netPrice,
      totalVat: vatAmount * q,
      totalTax: taxAmount * q,
      grandTotal: totalPrice * q
    };
  }, [mode, inputValue, vatRate, taxRate, qty]);

  const handleCopy = () => {
    const text = `
VAT & TAX Calculation Report
Mode: ${mode}
Input Value: ${inputValue}
VAT Rate: ${vatRate}%
Tax Rate: ${taxRate}%
Quantity: ${qty}

Results:
Unit Price: BDT ${results.unitPrice.toFixed(2)}
VAT per Unit: BDT ${results.vatAmount.toFixed(2)}
Tax per Unit: BDT ${results.taxAmount.toFixed(2)}
Total per Unit: BDT ${results.totalPrice.toFixed(2)}
Net per Unit: BDT ${results.netPrice.toFixed(2)}

Totals:
Total VAT: BDT ${results.totalVat.toFixed(2)}
Total Tax: BDT ${results.totalTax.toFixed(2)}
Grand Total: BDT ${results.grandTotal.toFixed(2)}
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setInputValue('100');
    setVatRate('10');
    setTaxRate('5');
    setQty('1');
  };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-20">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 px-2">
        <Link 
          to={RoutePath.RESOURCES}
          className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-bold"
        >
          <div className="p-1.5 rounded-lg bg-white border border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all">
            <ArrowLeft size={14} />
          </div>
          <span>Back to Resources</span>
        </Link>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-slate-400 text-sm font-medium">VAT & TAX Calculator</span>
      </div>

      {/* Header Section */}
      <div className="relative z-10 w-full rounded-[2.5rem] border border-white/80 bg-gradient-to-b from-white/60 to-white/40 backdrop-blur-[60px] p-8 sm:p-12 shadow-[0_30px_90px_-20px_rgba(50,60,100,0.1)] overflow-hidden group transition-all duration-500 hover:shadow-[0_45px_110px_-15px_rgba(50,60,100,0.15)] ring-1 ring-white/60">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none opacity-60" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col items-start gap-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[11px] font-bold tracking-wide text-indigo-700 uppercase backdrop-blur-md">
                  <Calculator size={11} className="text-indigo-600" />
                  <span>VAT & TAX Pro</span>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Professional <br />
                <span className="text-indigo-600">VAT & TAX Calculator</span>
              </h1>
              <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                Accurate computation for VAT and Income Tax based on standard legal frameworks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={importFromSheet}
              disabled={isSyncing}
              className="flex items-center gap-2 px-5 py-3 bg-white/80 hover:bg-white text-indigo-600 border border-indigo-100 rounded-2xl text-sm font-bold transition-all shadow-sm disabled:opacity-50 active:scale-95"
            >
              {isSyncing ? <Loader2 size={18} className="animate-spin" /> : <FileSpreadsheet size={18} />}
              <span>Update from Sheet</span>
            </button>
            <button 
              onClick={reset}
              className="p-3 text-slate-400 hover:text-indigo-600 transition-all rounded-2xl bg-white/80 hover:bg-white border border-slate-100 active:scale-95"
              title="Reset"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-8">
          {/* 1. Input Parameters */}
          <section className="rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={14} className="text-indigo-500" />
              1. Input Parameters
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  <Hash size={14} className="text-indigo-400" />
                  {mode === 'INCLUDING' ? 'Unit Price (Total)' : mode === 'EXCLUDING' ? 'Unit Price (Base)' : 'Unit Price (Net)'}
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-white/60 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-xl text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <Percent size={14} className="text-indigo-400" />
                    VAT Rate (%)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={vatRate}
                    onChange={(e) => setVatRate(e.target.value)}
                    className="w-full bg-white/60 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-lg text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <Percent size={14} className="text-indigo-400" />
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full bg-white/60 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-lg text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Quantity</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full bg-white/60 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-lg text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>
          </section>

          {/* 2. Calculation Mode */}
          <section className="rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <ArrowRightLeft size={14} className="text-indigo-500" />
              2. Calculation Mode
            </h2>
            
            <div className="space-y-3">
              {[
                { id: 'INCLUDING', label: 'Including Tax & VAT', desc: 'Backwards from total' },
                { id: 'EXCLUDING', label: 'Not Including Tax & VAT', desc: 'Forwards from base' },
                { id: 'WITHOUT', label: 'Unit Price without VAT & Tax', desc: 'Forwards from net' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as CalcMode)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group ${
                    mode === m.id 
                      ? 'border-indigo-500 bg-indigo-50/50 shadow-lg shadow-indigo-500/5' 
                      : 'border-slate-100 hover:border-indigo-200 bg-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-bold text-sm mb-1 transition-colors ${mode === m.id ? 'text-indigo-700' : 'text-slate-800'}`}>
                        {m.label}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">{m.desc}</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      mode === m.id ? 'border-indigo-500 bg-indigo-500' : 'border-slate-200'
                    }`}>
                      {mode === m.id && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7">
          <div className="rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.08)] h-full flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Receipt size={14} className="text-indigo-500" />
                3. Calculation Results
              </h2>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-100 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-indigo-500" />}
                <span>{copied ? 'Copied' : 'Copy Report'}</span>
              </button>
            </div>

            <div className="flex-1 space-y-10">
              {/* Grand Total Card */}
              <div className="relative rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-500/20 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-600 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-125">
                  <Calculator size={160} />
                </div>
                <div className="relative z-10">
                  <p className="text-indigo-100 text-xs font-bold uppercase tracking-[0.2em] mb-4">Grand Total Payable</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl opacity-60 font-medium">BDT</span>
                    <span className="text-5xl sm:text-7xl font-black tracking-tighter">
                      {results.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-white/60 border border-slate-100 shadow-sm group hover:border-indigo-200 transition-colors">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total VAT Amount</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 font-bold">BDT</span>
                    <span className="text-3xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {results.totalVat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <div className="p-8 rounded-3xl bg-white/60 border border-slate-100 shadow-sm group hover:border-indigo-200 transition-colors">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Tax Amount</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 font-bold">BDT</span>
                    <span className="text-3xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {results.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* List Breakdown */}
              <div className="space-y-2 pt-4">
                {[
                  { label: 'Unit Price (Excl. VAT)', value: results.unitPrice, color: 'text-slate-600' },
                  { label: 'VAT per Unit', value: results.vatAmount, color: 'text-indigo-600', prefix: '+' },
                  { label: 'Tax per Unit', value: results.taxAmount, color: 'text-violet-600', prefix: '+' },
                  { label: 'Net Price (After All)', value: results.netPrice, color: 'text-emerald-600', isBold: true }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/50 transition-colors">
                    <span className="text-sm font-bold text-slate-500">{item.label}</span>
                    <div className={`text-base font-black ${item.color} flex items-center gap-1.5`}>
                      <span className="text-[10px] opacity-60">BDT</span>
                      <span>{item.prefix}{item.value.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Note */}
              <div className="mt-auto">
                <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100/50 flex gap-4 items-start">
                  <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                    <Info size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-indigo-900">Calculation Methodology</p>
                    <p className="text-[11px] font-medium text-indigo-700/80 leading-relaxed">
                      {mode === 'INCLUDING' 
                        ? 'VAT is computed on the price excluding VAT. Tax is applied on the same base price.' 
                        : mode === 'EXCLUDING' 
                        ? 'VAT and Tax are added directly to the base unit price provided.' 
                        : 'The total is derived such that Net Price = Total Price - VAT - Tax.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest relative z-10">
        <div className="flex items-center gap-2">
          <Calculator size={14} />
          <span>Professional Grade Tool</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-indigo-600 transition-colors">Compliance Guide</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Tax Laws 2026</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
        </div>
      </div>
    </div>
  );
};

export default VatTaxCalculator;
