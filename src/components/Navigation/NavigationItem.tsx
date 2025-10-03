import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { NavItemData } from "../../types/navigationTypes";
import { formatNumber } from "../../utils/formatters";
import styles from "./NavigationItem.module.css";

type Props = {
  num: number;
  item: NavItemData;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
};

/**
 * A navigation item that can expand to show children or navigate to a link.
 * Items with children expand on hover, items without children navigate to href.
 */
const NavigationItem: React.FC<Props> = ({
  num,
  item,
  isExpanded,
  onHover,
  onLeave,
  onClick,
}: Props) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const hasChildren = Boolean(item.children && item.children.length > 0);

  const handleClick = (e: React.MouseEvent) => {
    // Handle hash navigation for main items
    if (item.href.startsWith("/#")) {
      handleHashNavigation(item.href, e);
    }
    // Collapse navbar when item is clicked
    onClick();
    // Allow navigation to proceed normally for non-hash links
  };

  const handleHashNavigation = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const hash = href.substring(2); // Remove '/#' to get just the id

      // Check if we're already on the home page
      if (window.location.pathname === "/") {
        // Already on home page, just scroll to element
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home page first, then scroll
        navigate("/");
        // Wait for navigation to complete, then scroll to element
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 200); // Increased timeout for more reliable navigation
      }
    }
  };

  // Handle smooth height animation
  useEffect(() => {
    if (childrenRef.current) {
      if (isExpanded) {
        const scrollHeight = childrenRef.current.scrollHeight;
        childrenRef.current.style.height = `${scrollHeight}px`;
      } else {
        childrenRef.current.style.height = "0px";
      }
    }
  }, [isExpanded]);

  return (
    <div
      className={styles.navItemContainer}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Main Nav Item */}
      <Link
        to={item.href.startsWith("/#") ? "/" : item.href}
        onClick={handleClick}
        className={styles.navItemLink}
      >
        <div className={styles.navItemContent}>
          <span className={styles.navItemNumber}>{formatNumber(num)}</span>
          <span className={styles.navItemLabel}>{item.label}</span>
        </div>

        {/* Arrow icon for items with children */}
        {hasChildren && (
          <svg
            className={`${styles.navItemArrow} ${
              isExpanded ? styles.expanded : styles.collapsed
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </Link>

      {/* Expanded Children */}
      {hasChildren && (
        <div
          ref={childrenRef}
          className={`${styles.navItemChildren} ${
            isExpanded ? styles.expanded : styles.collapsed
          }`}
        >
          <div className={styles.navItemChildrenInner}>
            {item.children?.map((child, index) => (
              <Link
                key={index}
                to={child.href.startsWith("/#") ? "/" : child.href}
                onClick={(e) => {
                  handleHashNavigation(child.href, e);
                  onClick(); // Collapse navbar when child is clicked
                }}
                className={styles.navItemChild}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { NavigationItem };
