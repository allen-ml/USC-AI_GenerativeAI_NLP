import { ScrollProvider } from '../../contexts/ScrollContext';
import { useScrollSnap } from '../../hooks/useScrollSnap';
import { Hero } from './Hero';
import styles from './Home.module.css';
import { Overview } from './Overview';

const Home: React.FC = () => {
  const { scrollContainerRef, scrollToSection, snapToClosestSection } = useScrollSnap();

  return (
    <ScrollProvider scrollToSection={scrollToSection} snapToClosestSection={snapToClosestSection}>
      <div ref={scrollContainerRef} className={styles.scrollableContent}>
        <div data-snap-section className={styles.scrollSection}>
          <Hero />
        </div>
        <div data-snap-section className={styles.scrollSection}>
          <Overview />
        </div>
      </div>
    </ScrollProvider>
  );
};

export { Home };
