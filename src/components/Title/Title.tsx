import { normalizeToArray } from '../../utils/formatters';
import styles from './Title.module.css';

interface TitleProps {
  text: string | string[];
}

function Title({ text }: TitleProps) {
  const lines = normalizeToArray(text);
  return (
    <>
      {lines.map((line, index) => (
        <h1 key={index} className={styles.titleText}>{line}</h1>
      ))}
    </>
  );
}

function VerticalTitle({ text }: TitleProps) {
  const lines = normalizeToArray(text);
  return (
    <div className={styles.verticalTitleContainer}>
      {lines.map((line, index) => (
        <h1 key={index} className={styles.verticalTitleText}>{line}</h1>
      ))}
    </div>
  );
}

export { Title, VerticalTitle };
