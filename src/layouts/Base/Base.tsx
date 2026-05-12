import styles from './Base.module.css';

interface BaseLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

function BaseLayout({ left, right }: BaseLayoutProps): React.ReactElement {
  return (
    <main className={styles.container}>
      <section className={styles.leftPane}>{left}</section>
      <section className={styles.rightPane}>{right}</section>
    </main>
  );
}

export { BaseLayout };
