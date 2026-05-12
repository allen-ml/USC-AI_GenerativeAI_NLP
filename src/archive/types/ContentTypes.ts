export interface Class {
  week: number;
  title: string;
  topics: string[];

  // For Fall 2024 and later
  module?: string;

  // For Spring 2025 and later
  deliverables?: string[];
}

// For Fall 2024 and later
export interface OfficeHour {
  instructor: string;
  mode: string;
  day: string;
  time: string;
  location: string;
  link: {
    text: string;

    // Disclusive of Allen in Spring 2025
    href?: string;
  };
}

export interface StaffMember {
  title: string;
  name: string;
  link: string;
  linkedin: string;
  profilePicture?: string;

  // Exclusive to Allen in Spring 2024
  blurb?: string;
  companyUrl?: string;

  // For Fall 2024 and later
  email?: string;

  // For bios Fall 2024 and later
  activeYears?: string[];
  bio?: string;
}

export interface Descriptors {
  term: string;
  time: string;
  location: string;

  // Exclusive to Spring 2024
  units?: number;
  prerequisites?: string;

  // Exclusive to Fall 2024
  discussion?: string;
  contact?: string;
}

export interface Spring2024ContentFormat {
  bannerImage: string;
  title: string;
  subtitle: string;
  descriptors: Descriptors;
  instructor: StaffMember;
  courseAssistants: StaffMember[];
  courseDescription: string;
  courseSchedule: Class[];
  technologicalProficiency: string;
}

export interface Fall2024ContentFormat {
  logoImage: string;
  title: string;
  overview: string;
  descriptors: Descriptors;
  staff: StaffMember[];
  officeHours: OfficeHour[];
  courseSchedule: Class[];
}

export interface Spring2025ContentFormat {
  logoImage: string;
  title: string;
  descriptors: Descriptors;
  overview: string;
  instructors: StaffMember[];
  teachingAssistants: StaffMember[];
  officeHours: OfficeHour[];
  courseSchedule: Class[];
}

export interface Spring2025NavigationFormat {
  logoImage: string;
  mainNavigation: {
    text: string;
    href: string;
  }[];
  dropdownNavigation: {
    text: string;
    links: {
      text: string;
      href: string;
    }[];
  }[];
}
