import styles from "./VerticalText.module.css";

interface VerticalTextProps {
  text: string;
  className?: string;
}

const VerticalText: React.FC<VerticalTextProps> = ({ text, className }) => {
  return (
    <div className={`${styles.verticalText} ${className || ""}`}>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export { VerticalText };
