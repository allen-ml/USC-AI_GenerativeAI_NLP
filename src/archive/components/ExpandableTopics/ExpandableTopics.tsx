import React, { useState } from "react";
import styles from "./ExpandableTopics.module.css";

interface ExpandableTopicsProps {
  title: string;
  topics: string[];
}

const ExpandableTopics: React.FC<ExpandableTopicsProps> = ({
  title,
  topics,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="text-start">
      {title}
      <div
        className={`${styles.topicDetails} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        <ul>
          {topics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
      {isExpanded && <br />}
      <button
        onClick={toggleExpanded}
        className={styles.toggleText}
      >
        {isExpanded ? "Expand Less" : "Expand More"}
      </button>
    </div>
  );
};

export { ExpandableTopics };
