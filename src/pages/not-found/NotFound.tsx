import { Link } from 'react-router-dom';
import { DefaultLayout } from '../../layouts/Default/Default';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <DefaultLayout title={['404']}>
      <div className={styles.content}>
        <p className={styles.message}>This page doesn't exist.</p>
        <Link to="/" className={styles.homeLink}>Back to home</Link>
      </div>
    </DefaultLayout>
  );
};

export { NotFound };
