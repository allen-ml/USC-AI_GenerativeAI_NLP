import { CodeDemo } from "../../components/CodeDemo/CodeDemo";
import FullHeightSection from "../../layouts/FullHeightSection/FullHeightSection";
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
