import React from "react";
import type { Project } from "../../types/ProjectTypes";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const carouselId = `project${index + 1}Carousel`;
  const hasImages = project.images && project.images.length > 0;

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="project-card">
        {project.title && <h3>{project.title}</h3>}

        {hasImages ? (
          project.images.length === 1 ? (
            <img
              src={project.images[0]}
              className="project-image d-block w-100"
              alt={project.title || `Project ${index + 1}`}
            />
          ) : (
            <div
              id={carouselId}
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {project.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`carousel-item ${
                      imgIndex === 0 ? "active" : ""
                    }`}
                  >
                    <img
                      src={image}
                      className="project-image d-block w-100"
                      alt={`${project.title || `Project ${index + 1}`} Image ${
                        imgIndex + 1
                      }`}
                    />
                  </div>
                ))}
              </div>
              {project.images.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
          )
        ) : (
          <img
            src="/archive/tbp.png"
            className="project-image d-block w-100"
            alt="To be published"
          />
        )}

        <div className="project-content-wrapper">
          {project.description && (
            <p>
              <strong>Description:</strong> {project.description}
            </p>
          )}
          {project.executionPlan && (
            <p>
              <strong>Execution Plan:</strong> {project.executionPlan}
            </p>
          )}
          {project.teamMembers && project.teamMembers.length > 0 && (
            <p>
              <strong>Team Members:</strong> {project.teamMembers.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProjectCard };
