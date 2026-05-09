import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <div className={styles.content}>
        <p className={styles.message}>This page doesn't exist.</p>
        <Link to="/" className={styles.homeLink}>
          Back to home
        </Link>
      </div>
    </main>
  );
};

export { NotFound };
