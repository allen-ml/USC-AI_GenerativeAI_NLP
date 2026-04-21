export interface Project {
  title: string;
  images: string[];
  description: string;
  executionPlan: string;
  teamMembers: string[];
}

export interface ProjectArchiveData {
  term: string;
  projects: Project[];
  classPhoto: string;
}
