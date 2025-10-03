import React from "react";
import fall2024Data from "../../content/fall-2024.json";
import type { Fall2024ContentFormat } from "../../types/ContentTypes";
import styles from "./Fall2024.module.css";

const Fall2024: React.FC = () => {
  const data: Fall2024ContentFormat = fall2024Data as Fall2024ContentFormat;

  // Helper function to group courses by module
  const getCoursesByModule = () => {
    const moduleMap = new Map<string, typeof data.courseSchedule>();

    data.courseSchedule.forEach((course) => {
      const moduleName = course.module || "Other";
      if (!moduleMap.has(moduleName)) {
        moduleMap.set(moduleName, []);
      }
      moduleMap.get(moduleName)!.push(course);
    });

    return Array.from(moduleMap.entries());
  };

  return (
    <div className={styles.body}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navbarBrand}>
            University of Southern California <br />
            TAC-459 Course Website Fall 2024
          </div>
        </div>
      </nav>

      <div className={styles.container} style={{ marginTop: "24px" }}>
        {/* Banner */}
        <div className={styles.banner}>
          <img
            src="/usc-logo.png"
            alt="USC Logo"
            className={styles.bannerImg}
          />
          <div className={styles.rightSection}>
            <p>
              <b>{data.title}</b>
            </p>
          </div>
        </div>

        {/* Header with overview */}
        <div className={styles.header}>
          <p>{data.overview}</p>
        </div>

        {/* Course Details */}
        <ul className={styles.details}>
          <li>
            <strong>Time:</strong> {data.descriptors.time}
          </li>
          <li>
            <strong>Location:</strong> {data.descriptors.location}
          </li>
          <li>
            <strong>Discussion:</strong> {data.descriptors.discussion}
          </li>
          <li>
            <strong>Contact:</strong> {data.descriptors.contact}
          </li>
        </ul>

        {/* Staff Section */}
        <div className={styles.staffRow}>
          {data.staff.map((staffMember, index) => (
            <div key={index} className={styles.staffCol}>
              <h4>{staffMember.title}</h4>
              <div className={index === 0 ? styles.instructor : styles.ta}>
                <img
                  src={staffMember.profilePicture || "/usc-logo.png"}
                  alt={`${staffMember.title} Photo`}
                  className={index === 0 ? styles.instructorImg : styles.taImg}
                />
                <div>
                  <h5>
                    <a href={staffMember.linkedin} className={styles.staffLink}>
                      {staffMember.name}
                    </a>
                  </h5>
                  <p className={styles.officeHours}>
                    Email: {staffMember.email}
                    <br />
                    <a
                      href={staffMember.linkedin}
                      style={{ textDecoration: "none" }}
                    >
                      LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Office Hours */}
      <div className={`${styles.container} ${styles.officeHoursSection}`}>
        <h2 className={styles.scheduleTitle}>Office hours</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Instructor/Course Assistant</th>
              <th>Mode</th>
              <th>Day</th>
              <th>Time Slot</th>
              <th>Location</th>
              <th>Meeting Link</th>
            </tr>
          </thead>
          <tbody>
            {data.officeHours.map((oh, index) => (
              <tr key={index} className={styles.weekRow}>
                <td>{oh.instructor}</td>
                <td>{oh.mode}</td>
                <td>{oh.day}</td>
                <td>{oh.time}</td>
                <td>{oh.location}</td>
                <td>
                  {oh.link.href ? (
                    <a href={oh.link.href} style={{ textDecoration: "none" }}>
                      {oh.link.text}
                    </a>
                  ) : (
                    oh.link.text
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Course Schedule */}
        <div className={styles.courseScheduleSection}>
          <h2 className={styles.scheduleTitle}>Weekly Course Topics</h2>
          <p className={styles.syllabusNote}>
            Please visit the course syllabus on Brightspace for the latest
            changes to the syllabus.
          </p>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Lecture</th>
              </tr>
            </thead>
            <tbody>
              {getCoursesByModule().map(([moduleName, courses]) => (
                <React.Fragment key={moduleName}>
                  <tr className={styles.moduleHeader}>
                    <td colSpan={2}>{moduleName}</td>
                  </tr>
                  {courses.map((course) => (
                    <tr key={course.week} className={styles.weekRow}>
                      <td>Week {course.week}</td>
                      <td>
                        <div className={styles.lectureTitle}>
                          {course.title}
                        </div>
                        <ul className={styles.topicsList}>
                          {course.topics.map((topic, topicIndex) => (
                            <li key={topicIndex}>{topic}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { Fall2024 };
