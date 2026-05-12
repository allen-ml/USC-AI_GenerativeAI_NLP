import { useEffect } from "react";

interface UseCardHeightEqualizationProps {
  hasProjects: boolean;
  projects: unknown[];
}

export const useCardHeightEqualization = ({
  hasProjects,
  projects,
}: UseCardHeightEqualizationProps) => {
  useEffect(() => {
    const equalizeCardHeights = () => {
      const cards = document.querySelectorAll(".project-card");

      if (cards.length === 0) return;

      // Reset heights before recalculating
      cards.forEach((card: Element) => {
        (card as HTMLElement).style.height = "auto";
      });

      // Wait for images to load before calculating height
      setTimeout(() => {
        // Group cards by rows based on their position
        const cardsArray = Array.from(cards);
        const rows: Element[][] = [];
        let currentRow: Element[] = [];
        let currentTop = -1;

        cardsArray.forEach((card) => {
          const cardElement = card as HTMLElement;
          const cardTop = cardElement.offsetTop;

          if (currentTop === -1 || Math.abs(cardTop - currentTop) < 10) {
            currentRow.push(card);
            currentTop = cardTop;
          } else {
            if (currentRow.length > 0) {
              rows.push([...currentRow]);
            }
            currentRow = [card];
            currentTop = cardTop;
          }
        });

        if (currentRow.length > 0) {
          rows.push(currentRow);
        }

        // Calculate height for each row based on tallest image content
        rows.forEach((row) => {
          let maxRowHeight = 0;

          row.forEach((card) => {
            const cardElement = card as HTMLElement;

            // Find all images in this card (including carousel images)
            const allImages = cardElement.querySelectorAll(".project-image");
            let maxImageHeight = 0;

            allImages.forEach((img) => {
              const imgElement = img as HTMLImageElement;
              if (imgElement.naturalHeight > 0) {
                // Calculate the display height based on the container width
                const containerWidth = imgElement.offsetWidth;
                const aspectRatio =
                  imgElement.naturalHeight / imgElement.naturalWidth;
                const displayHeight = containerWidth * aspectRatio;
                maxImageHeight = Math.max(maxImageHeight, displayHeight);
              }
            });

            // Calculate card height with image height + text content + padding
            const textContent = cardElement.querySelector(
              ".project-content-wrapper"
            );
            const title = cardElement.querySelector("h3");
            const titleHeight = title
              ? title.getBoundingClientRect().height
              : 0;
            const textHeight = textContent
              ? textContent.getBoundingClientRect().height
              : 0;

            // Add padding and margins (80px total padding + margins)
            const estimatedCardHeight =
              maxImageHeight + titleHeight + textHeight + 80;
            maxRowHeight = Math.max(maxRowHeight, estimatedCardHeight);
          });

          // Apply the calculated height to all cards in this row
          row.forEach((card) => {
            (card as HTMLElement).style.height =
              Math.max(maxRowHeight, 400) + "px";
          });
        });
      }, 100);
    };

    // Run on load and resize with multiple fallbacks
    const timeoutId1 = setTimeout(equalizeCardHeights, 200);
    const timeoutId2 = setTimeout(equalizeCardHeights, 500);
    const timeoutId3 = setTimeout(equalizeCardHeights, 1000);

    window.addEventListener("resize", equalizeCardHeights);
    window.addEventListener("load", equalizeCardHeights);

    // Image preloader to ensure all images are loaded before height calculation
    const preloadImages = () => {
      const images = document.querySelectorAll(".project-image");
      const imagePromises: Promise<void>[] = [];

      images.forEach((img) => {
        const imageEl = img as HTMLImageElement;
        if (!imageEl.complete) {
          const promise = new Promise<void>((resolve) => {
            imageEl.onload = () => resolve();
            imageEl.onerror = () => resolve(); // Still resolve on error to prevent hanging
          });
          imagePromises.push(promise);
        }
      });

      return Promise.all(imagePromises);
    };

    // Run height calculation after all images are loaded
    void preloadImages().then(() => {
      setTimeout(equalizeCardHeights, 150);
    });

    // Additional observer for when images finish loading
    const images = document.querySelectorAll(".project-image");
    let loadedImages = 0;
    const totalImages = images.length;

    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages >= totalImages) {
        setTimeout(equalizeCardHeights, 100);
      }
    };

    images.forEach((img) => {
      const imageEl = img as HTMLImageElement;
      if (imageEl.complete) {
        handleImageLoad();
      } else {
        imageEl.addEventListener("load", handleImageLoad);
      }
    });

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      window.removeEventListener("resize", equalizeCardHeights);
      window.removeEventListener("load", equalizeCardHeights);
      images.forEach((img) => {
        (img as HTMLImageElement).removeEventListener("load", handleImageLoad);
      });
    };
  }, [hasProjects, projects]);
};
