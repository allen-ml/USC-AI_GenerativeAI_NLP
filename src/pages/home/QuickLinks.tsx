import React from "react";
import TimelineLayout, {
  type TimelineItem,
} from "../../layouts/Timeline/TimelineLayout";
import styles from "./QuickLinks.module.css";

const quickLinks: TimelineItem[] = [
  {
    label: "Content",
    href: "/content",
    description: "Course materials and resources",
  },
  {
    label: "Schedule",
    href: "/schedule",
    description: "Class schedule and assignments",
  },
  {
    label: "Syllabus",
    href: "/syllabus",
    description: "Course syllabus and policies",
  },
  {
    label: "Instructors",
    href: "/instructors",
    description: "Meet the teaching team",
  },
];

function QuickLinks(): React.JSX.Element {
  return (
    <section id="quick-links" className={styles.quickLinksSection}>
      <TimelineLayout title="Quick Links" items={quickLinks} />
    </section>
  );
}

export default QuickLinks;
