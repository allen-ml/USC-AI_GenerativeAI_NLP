import {
  TimelineLayout,
  type TimelineItem,
} from "../../layouts/Timeline/TimelineLayout";

const archiveItems: TimelineItem[] = [
  {
    label: "Spring 2025",
    href: "/archive/spring-2025",
  },
  {
    label: "Fall 2024",
    href: "/archive/fall-2024",
  },
  {
    label: "Spring 2024",
    href: "/archive/spring-2024",
  },
];

const Archive: React.FC = () => {
  return <TimelineLayout title={["Archive"]} items={archiveItems} />;
};

export { Archive };
