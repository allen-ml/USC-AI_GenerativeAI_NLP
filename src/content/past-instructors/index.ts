import fall2024 from './fall-2024.json';
import spring2024 from './spring-2024.json';
import spring2025 from './spring-2025.json';
import fall2025 from './fall-2025.json';

export interface AlumniPerson {
  Type: string;
  Name: string;
  Position: string;
  Image: string;
  Profiles?: Record<string, string | undefined>;
}

export interface SemesterAlumni {
  id: string;
  term: string;
  people: AlumniPerson[];
}

/**
 * Past-semester instructor snapshots, newest first.
 * To snapshot the current semester at end of term:
 *   1. Create src/content/past-instructors/<term>.json  (copy from instructors.json)
 *   2. Add an import above and prepend the entry here.
 */
export const allPastSemesters: SemesterAlumni[] = [
  fall2025 as SemesterAlumni,
  spring2025 as SemesterAlumni,
  fall2024 as SemesterAlumni,
  spring2024 as SemesterAlumni,
];
