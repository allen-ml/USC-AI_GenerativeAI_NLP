import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { NavItemData } from '../../types/navigationTypes';
import { cn, formatNumber } from '../../utils/formatters';
import styles from './NavigationItem.module.css';

type Props = {
  num: number;
  item: NavItemData;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
};

const NavigationItem: React.FC<Props> = ({ num, item, isExpanded, onHover, onLeave, onClick }: Props) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const hasChildren = Boolean(item.children && item.children.length > 0);

  const navigateToHash = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const hash = href.substring(2);
    if (window.location.pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      void navigate('/');
      // Wait for navigation before scrolling
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 200);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.href.startsWith('/#')) navigateToHash(item.href, e);
    onClick();
  };

  useEffect(() => {
    if (childrenRef.current) {
      childrenRef.current.style.height = isExpanded
        ? `${childrenRef.current.scrollHeight}px`
        : '0px';
    }
  }, [isExpanded]);

  return (
    <div className={styles.navItemContainer} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <Link
        to={item.href.startsWith('/#') ? '/' : item.href}
        onClick={handleClick}
        className={styles.navItemLink}
      >
        <div className={styles.navItemContent}>
          <span className={styles.navItemNumber}>{formatNumber(num)}</span>
          <span className={styles.navItemLabel}>{item.label}</span>
        </div>

        {hasChildren && (
          <svg
            className={cn(styles.navItemArrow, isExpanded ? styles.expanded : styles.collapsed)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </Link>

      {hasChildren && (
        <div
          ref={childrenRef}
          className={cn(styles.navItemChildren, isExpanded ? styles.expanded : styles.collapsed)}
        >
          <div className={styles.navItemChildrenInner}>
            {item.children?.map((child, index) => (
              <Link
                key={index}
                to={child.href.startsWith('/#') ? '/' : child.href}
                onClick={(e) => {
                  if (child.href.startsWith('/#')) navigateToHash(child.href, e);
                  onClick();
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
