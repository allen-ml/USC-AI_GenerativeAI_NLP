import styles from './Full.module.css';

interface FullLayoutProps {
  children?: React.ReactNode;
}

function FullLayout({ children }: FullLayoutProps): React.ReactElement {
  return <div className={styles.fullContainer}>{children}</div>;
}

export { FullLayout };
