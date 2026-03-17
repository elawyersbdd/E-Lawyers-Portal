import { EmployeeInfo, SalaryDetails } from './types';

export const INITIAL_EMPLOYEE_INFO: EmployeeInfo = {
  name: '',
  mobile: '',
  email: '',
  gender: 'Male',
  location: 'Dhaka or Chattogram City Corporation',
  employerName: '',
  companyType: 'Private Company',
};

export const INITIAL_SALARY_DETAILS: SalaryDetails = {
  basicSalary: 0,
  houseRent: 0,
  medicalAllowance: 0,
  conveyanceAllowance: 0,
  allowance: 0,
  employerContributionPF: 0,
  employeeContributionPF: 0,
  leaveEncashment: 0,
  overtime: 0,
  otherMonthlyBenefits: 0,
  eidBonus: 0,
  otherYearlyBenefits: 0,
};

export const THRESHOLDS = {
  Male: 350000,
  Female: 400000,
  'Disable Person': 475000,
};

export const TAX_SLABS_CONFIG = [
  { label: 'On First', limit: 0, rate: 0 }, // Index 0 is skipped in the loop
  { label: 'On Next', limit: 100000, rate: 0.05 },
  { label: 'On Next', limit: 400000, rate: 0.10 },
  { label: 'On Next', limit: 500000, rate: 0.15 },
  { label: 'On Next', limit: 500000, rate: 0.20 },
  { label: 'On Next', limit: Infinity, rate: 0.25 },
];

export const MIN_TAX = {
  'Dhaka or Chattogram City Corporation': 5000,
  'Any other City Corporation': 4000,
  'Any area other than City Corporation': 3000,
};
