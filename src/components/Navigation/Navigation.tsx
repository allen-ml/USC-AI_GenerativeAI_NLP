import { useEffect, useRef, useState } from 'react';
import navigationData from '../../content/navigation.json';
import type { NavItemData } from '../../types/navigationTypes';
import { cn } from '../../utils/formatters';
import styles from './Navigation.module.css';
import { NavigationItem } from './NavigationItem';

const navigationItems: NavItemData[] = navigationData as NavItemData[];

const Navigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  const handleNavItemClick = () => {
    setIsHovered(false);
    setExpandedItem(null);
  };

  const handleItemHover = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setExpandedItem(index), 400);
  };

  const handleItemLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setExpandedItem(null), 100);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <nav
      className={cn(styles.navContainer, isHovered ? styles.expanded : styles.collapsed)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.menuHeader}>
        <span className={styles.navigationText}>Navigation</span>
      </div>

      <div className={cn(styles.navItemsContainer, isHovered ? styles.expanded : styles.collapsed)}>
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={index}
            num={index + 1}
            item={item}
            isExpanded={expandedItem === index}
            onHover={() => handleItemHover(index)}
            onLeave={handleItemLeave}
            onClick={handleNavItemClick}
          />
        ))}
      </div>
    </nav>
  );
};

export { Navigation };
