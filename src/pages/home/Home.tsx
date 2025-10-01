import { ScrollProvider } from "../../hooks/ScrollContext";
import { useScrollSnap } from "../../hooks/useScrollSnap";
import Hero from "./Hero";
import styles from "./Home.module.css";
import Overview from "./Overview";
import QuickLinks from "./QuickLinks";

function Home(): React.JSX.Element {
  const { scrollContainerRef, scrollToSection, snapToClosestSection } =
    useScrollSnap({
      threshold: 30, // Minimum scroll distance to trigger snap
      snapDuration: 800, // Maximum duration for smooth scroll
      maxScrollSpeed: 1000, // Maximum scroll speed in pixels per second
    });

  return (
    <ScrollProvider
      scrollToSection={scrollToSection}
      snapToClosestSection={snapToClosestSection}
    >
      <div ref={scrollContainerRef} className={styles.scrollableContent}>
        <div data-snap-section className={styles.scrollSection}>
          <Hero />
        </div>
        <div data-snap-section className={styles.scrollSection}>
          <Overview />
        </div>
        <div data-snap-section className={styles.scrollSection}>
          <QuickLinks />
        </div>
      </div>
    </ScrollProvider>
  );
}

export default Home;
