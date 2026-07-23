/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'approved';
  author: string;
  category: string;
  image?: string;
  approvedBy?: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  guest: string;
  host: string;
  duration: string;
  date: string;
  description: string;
  audioUrl?: string;
  isPlaying?: boolean;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  hours: string; // e.g., "3 ساعات معتمدة"
  description: string;
  semester: string; // e.g., "الفصل الخامس"
  syllabusLink?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string; // e.g., "أستاذ مساعد"
  specialization: string;
  email: string;
  bio: string;
  researchCount: number;
  image?: string;
}

export interface DepartmentResearch {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  link?: string;
}

export interface ScheduleEvent {
  id: string;
  day: string; // e.g., "الأحد"
  time: string; // e.g., "08:00 - 10:00"
  subject: string;
  type: 'theoretical' | 'clinical';
  location: string;
}

export interface Department {
  id: string;
  name: string;
  arabicName: string;
  headOfDepartment: string;
  description: string;
  courses: Course[];
  faculty: FacultyMember[];
  research: DepartmentResearch[];
  schedules: ScheduleEvent[];
}

export interface ITRequest {
  id: string;
  type: 'email_activation' | 'lms_support' | 'server_issue' | 'other';
  requesterName: string;
  requesterEmail: string;
  details: string;
  status: 'pending' | 'in_progress' | 'resolved';
  date: string;
}

export interface CommitteeTask {
  id: string;
  title: string;
  assignedTo: string; // e.g. "العمادة", "الـ IT", "ضابط اتصال قسم الباطنية", "الأمانة الإعلامية"
  level: 1 | 2 | 3 | 4; // Corresponding to the 4 levels of the committee
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  date: string;
}

export interface BiannualMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  agenda: string[];
  status: 'scheduled' | 'completed';
  notes?: string;
}

export interface MedicalConvoy {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  beneficiariesCount: number;
  volunteersCount: number;
  status: 'upcoming' | 'completed';
  images?: string[];
}
