export interface EmployeeInfo {
  name: string;
  mobile: string;
  email: string;
  gender: 'Male' | 'Female' | 'Disable Person';
  location: 'Dhaka or Chattogram City Corporation' | 'Any other City Corporation' | 'Any area other than City Corporation';
  employerName: string;
  companyType: 'Private Company' | 'Government Company';
}

export interface SalaryDetails {
  basicSalary: number;
  houseRent: number;
  medicalAllowance: number;
  conveyanceAllowance: number;
  allowance: number;
  employerContributionPF: number;
  employeeContributionPF: number;
  leaveEncashment: number;
  overtime: number;
  otherMonthlyBenefits: number;
  eidBonus: number;
  otherYearlyBenefits: number;
}

export interface CalculationResult {
  totalGrossSalary: number;
  taxableIncome: number;
  taxLiabilityBeforeRebate: number;
  rebate: number;
  rebateDetails: {
    threePercentTaxable: number;
    fifteenPercentInvestment: number;
    maxEligibleRebate: number;
    requiredInvestment: number;
    actualRebate: number;
  };
  netTaxPayable: number;
  monthlyTax: number;
  monthlyNetPay: number;
  takeHomePay: number;
  monthlyIncome: number;
  slabs: {
    label: string;
    taxableAmount: number;
    rate: number;
    liability: number;
  }[];
}
