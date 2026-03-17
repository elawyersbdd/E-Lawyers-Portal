export interface NoteAttachment {
  name: string;
  path: string;
  size: number;
  type: string;
  id: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO Date string
  updatedAt: string;
  thumbnailUrl?: string;
  tags?: string[];
  attachments?: NoteAttachment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  emailVerified: boolean;
}

export enum RoutePath {
  HOME = '/',
  RESOURCES = '/resources',
  ACADEMY = '/academy',
  LEGAL_SERVICES = '/legal-services',
  APPOINTMENT = '/appointment',
  NOTES = '/notes',
  CREATE_NOTE = '/notes/new',
  EDIT_NOTE = '/notes/:id/edit',
  NOTE_DETAIL = '/notes/:id',
  ACCOUNT = '/account',
  CALCULATOR = '/resources/calculator',
  PAYROLL_CALCULATOR = '/resources/payroll-calculator',
  LOGIN = '/login',
  SIGNUP = '/signup',
  FORGOT_PASSWORD = '/forgot-password',
  VERIFY_EMAIL = '/verify-email',
}
