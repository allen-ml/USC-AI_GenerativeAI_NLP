import { cn } from '../../../../utils/formatters';
import styles from './NavigationArrow.module.css';

interface NavigationArrowProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  ariaLabel: string;
}

const NavigationArrow: React.FC<NavigationArrowProps> = ({ direction, onClick, ariaLabel }) => {
  return (
    <button
      className={cn(styles.navButton, direction === 'prev' ? styles.navButtonPrev : styles.navButtonNext)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'prev' ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
};

export { NavigationArrow };
