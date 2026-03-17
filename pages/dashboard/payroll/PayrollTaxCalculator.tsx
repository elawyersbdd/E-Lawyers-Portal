import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { 
  Calculator, 
  User,
  Briefcase, 
  DollarSign, 
  PieChart, 
  Download, 
  Printer, 
  Info,
  MapPin,
  Phone,
  Building2,
  Users,
  Mail,
  Percent,
  TrendingUp,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  EmployeeInfo, 
  SalaryDetails, 
  CalculationResult 
} from './types';
import { 
  INITIAL_EMPLOYEE_INFO, 
  INITIAL_SALARY_DETAILS, 
  TAX_SLABS_CONFIG, 
  THRESHOLDS, 
  MIN_TAX 
} from './constants';

export default function App() {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo>(INITIAL_EMPLOYEE_INFO);
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetails>(INITIAL_SALARY_DETAILS);
  const [investment, setInvestment] = useState<number>(0);
  const [tds, setTds] = useState<number>(0);
  const [showRebateModal, setShowRebateModal] = useState(false);

  const results = useMemo((): CalculationResult => {
    const { 
      basicSalary, houseRent, medicalAllowance, conveyanceAllowance, 
      allowance, eidBonus, employerContributionPF, employeeContributionPF, leaveEncashment, 
      overtime, otherMonthlyBenefits, otherYearlyBenefits 
    } = salaryDetails;

    // Monthly components (B19-B28)
    const monthlyTotal = basicSalary + houseRent + medicalAllowance + conveyanceAllowance + 
      allowance + employerContributionPF + leaveEncashment + overtime + otherMonthlyBenefits;
    
    // Annual Gross (C30)
    const annualGrossFromInputs = (monthlyTotal * 12) + eidBonus + otherYearlyBenefits;

    let taxableIncome = 0;
    if (employeeInfo.companyType === 'Government Company') {
      // For Govt employees (A40-C46): Only Basic and Bonus are taxable
      taxableIncome = (basicSalary * 12) + eidBonus + otherYearlyBenefits;
    } else {
      // For Private employees (A32-C37): 1/3 of total income or 500,000 is exempt
      const exemption = Math.min(annualGrossFromInputs / 3, 500000);
      taxableIncome = annualGrossFromInputs - exemption;
    }

    const threshold = THRESHOLDS[employeeInfo.gender];
    let remainingIncome = taxableIncome;
    let totalTax = 0;
    const slabsResult = [];

    const firstSlabAmount = Math.min(remainingIncome, threshold);
    slabsResult.push({
      label: `On First Tk. ${threshold.toLocaleString()}`,
      taxableAmount: firstSlabAmount,
      rate: 0,
      liability: 0
    });
    remainingIncome -= firstSlabAmount;

    for (let i = 1; i < TAX_SLABS_CONFIG.length; i++) {
      const slab = TAX_SLABS_CONFIG[i];
      if (remainingIncome <= 0) break;

      const amountInSlab = Math.min(remainingIncome, slab.limit);
      const liability = amountInSlab * slab.rate;
      
      slabsResult.push({
        label: `${slab.label} Tk. ${slab.limit === Infinity ? 'Rest' : slab.limit.toLocaleString()}`,
        taxableAmount: amountInSlab,
        rate: slab.rate * 100,
        liability: liability
      });

      totalTax += liability;
      remainingIncome -= amountInSlab;
    }

    const minTax = MIN_TAX[employeeInfo.location];
    const threePercentTaxable = taxableIncome * 0.03;
    const maxLimit = 1000000;
    
    // User's multi-step formula:
    // 1st: Max Eligible Rebate = IF(Total Tax < Min Tax, 0, MIN(3% Taxable, 1M))
    const maxEligibleRebate = totalTax < minTax ? 0 : Math.min(threePercentTaxable, maxLimit);
    
    // 2nd: Required Investment = Max Eligible Rebate / 15 * 100
    const requiredInvestment = (maxEligibleRebate / 15) * 100;
    
    // 3rd: Actual Rebate = MIN(Actual Investment, Required Investment) * 0.15
    const rebate = Math.min(investment, requiredInvestment) * 0.15;
    
    let netTaxPayable = Math.max(0, totalTax - rebate);
    
    if (netTaxPayable > 0 && netTaxPayable < minTax) {
      netTaxPayable = minTax;
    }

    const finalTaxPayable = Math.max(0, netTaxPayable - tds);
    const monthlyTax = finalTaxPayable / 12;
    
    // Monthly Breakdown (A74-D700)
    // Monthly Gross = Monthly Total + (Yearly / 12)
    const monthlyGross = monthlyTotal + (eidBonus / 12) + (otherYearlyBenefits / 12);
    // Monthly Net Pay = Monthly Gross - Monthly Tax - Monthly Employee PF
    const monthlyNetPay = monthlyGross - monthlyTax - employeeContributionPF;
    
    const takeHomePay = monthlyNetPay;
    const monthlyIncome = monthlyGross;

    return {
      totalGrossSalary: annualGrossFromInputs,
      taxableIncome,
      taxLiabilityBeforeRebate: totalTax,
      rebate,
      rebateDetails: {
        threePercentTaxable,
        fifteenPercentInvestment: investment * 0.15,
        maxEligibleRebate,
        requiredInvestment,
        actualRebate: rebate
      },
      netTaxPayable: finalTaxPayable,
      monthlyTax,
      monthlyNetPay,
      takeHomePay,
      monthlyIncome,
      slabs: slabsResult
    };
  }, [employeeInfo, salaryDetails, investment, tds]);

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalaryDetails(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Calculator size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Payroll & Tax BD</h1>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Assessment Year 2026-2027</p>
            </div>
          </motion.div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Printer size={18} />
              <span className="hidden sm:inline">Print Report</span>
            </button>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 flex items-center gap-2">
              <Download size={18} />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="space-y-8">
            
            {/* Employee Information (A6-B13) */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-emerald-600" />
                  <h2 className="font-semibold text-gray-800">Employee Information</h2>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      value={employeeInfo.name}
                      onChange={handleEmployeeChange}
                      placeholder="e.g. John Doe"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      name="mobile"
                      value={employeeInfo.mobile}
                      onChange={handleEmployeeChange}
                      placeholder="017XXXXXXXX"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      value={employeeInfo.email}
                      onChange={handleEmployeeChange}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender / Status</label>
                  <select 
                    name="gender"
                    value={employeeInfo.gender}
                    onChange={handleEmployeeChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none appearance-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Disable Person">Disable Person</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location</label>
                  <div className="relative">
                    <select 
                      name="location"
                      value={employeeInfo.location}
                      onChange={handleEmployeeChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none appearance-none"
                    >
                      <option value="Dhaka or Chattogram City Corporation">Dhaka/Chattogram City Corp</option>
                      <option value="Any other City Corporation">Other City Corp</option>
                      <option value="Any area other than City Corporation">Non-City Area</option>
                    </select>
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    Employer Name
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="employerName"
                      value={employeeInfo.employerName}
                      onChange={handleEmployeeChange}
                      placeholder="Company Name"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Company Type</label>
                  <div className="relative">
                    <select 
                      name="companyType"
                      value={employeeInfo.companyType}
                      onChange={handleEmployeeChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none appearance-none"
                    >
                      <option value="Private Company">Private Company</option>
                      <option value="Government Company">Government Company</option>
                    </select>
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Salary Details (A17-C30) */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-emerald-600" />
                  <h2 className="font-semibold text-gray-800">Salary Components</h2>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">Monthly / Yearly</span>
              </div>
              <div className="p-6 grid grid-cols-1 gap-y-4">
                {[
                  { label: 'Basic Salary (Monthly)', name: 'basicSalary' },
                  { label: 'House Rent (Monthly)', name: 'houseRent' },
                  { label: 'Medical Allowance (Monthly)', name: 'medicalAllowance' },
                  { label: 'Conveyance (Monthly)', name: 'conveyanceAllowance' },
                  { label: 'Other Allowance (Monthly)', name: 'allowance' },
                  { label: 'Employer PF (Monthly)', name: 'employerContributionPF' },
                  { label: 'Employee PF (Monthly)', name: 'employeeContributionPF' },
                  { label: 'Leave Encashment (Monthly)', name: 'leaveEncashment' },
                  { label: 'Overtime (Monthly)', name: 'overtime' },
                  { label: 'Other Monthly Benefits', name: 'otherMonthlyBenefits' },
                  { label: 'Eid Bonus (Yearly)', name: 'eidBonus' },
                  { label: 'Other Yearly Benefits', name: 'otherYearlyBenefits' },
                ].map((field) => (
                  <div key={field.name} className="flex items-center justify-between group">
                    <label className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{field.label}</label>
                    <div className="relative w-40">
                      <input 
                        type="number" 
                        name={field.name}
                        value={(salaryDetails as any)[field.name] || ''}
                        onChange={handleSalaryChange}
                        className="w-full text-right pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-sm font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Investment & Deductions */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <PieChart size={18} className="text-emerald-600" />
                <h2 className="font-semibold text-gray-800">Investment & Deductions</h2>
              </div>
              <div className="p-6 grid grid-cols-1 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Annual Investment</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={investment || ''}
                      onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none font-mono"
                    />
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  <p className="text-[10px] text-gray-400 italic">DPS, Savings Certificate, Insurance, etc.</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">TDS / Already Paid (Adjusted)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={tds || ''}
                      onChange={(e) => setTds(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none font-mono"
                    />
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Tax deducted at source or advance tax</p>
                </div>
              </div>
            </motion.section>

            {/* Monthly Payslip Breakdown */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Monthly Payslip Breakdown</h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Standard Month</span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Basic Salary</span>
                  <span className="font-medium">{formatCurrency(salaryDetails.basicSalary)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Monthly Allowances & Benefits</span>
                  <span className="font-medium">{formatCurrency(
                    salaryDetails.houseRent + 
                    salaryDetails.medicalAllowance + 
                    salaryDetails.conveyanceAllowance + 
                    salaryDetails.allowance + 
                    salaryDetails.otherMonthlyBenefits +
                    salaryDetails.employerContributionPF +
                    salaryDetails.leaveEncashment +
                    salaryDetails.overtime
                  )}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Yearly Bonus (Monthly Portion)</span>
                  <span className="font-medium">{formatCurrency((salaryDetails.eidBonus + salaryDetails.otherYearlyBenefits) / 12)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-50">
                  <span className="font-semibold text-gray-700">Monthly Gross Income</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(results.monthlyIncome)}</span>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm text-red-500">
                    <span>Income Tax (Monthly)</span>
                    <span>-{formatCurrency(results.monthlyTax)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-500">
                    <span>Employee PF (Monthly)</span>
                    <span>-{formatCurrency(salaryDetails.employeeContributionPF)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-base pt-3 border-t border-gray-100">
                  <span className="font-bold text-gray-900">Net Take Home</span>
                  <span className="font-bold text-emerald-600">{formatCurrency(results.monthlyNetPay)}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100"
            >
              <div className="flex gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 h-fit">
                  <Info size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-blue-900">Tax Saving Tip</h4>
                  <p className="text-xs text-blue-800/70 leading-relaxed">
                    You can claim up to 15% rebate on your eligible investments. 
                    Maximize your DPS and Savings Certificates to reduce your net tax liability.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Results & Optimization */}
          <div className="space-y-6">
            
            {/* Summary Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-900 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-200 relative overflow-hidden"
            >
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-emerald-300 text-sm font-medium uppercase tracking-widest">Monthly Net Pay</span>
                      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                        <DollarSign size={20} />
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <AnimatePresence mode="wait">
                        <motion.h3 
                          key={results.monthlyNetPay}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-5xl font-bold tracking-tighter mb-1"
                        >
                          {formatCurrency(results.monthlyNetPay)}
                        </motion.h3>
                      </AnimatePresence>
                      <p className="text-emerald-400 text-xs font-medium">Estimated monthly take-home after tax & PF</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                      <div>
                        <p className="text-emerald-400 text-[10px] uppercase font-bold tracking-wider mb-1">Annual Net</p>
                        <p className="text-xl font-bold">{formatCurrency(results.monthlyNetPay * 12)}</p>
                      </div>
                      <div>
                        <p className="text-emerald-400 text-[10px] uppercase font-bold tracking-wider mb-1">Monthly Tax</p>
                        <p className="text-xl font-bold">{formatCurrency(results.monthlyTax)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Investment Rebate Limit Box */}
                <motion.a
                  href="https://elawyersbd.com/investment-rebate-limit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03, translateY: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="block bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200 group relative overflow-hidden border border-white/10"
                >
                  {/* Animated background elements */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl group-hover:bg-indigo-400/30 transition-colors duration-500" />
                  
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-all duration-500 group-hover:scale-110">
                    <ExternalLink size={64} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner">
                        <TrendingUp size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl leading-tight">Investment Rebate Limit</h3>
                        <p className="text-indigo-100 text-xs font-medium opacity-80">Maximize your tax savings</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/5">
                        <p className="text-indigo-200 text-[10px] uppercase font-black tracking-widest mb-2">Max Eligible Investment</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-4xl font-black tracking-tighter">
                            {formatCurrency(results.rebateDetails.requiredInvestment)}
                          </p>
                          <span className="text-indigo-300 text-xs font-bold uppercase">Yearly</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">Plan your investments</span>
                          <span className="text-[10px] text-indigo-200 uppercase tracking-wider font-medium">Click to learn where & how</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold bg-white text-indigo-700 px-5 py-2.5 rounded-2xl group-hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20">
                          View Details <ExternalLink size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>

            {/* Detailed Breakdown (C48, A51-D59) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Tax Calculation Breakdown (C48, A51-D59)</h3>
                <Info size={16} className="text-gray-400 cursor-help" />
              </div>
              <div className="p-6 space-y-4">
                
                {/* Taxable Income Row */}
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Taxable Income</span>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(results.taxableIncome)}</span>
                </div>

                {/* Slabs */}
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tax Slabs Applied</p>
                  {results.slabs.map((slab, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-xs">{slab.label}</span>
                        <span className="text-[10px] text-gray-400">@{slab.rate}% on {formatCurrency(slab.taxableAmount)}</span>
                      </div>
                      <span className="font-medium text-gray-700">{formatCurrency(slab.liability)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-4 space-y-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Annual Gross Salary (C30)</span>
                    <span className="font-medium text-gray-900">{formatCurrency(results.totalGrossSalary)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Taxable Income (C48)</span>
                    <span className="font-medium text-gray-900">{formatCurrency(results.taxableIncome)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Tax Liability</span>
                    <span className="font-medium text-gray-900">{formatCurrency(results.taxLiabilityBeforeRebate)}</span>
                  </div>
                  <div 
                    className="flex items-center justify-between text-sm cursor-pointer hover:bg-emerald-50 p-1 -m-1 rounded transition-colors group"
                    onClick={() => setShowRebateModal(true)}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500 underline decoration-dotted underline-offset-4">Investment Rebate</span>
                      <Info size={12} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-medium text-emerald-600">-{formatCurrency(results.rebate)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="font-bold text-gray-900">Net Tax Payable (Annual)</span>
                    <span className="font-bold text-emerald-600 text-lg">{formatCurrency(results.netTaxPayable)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Investment Optimization Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-emerald-100 bg-emerald-50/50">
                <h3 className="font-semibold text-emerald-900 flex items-center gap-2">
                  <TrendingUp size={16} />
                  Investment Optimization Analysis
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">1. Max Eligible Rebate</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(results.rebateDetails.maxEligibleRebate)}</p>
                    <p className="text-[10px] text-gray-500 mt-1">MIN(3% Taxable, 1M)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 ring-1 ring-emerald-500/10">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">2. Remaining Target Investment</p>
                    <p className="text-lg font-bold text-emerald-700">{formatCurrency(Math.max(0, results.rebateDetails.requiredInvestment - investment))}</p>
                    <p className="text-[10px] text-emerald-600 mt-1">Investment needed for max rebate</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">3. Actual Rebate</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(results.rebateDetails.actualRebate)}</p>
                    <p className="text-[10px] text-gray-500 mt-1">15% of MIN(Actual, Target)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Current Investment</span>
                    <span className="font-medium text-gray-900">{formatCurrency(investment)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Investment Gap</span>
                    <span className={`font-medium ${results.rebateDetails.requiredInvestment > investment ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {results.rebateDetails.requiredInvestment > investment 
                        ? `Shortfall: ${formatCurrency(results.rebateDetails.requiredInvestment - investment)}`
                        : 'Fully Optimized'}
                    </span>
                  </div>
                  
                  <div className="relative pt-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (investment / (results.rebateDetails.requiredInvestment || 1)) * 100)}%` }}
                        className={`h-full rounded-full ${investment >= results.rebateDetails.requiredInvestment ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 text-center">
                      {investment >= results.rebateDetails.requiredInvestment 
                        ? "You have invested enough to claim the maximum possible rebate."
                        : `Invest ${formatCurrency(results.rebateDetails.requiredInvestment - investment)} more to maximize your tax savings.`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Optimized Scenario Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-emerald-50 rounded-2xl border-2 border-emerald-200 p-6 shadow-sm"
            >
              <h3 className="text-emerald-900 font-bold text-sm mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-600" />
                If you invested the maximum opportunity of shortfalls, what would be your next tax payable?
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-emerald-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Remaining Target Investment</span>
                    <span className="text-lg font-bold text-emerald-700">{formatCurrency(Math.max(0, results.rebateDetails.requiredInvestment - investment))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Max Rebate Potential</span>
                    <span className="text-lg font-bold text-emerald-700">{formatCurrency(results.rebateDetails.maxEligibleRebate)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">TDS / Advanced Payment (Adjusted)</label>
                    <div className="relative w-32">
                      <input 
                        type="number" 
                        value={tds || ''}
                        onChange={(e) => setTds(parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full text-right pr-4 py-1.5 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-sm font-mono"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-emerald-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">Optimized Net Tax Payable</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-emerald-600">
                          {formatCurrency(Math.max(0, results.taxLiabilityBeforeRebate - results.rebateDetails.maxEligibleRebate - tds))}
                        </span>
                        <p className="text-[10px] text-emerald-600 font-medium">Annualized with max rebate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Rebate Details Section (D65-A62) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 bg-emerald-50/30">
                <h3 className="font-semibold text-emerald-900 flex items-center gap-2">
                  <Percent size={16} />
                  Investment Rebate Details
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  The tax rebate is calculated based on your eligible investments and taxable income limits.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-700">Maximum Rebate Limit</span>
                      <span className="text-[10px] text-gray-400">Statutory limit</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">BDT 1,000,000</span>
                  </div>

                  {results.rebateDetails.threePercentTaxable < MIN_TAX[employeeInfo.location] && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
                      <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-700 leading-tight">
                        Rebate is not applicable because 3% of your taxable income ({formatCurrency(results.rebateDetails.threePercentTaxable)}) is less than the minimum tax ({formatCurrency(MIN_TAX[employeeInfo.location])}).
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-700">3% of Taxable Income</span>
                      <span className="text-[10px] text-gray-400">3% of {formatCurrency(results.taxableIncome)}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(results.rebateDetails.threePercentTaxable)}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 ring-1 ring-emerald-500/10">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-emerald-900">15% of Actual Investment</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-700">{formatCurrency(results.rebateDetails.fifteenPercentInvestment)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">Final Rebate Applied</span>
                    <span className="text-lg font-bold text-emerald-600">{formatCurrency(results.rebate)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Calculator size={20} />
            <span className="text-sm font-medium">Payroll & Tax Calculator BD</span>
          </div>
          <p className="text-xs text-gray-400">
            Disclaimer: This calculator is for informational purposes only. Please consult with a tax professional for official filings.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors"><Mail size={18} /></a>
            <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors"><Users size={18} /></a>
          </div>
        </div>
      </footer>

      {/* Rebate Breakdown Modal */}
      <AnimatePresence>
        {showRebateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRebateModal(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-gray-100 bg-emerald-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 rounded-xl text-white">
                    <Percent size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Rebate Calculation</h3>
                </div>
                <button 
                  onClick={() => setShowRebateModal(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <Calculator size={20} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-1">1</div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 mb-1">Max Eligible Rebate</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Calculated as 3% of your taxable income ({formatCurrency(results.taxableIncome)}), capped at Tk. 1,000,000.
                      </p>
                      <div className="mt-2 text-emerald-600 font-mono text-xs font-bold">
                        Result: {formatCurrency(results.rebateDetails.maxEligibleRebate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-1">2</div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 mb-1">Remaining Target Investment</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        To claim the full rebate above, you need to invest an amount that, at a 15% rate, equals the max rebate. This target is adjusted based on your current annual investment.
                      </p>
                      <div className="mt-2 text-emerald-600 font-mono text-xs font-bold">
                        Target: {formatCurrency(results.rebateDetails.requiredInvestment)} <br/>
                        Remaining: {formatCurrency(Math.max(0, results.rebateDetails.requiredInvestment - investment))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-1">3</div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 mb-1">Actual Rebate Applied</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We take the minimum of your actual investment ({formatCurrency(investment)}) and the target investment, then multiply by 15%.
                      </p>
                      <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                          <span>Calculation</span>
                          <span>Value</span>
                        </div>
                        <div className="space-y-1 font-mono text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Min(Actual, Target)</span>
                            <span className="text-gray-900">{formatCurrency(Math.min(investment, results.rebateDetails.requiredInvestment))}</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-gray-200">
                            <span className="text-gray-500">Rebate (15%)</span>
                            <span className="text-emerald-600 font-bold">{formatCurrency(results.rebate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowRebateModal(false)}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                >
                  Got it, thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
