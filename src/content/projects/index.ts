import fall2024 from './fall-2024.json';
import fall2025 from './fall-2025.json';
import spring2024 from './spring-2024.json';
import spring2025 from './spring-2025.json';

export interface Project {
  title: string;
  images: string[];
  description: string;
  executionPlan: string;
  teamMembers: string[];
}

export interface SemesterProjects {
  id: string;
  term: string;
  classPhoto?: string;
  projects: Project[];
}

/**
 * All project semesters, newest first.
 * To add a new semester:
 *   1. Create src/content/projects/<term>.json  (e.g. spring-2026.json)
 *   2. Add an import above and prepend the entry here.
 */
export const allProjectSemesters: SemesterProjects[] = [
  fall2025 as SemesterProjects,
  spring2025 as SemesterProjects,
  fall2024 as SemesterProjects,
  spring2024 as SemesterProjects,
];
