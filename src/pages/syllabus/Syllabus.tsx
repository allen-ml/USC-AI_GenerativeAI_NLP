import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import metaData from "../../content/info.json";
import styles from "./Syllabus.module.css";

const Syllabus: React.FC = () => {
  const [pdfPath, setPdfPath] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Construct the PDF path from metadata
    if (metaData.syllabus) {
      setPdfPath(`/${metaData.syllabus}`);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.syllabusContainer}>
        <div className={styles.errorMessage}>
          <h1>Loading...</h1>
          <p>Please wait while the syllabus loads.</p>
        </div>
      </div>
    );
  }

  if (error || !pdfPath) {
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
            <Button
              as="a"
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
            >
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
            onError={() => setError(true)}
            loading="lazy"
          />
          {error && (
            <div className={styles.fallbackMessage}>
              <p>Unable to display PDF in browser.</p>
              <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackLink}
              >
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
