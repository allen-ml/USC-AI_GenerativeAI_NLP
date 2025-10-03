import React, { useState } from "react";
import ArchiveNavigation from "../../../components/Archive/ArchiveNavigation";
import { ClassPhotoSection } from "../../../components/Archive/ClassPhotoSection";
import { ProjectCarousel } from "../../../components/Archive/ProjectCarousel";
import styles from "../Projects.module.css";

const Spring2024Projects: React.FC = () => {
  const [currentSlides, setCurrentSlides] = useState<{ [key: string]: number }>(
    {
      project1: 0,
      project2: 0,
      project3: 0,
      project4: 0,
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
      <ArchiveNavigation semester="spring-2024" currentPage="projects" />
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h1>Spring 2024 Final Projects</h1>
          <p>TAC-459: Generative AI and Natural Language Processing</p>
        </div>

        <div className={styles.projectGrid}>
          {/* Project 1: Health & Wellness Chatbot */}
          <div className={styles.projectCard}>
            <h3>Health & Wellness Chatbot</h3>
            <ProjectCarousel
              projectId="project1"
              images={[
                "/archive/Spring2024/projects/Team 1/team 1 - 1.png",
                "/archive/Spring2024/projects/Team 1/team 1 - 2.png",
                "/archive/Spring2024/projects/Team 1/team 1 - 3.png",
              ]}
              currentIndex={currentSlides.project1}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> Health and Wellness Chatbot delivers
              personalized recommendations for health, mental wellness,
              nutrition, and fitness through real-time interaction, sentiment
              analysis, and integration with wearable technologies, enhancing
              user well-being.
            </p>
            <p>
              <strong>Execution Plan:</strong> Build and fine-tune sentiment
              analysis and recommendation models, integrate multimodal (text,
              voice) interfaces, synchronize with wearable health trackers,
              offer tiered subscription options, and maintain user privacy
              through secure data management.
            </p>
            <p>
              <strong>Team Members:</strong> Sana Peshwani, Christ Ohanesians,
              Peter Wu, Deepali Yedulapuram
            </p>
          </div>

          {/* Project 2: Amazon Careers Job Description Generator */}
          <div className={styles.projectCard}>
            <h3>Amazon Careers Job Description Generator</h3>
            <ProjectCarousel
              projectId="project2"
              images={[
                "/archive/Spring2024/projects/Team 2/team 2 - 1.png",
                "/archive/Spring2024/projects/Team 2/team 2 - 2.png",
                "/archive/Spring2024/projects/Team 2/team 2 - 3.png",
              ]}
              currentIndex={currentSlides.project2}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> Amazon Job Description Generator
              automates the creation of tailored, compliance-friendly job
              postings using advanced AI algorithms, significantly improving
              recruitment efficiency, candidate relevance, and overall HR
              productivity across organizations.
            </p>
            <p>
              <strong>Execution Plan:</strong> Develop user-friendly web
              interface for job criteria inputs, implement AI-powered text
              generation, offer tiered monetization, continuously refine AI
              based on user feedback, and integrate regulatory compliance
              validation.
            </p>
            <p>
              <strong>Team Members:</strong> Rimi Bhardwaj, Taiyo Hayes, Tyler
              Kuang, Preston Doll
            </p>
          </div>

          {/* Project 3: Product Recommendation Chatbot */}
          <div className={styles.projectCard}>
            <h3>Product Recommendation Chatbot</h3>
            <ProjectCarousel
              projectId="project3"
              images={[
                "/archive/Spring2024/projects/Team 3/team 3 - 1.png",
                "/archive/Spring2024/projects/Team 3/team 3 - 2.png",
                "/archive/Spring2024/projects/Team 3/team 3 - 3.png",
              ]}
              currentIndex={currentSlides.project3}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> Product Recommendation Chatbot
              simplifies consumer tech purchases by delivering personalized
              product recommendations, explanations, and comparisons, reducing
              decision-making complexity and enhancing user shopping experience
              across multiple electronic categories.
            </p>
            <p>
              <strong>Execution Plan:</strong> Collect project data via APIs,
              deploy cosine similarity algorithms for product matching,
              integrate GPT-generated recommendation explanations, monetize
              through subscriptions and affiliate partnerships, and expand
              product categories regularly.
            </p>
            <p>
              <strong>Team Members:</strong> Thea Grauer, Pedro Galindo, Theo
              Bermudez, Grace Hughes
            </p>
          </div>

          {/* Project 4: Stock Prediction AI */}
          <div className={styles.projectCard}>
            <h3>Stock Prediction AI</h3>
            <ProjectCarousel
              projectId="project4"
              images={[
                "/archive/Spring2024/projects/Team 4/team 4 - 1.png",
                "/archive/Spring2024/projects/Team 4/team 4 - 2.png",
                "/archive/Spring2024/projects/Team 4/team 4 - 3.png",
              ]}
              currentIndex={currentSlides.project4}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
            <p>
              <strong>Description:</strong> Stock Prediction AI utilizes NLP and
              advanced sentiment analysis on financial news and market
              headlines, accurately predicting short-term stock movements to
              help investors make data-driven trading and investment decisions.
            </p>
            <p>
              <strong>Execution Plan:</strong> Gather financial data, preprocess
              news content, fine-tune NLP models (Mistral-7B), deploy visual
              dashboards for insights, implement subscription monetization, and
              enforce stringent data privacy and cybersecurity measures.
            </p>
            <p>
              <strong>Team Members:</strong> Alex Yuan, Miaosen Chai, Haofeng
              Xu, Zuoning Zhang
            </p>
          </div>
        </div>

        <ClassPhotoSection
          semester="Spring"
          year="2024"
          photoSrc="/archive/Spring2024/class_photo.jpg"
        />
      </div>
    </div>
  );
};

export default Spring2024Projects;
