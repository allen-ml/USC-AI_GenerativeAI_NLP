import { useEffect, useRef, useState } from "react";
import styles from "./ProjectCarousel.module.css";

interface ProjectCarouselProps {
  projectId: string;
  images: string[];
  currentIndex: number;
  onNext: (projectId: string, totalSlides: number) => void;
  onPrev: (projectId: string, totalSlides: number) => void;
  autoRotate?: boolean;
  interval?: number;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projectId,
  images,
  currentIndex,
  onNext,
  onPrev,
  autoRotate = true,
  interval = 5000,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(
    null
  );
  const autoRotateRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || images.length <= 1) return;

    const startAutoRotate = () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }

      autoRotateRef.current = setInterval(() => {
        if (!isTransitioning) {
          handleNext();
        }
      }, interval);
    };

    startAutoRotate();

    const handleMouseEnter = () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        autoRotateRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      startAutoRotate();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [autoRotate, interval, images.length, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection("next");

    // Update the index immediately and let CSS handle the animation
    setTimeout(() => {
      onNext(projectId, images.length);
      setSlideDirection(null);
      setIsTransitioning(false);
    }, 600);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection("prev");

    // Update the index immediately and let CSS handle the animation
    setTimeout(() => {
      onPrev(projectId, images.length);
      setSlideDirection(null);
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <div className={styles.carouselContainer} ref={containerRef}>
      <div className={styles.carouselInner}>
        {/* Main image container */}
        <div
          className={`${styles.carouselItem} ${styles.active} ${
            slideDirection === "next"
              ? styles.slideOutToLeft
              : slideDirection === "prev"
              ? styles.slideOutToRight
              : ""
          }`}
        >
          <img
            src={images[currentIndex]}
            alt={`Project Image ${currentIndex + 1}`}
            className={styles.projectImage}
          />
        </div>

        {/* Transitioning image (only during animation) */}
        {isTransitioning && (
          <div
            className={`${styles.carouselItem} ${
              slideDirection === "next"
                ? styles.slideInFromRight
                : slideDirection === "prev"
                ? styles.slideInFromLeft
                : ""
            }`}
          >
            <img
              src={
                images[
                  slideDirection === "next"
                    ? (currentIndex + 1) % images.length
                    : currentIndex === 0
                    ? images.length - 1
                    : currentIndex - 1
                ]
              }
              alt="Next Project Image"
              className={styles.projectImage}
            />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <>
          <button
            className={`${styles.carouselControl} ${styles.carouselControlPrev}`}
            type="button"
            onClick={handlePrev}
            disabled={isTransitioning}
          >
            <span className={styles.carouselControlIcon} aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={styles.visuallyHidden}>Previous</span>
          </button>
          <button
            className={`${styles.carouselControl} ${styles.carouselControlNext}`}
            type="button"
            onClick={handleNext}
            disabled={isTransitioning}
          >
            <span className={styles.carouselControlIcon} aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={styles.visuallyHidden}>Next</span>
          </button>
        </>
      )}
    </div>
  );
};

export { ProjectCarousel };
