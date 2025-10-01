import React, { useState } from "react";
import {
  ArchiveNavigation,
  ClassPhotoSection,
  ProjectCarousel,
} from "../../../components";
import styles from "../Projects.module.css";

const Fall2024Projects: React.FC = () => {
  const [currentSlides, setCurrentSlides] = useState<{ [key: string]: number }>(
    {
      project1: 0,
      project2: 0,
      project3: 0,
      project4: 0,
      project5: 0,
      project6: 0,
    }
  );

  const nextSlide = (projectId: string, totalSlides: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % totalSlides,
    }));
  };

  const prevSlide = (projectId: string, totalSlides: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + totalSlides) % totalSlides,
    }));
  };

  return (
    <div className={styles.projectBody}>
      <ArchiveNavigation semester="fall-2024" currentPage="projects" />
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h1>Fall 2024 Final Projects</h1>
          <p>TAC-459: Generative AI and Natural Language Processing</p>
        </div>

        <div className={styles.projectGrid}>
          {/* Project 1: AI-Based Career Advisor */}
          <div className={styles.projectCard}>
            <h3>AI-Based Career Advisor</h3>
            <ProjectCarousel
              projectId="project1"
              images={[
                "/archive/Fall2024/projects/Team 1/team 1 - 2.png",
                "/archive/Fall2024/projects/Team 1/team 1 - 3.png",
                "/archive/Fall2024/projects/Team 1/team 1 - 1.png",
              ]}
              currentIndex={currentSlides.project1}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> This AI-powered career advisor
              provides personalized job recommendations based on skill analysis
              and real-time job market insights. It integrates with Bing and
              LinkedIn APIs for real-time job search.
            </p>
            <p>
              <strong>Execution Plan:</strong> The system uses GPT-4o for skill
              matching, cosine similarity, and real-time job updates, ensuring
              accurate and up-to-date recommendations.
            </p>
            <p>
              <strong>Team Members:</strong> David Wang, Dracky Wei, Keyu He,
              Julian Jiang, Qiang Zeng
            </p>
          </div>

          {/* Project 2: AI Video Content Summarizer and Chatbot */}
          <div className={styles.projectCard}>
            <h3>AI Video Content Summarizer and Chatbot</h3>
            <ProjectCarousel
              projectId="project2"
              images={[
                "/archive/Fall2024/projects/Team 2/team 2 - 1.png",
                "/archive/Fall2024/projects/Team 2/team 2 -3.png",
                "/archive/Fall2024/projects/Team 2/team 2 - 5.png",
              ]}
              currentIndex={currentSlides.project2}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> This AI-powered tool transcribes,
              summarizes, and allows users to interact with video content
              through a chatbot. It extracts key insights from lectures,
              meetings, and online videos.
            </p>
            <p>
              <strong>Execution Plan:</strong> The system uses LLM-based
              summarization, video transcription, and chatbot features to
              provide interactive question-answering based on video content.
            </p>
            <p>
              <strong>Team Members:</strong> Iliyan Valani, Shoaib Valani,
              Haydee Martinez, Carissa Lin, Tyler Nguyen Tran
            </p>
          </div>

          {/* Project 3: QA AI Assistant for TAC 459 */}
          <div className={styles.projectCard}>
            <h3>QA AI Assistant for TAC 459</h3>
            <ProjectCarousel
              projectId="project3"
              images={[
                "/archive/Fall2024/projects/Team 3/team 3 - 5.png",
                "/archive/Fall2024/projects/Team 3/team 3 - 1.png",
                "/archive/Fall2024/projects/Team 3/team 3 - 2.png",
              ]}
              currentIndex={currentSlides.project3}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> A Retrieval-Augmented Generation
              (RAG)-based assistant designed for answering course-related
              queries using lecture materials. It enhances learning through
              real-time, course-specific answers.
            </p>
            <p>
              <strong>Execution Plan:</strong> Uses a vector database and LLMs
              to retrieve relevant course materials, allowing students to
              receive precise, cited answers with minimal instructor
              intervention.
            </p>
            <p>
              <strong>Team Members:</strong> Evans Alvarez, Lawrance Lui, Ju Lee
            </p>
          </div>

          {/* Project 4: AI Assistant for Internship/New Grad Job Finder */}
          <div className={styles.projectCard}>
            <h3>AI Assistant for Internship/New Grad Job Finder</h3>
            <ProjectCarousel
              projectId="project4"
              images={[
                "/archive/Fall2024/projects/Team 4/team 4 - 1.png",
                "/archive/Fall2024/projects/Team 4/team 4 -2.png",
                "/archive/Fall2024/projects/Team 4/team 4 -  4.png",
              ]}
              currentIndex={currentSlides.project4}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> HireWizard is an AI-driven job
              search assistant that matches job seekers to relevant roles based
              on resume analysis and job posting data.
            </p>
            <p>
              <strong>Execution Plan:</strong> Uses NLP-powered resume
              screening, cosine similarity for job matching, and integrates with
              job databases like LinkedIn and Indeed to improve hiring outcomes.
            </p>
            <p>
              <strong>Team Members:</strong> Thomas Murray, William Norris, Stan
              Loosmore, Zubin Hydrie
            </p>
          </div>

          {/* Project 5: Sandwich or Salad Chatbot */}
          <div className={styles.projectCard}>
            <h3>Sandwich or Salad Chatbot</h3>
            <ProjectCarousel
              projectId="project5"
              images={[
                "/archive/Fall2024/projects/Team 5/team 5 - 2.png",
                "/archive/Fall2024/projects/Team 5/team 5 - 3.png",
                "/archive/Fall2024/projects/Team 5/team 5 - 1.png",
              ]}
              currentIndex={currentSlides.project5}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> An AI-powered chatbot for
              customizing sandwich orders and providing personalized meal
              recommendations using dietary preferences and past orders.
            </p>
            <p>
              <strong>Execution Plan:</strong> Implements a step-by-step
              ordering system, cross-selling features, and AI-powered dietary
              customization to improve customer experience.
            </p>
            <p>
              <strong>Team Members:</strong> Eimon Amjadi, Reha Matai, Eddie
              Sanchez, Roei Ziv
            </p>
          </div>

          {/* Project 6: AI Lecture Assistant: RAG-Driven Avatar for Interactive Course Q&A */}
          <div className={styles.projectCard}>
            <h3>
              AI Lecture Assistant: RAG-Driven Avatar for Interactive Course Q&A
            </h3>
            <ProjectCarousel
              projectId="project6"
              images={[
                "/archive/Fall2024/projects/Team 6/team 6 - 3.png",
                "/archive/Fall2024/projects/Team 6/team 6 - 1.png",
                "/archive/Fall2024/projects/Team 6/team 6 - 2.png",
              ]}
              currentIndex={currentSlides.project6}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> A virtual AI assistant that answers
              course-related questions in real-time using Retrieval-Augmented
              Generation (RAG) and an interactive avatar.
            </p>
            <p>
              <strong>Execution Plan:</strong> Uses LLMs for text-based Q&A,
              voice synthesis for audio responses, and lip-syncing for realistic
              avatar interactions to enhance student engagement.
            </p>
            <p>
              <strong>Team Members:</strong> Emma Guo, Elizabeth Phillips, Jason
              Liu, Hongkun Gong
            </p>
          </div>
        </div>

        <ClassPhotoSection
          semester="Fall"
          year="2024"
          photoSrc="/archive/Fall2024/class_photo.jpg"
        />
      </div>
    </div>
  );
};
export default Fall2024Projects;
