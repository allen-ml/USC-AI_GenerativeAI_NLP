import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import metaData from '../../content/info.json';
import { publicUrl } from '../../utils/config';
import styles from './Syllabus.module.css';

const pdfPath = metaData.syllabus ? publicUrl(`/${metaData.syllabus}`) : null;

const Syllabus: React.FC = () => {
  const [iframeError, setIframeError] = useState(false);

  if (!pdfPath) {
    return (
      <div className={styles.syllabusContainer}>
        <div className={styles.errorMessage}>
          <h1>Syllabus Not Available</h1>
          <p>The syllabus file could not be found in the metadata.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.syllabusContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>Course Syllabus</h1>
            <p className={styles.semester}>USC TAC-459 {metaData.semester}</p>
          </div>

          <div className={styles.downloadSection}>
            <Button as="a" href={pdfPath} target="_blank" rel="noopener noreferrer">
              Download Syllabus
            </Button>
          </div>
        </div>

        <div className={styles.pdfContainer}>
          <iframe
            src={`${pdfPath}#toolbar=1&navpanes=1&scrollbar=1&view=FitH&zoom=125`}
            className={styles.pdfViewer}
            title="Course Syllabus"
            width="100%"
            height="100%"
            onError={() => setIframeError(true)}
            loading="lazy"
          />
          {iframeError && (
            <div className={styles.fallbackMessage}>
              <p>Unable to display PDF in browser.</p>
              <a href={pdfPath} target="_blank" rel="noopener noreferrer" className={styles.fallbackLink}>
                Click here to open the syllabus in a new tab
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Syllabus };
