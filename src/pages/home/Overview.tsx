import { CodeDemo } from "../../components";
import FullHeightSection from "../../layouts/FullHeightSection";
import styles from "./Overview.module.css";

function Overview(): React.JSX.Element {
  return (
    <FullHeightSection
      id="overview"
      justifyContent="center"
      alignItems="center"
    >
      <div className={styles.contentContainer}>
        <CodeDemo className={styles.codeDemo} />
      </div>
    </FullHeightSection>
  );
}

export default Overview;
