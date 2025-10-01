import { useCallback, useEffect, useRef } from "react";

interface UseScrollSnapOptions {
  threshold?: number; // Minimum scroll distance to trigger snap (in pixels)
  snapDuration?: number; // Duration for smooth scrolling (in ms)
  maxScrollSpeed?: number; // Maximum scroll speed in pixels per second
}

export function useScrollSnap(options: UseScrollSnapOptions = {}) {
  const { threshold = 50, snapDuration = 500, maxScrollSpeed = 2000 } = options;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const getScrollSections = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return [];

    const sections = container.querySelectorAll("[data-snap-section]");
    return Array.from(sections) as HTMLElement[];
  }, []);

  const smoothScrollTo = useCallback(
    (targetScrollTop: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const startScrollTop = container.scrollTop;
      const distance = targetScrollTop - startScrollTop;

      // Calculate duration based on distance and max speed
      const calculatedDuration = (Math.abs(distance) / maxScrollSpeed) * 1000; // Convert to milliseconds
      const duration = Math.min(calculatedDuration, snapDuration); // Cap at snapDuration

      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easeInOutCubic for smooth animation
        const easeProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentScrollTop = startScrollTop + distance * easeProgress;
        container.scrollTop = currentScrollTop;

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateScroll);
        } else {
          isScrollingRef.current = false;
          animationFrameRef.current = null;
        }
      };

      isScrollingRef.current = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animateScroll);
    },
    [maxScrollSpeed, snapDuration]
  );

  const snapToClosestSection = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || isScrollingRef.current) return;

    const sections = getScrollSections();
    if (sections.length === 0) return;

    const containerTop = container.scrollTop;

    // Use the top of the viewport instead of center for more intuitive snapping
    const viewportTop = containerTop;

    // Find the section that should be snapped to
    let targetSection = sections[0];
    let smallestDistance = Math.abs(sections[0].offsetTop - viewportTop);

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const distance = Math.abs(sectionTop - viewportTop);

      // If we're past the middle of a section, snap to the next section
      const sectionMiddle = sectionTop + section.offsetHeight / 2;

      if (
        viewportTop > sectionMiddle &&
        sections.indexOf(section) < sections.length - 1
      ) {
        // We're past the middle, consider the next section
        const nextSection = sections[sections.indexOf(section) + 1];
        const nextDistance = Math.abs(nextSection.offsetTop - viewportTop);
        if (nextDistance < smallestDistance) {
          targetSection = nextSection;
          smallestDistance = nextDistance;
        }
      } else if (distance < smallestDistance) {
        targetSection = section;
        smallestDistance = distance;
      }
    });

    // Check if we need to snap
    const targetScrollTop = targetSection.offsetTop;
    const currentScrollTop = container.scrollTop;

    if (Math.abs(targetScrollTop - currentScrollTop) > threshold) {
      smoothScrollTo(targetScrollTop);
    }
  }, [threshold, getScrollSections, smoothScrollTo]);

  const handleScroll = useCallback(() => {
    // Don't snap if we're currently animating a programmatic scroll
    if (isScrollingRef.current) return;

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set new timeout to snap after user stops scrolling
    // Using a slightly longer delay to ensure smooth user experience
    scrollTimeoutRef.current = setTimeout(() => {
      snapToClosestSection();
    }, 200); // Wait 200ms after scroll stops
  }, [snapToClosestSection]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const targetSection = container.querySelector(
        `#${sectionId}`
      ) as HTMLElement;
      if (!targetSection) return;

      smoothScrollTo(targetSection.offsetTop);
    },
    [smoothScrollTo]
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);

  return {
    scrollContainerRef,
    scrollToSection,
    snapToClosestSection,
  };
}
