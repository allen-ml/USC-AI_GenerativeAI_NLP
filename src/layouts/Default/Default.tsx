import { Title, VerticalTitle } from "../../components/Title/Title";
import { BaseLayout } from "../Base/Base";
import styles from "./Default.module.css";

interface DefaultLayoutProps {
  title: string[];
  children?: React.ReactNode;
}

function DefaultLayout({
  title,
  children,
}: DefaultLayoutProps): React.ReactElement {
  return (
    <BaseLayout
      left={
        <header className={styles.headerContainer}>
          <Title text={title} />
        </header>
      }
      right={children}
    />
  );
}

function VerticalTitleLayout({
  title,
  children,
}: DefaultLayoutProps): React.ReactElement {
  return (
    <BaseLayout
      left={
        <div className={styles.headerContainer}>
          <VerticalTitle text={title} />
        </div>
      }
      right={children}
    />
  );
}

export { DefaultLayout, VerticalTitleLayout };
