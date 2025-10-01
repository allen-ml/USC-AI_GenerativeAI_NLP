import { useEffect, useRef, useState } from "react";
import navigationData from "../../content/navigation.json";
import type { NavItemData } from "../../types/navigationTypes";
import styles from "./Navigation.module.css";
import NavigationItem from "./NavigationItem";

const Navigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Load navigation data from JSON file
  const navigationItems: NavItemData[] = navigationData as NavItemData[];

  const handleNavItemClick = () => {
    // Collapse navbar when any nav item is clicked
    setIsHovered(false);
    setExpandedItem(null);
  };

  const handleItemHover = (index: number) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set a delay before expanding to prevent accidental hovers
    hoverTimeoutRef.current = setTimeout(() => {
      setExpandedItem(index);
    }, 400);
  };

  const handleItemLeave = () => {
    // Clear timeout if user leaves before delay completes
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Add a small delay before collapsing to allow moving to submenu
    hoverTimeoutRef.current = setTimeout(() => {
      setExpandedItem(null);
    }, 100);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav
      className={`${styles.navContainer} ${
        isHovered ? styles.expanded : styles.collapsed
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Menu Label */}
      <div className={styles.menuHeader}>
        <span className={styles.navigationText}>Navigation</span>
      </div>

      {/* Navigation Items */}
      <div
        className={`${styles.navItemsContainer} ${
          isHovered ? styles.expanded : styles.collapsed
        }`}
      >
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

export default Navigation;
