import React from "react";
import { PlaceholderCard } from "../components/ProjectCard/PlaceholderCard";
import { ProjectCard } from "../components/ProjectCard/ProjectCard";
import Fall2024ProjectData from "../content/projects/fall-2024.json";
import Spring2024ProjectData from "../content/projects/spring-2024.json";
import Spring2025ProjectData from "../content/projects/spring-2025.json";
import { useCardHeightEqualization } from "../hooks/useCardHeightEqualization";
import { Spring2025Layout } from "../layouts/Spring2025Layout/Spring2025Layout";
import type { ProjectArchiveData } from "../types/ProjectTypes";
import "./Projects.module.css"; // Import CSS to ensure exact styling match

interface ProjectsPageProps {
  data: ProjectArchiveData;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  const hasProjects = data.projects && data.projects.length > 0;
  const title = data.term ? `${data.term} Final Projects` : "Final Projects";

  // Use custom hook for card height equalization
  useCardHeightEqualization({ hasProjects, projects: data.projects || [] });

  const renderPlaceholderProjects = () => {
    return Array.from({ length: 6 }, (_, index) => (
      <PlaceholderCard key={index} />
    ));
  };

  return (
    <Spring2025Layout>
      <div className="container mt-4">
        <h2 className="text-center">{title}</h2>
        <div className="row" id="projectContainer">
          {hasProjects
            ? data.projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))
            : renderPlaceholderProjects()}
        </div>

        {data.classPhoto && (
          <div className="text-center mt-5">
            <div className="class-photo-container">
              <h3 className="class-photo-title">Class Photo</h3>
              <div className="class-photo-wrapper">
                <img
                  src={data.classPhoto}
                  className="class-photo d-block mx-auto"
                  alt={`${data.term || ""} Class Photo`}
                  onLoad={() => {
                    // Ensure proper aspect ratio maintenance
                    const img = document.querySelector(
                      ".class-photo"
                    ) as HTMLImageElement;
                    if (img) {
                      img.style.maxWidth = "70%";
                      img.style.height = "auto";
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Spring2025Layout>
  );
};

const Spring2024Projects: React.FC = () => {
  const baseData = Spring2024ProjectData as ProjectArchiveData;
  const projects: ProjectArchiveData = {
    term: baseData.term || "Spring 2024",
    projects: baseData.projects || [],
    classPhoto: baseData.classPhoto || "",
  };
  return <ProjectsPage data={projects} />;
};

const Fall2024Projects: React.FC = () => {
  const baseData = Fall2024ProjectData as ProjectArchiveData;
  const projects: ProjectArchiveData = {
    term: baseData.term || "Fall 2024",
    projects: baseData.projects || [],
    classPhoto: baseData.classPhoto || "",
  };
  return <ProjectsPage data={projects} />;
};

const Spring2025Projects: React.FC = () => {
  const baseData = Spring2025ProjectData as ProjectArchiveData;
  const projects: ProjectArchiveData = {
    term: baseData.term || "Spring 2025",
    projects: baseData.projects || [],
    classPhoto: baseData.classPhoto || "",
  };
  return <ProjectsPage data={projects} />;
};

export { Fall2024Projects, Spring2024Projects, Spring2025Projects };
