import React from "react";
import spring2024Data from "../../content/spring-2024.json";
import type { Spring2024ContentFormat } from "../../types/ContentTypes";
import styles from "./Spring2024.module.css";

const Spring2024: React.FC = () => {
  const data: Spring2024ContentFormat =
    spring2024Data as Spring2024ContentFormat;

  // Helper function to create the schedule table
  const createScheduleTable = () => {
    const scheduleRows = [];
    const schedule = data.courseSchedule;

    // Calculate the number of rows needed (15 weeks, 2 columns = 8 rows, with last row having only 1 item)
    const numRows = Math.ceil(schedule.length / 2);

    for (let i = 0; i < numRows; i++) {
      const leftWeek = schedule[i];
      const rightWeek = schedule[i + 8]; // Right column starts at week 9 (index 8)

      scheduleRows.push(
        <tr key={i}>
          <td>
            {leftWeek && (
              <>
                <strong>
                  Week {leftWeek.week}: {leftWeek.title}
                </strong>
                <ul>
                  {leftWeek.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </>
            )}
          </td>
          <td>
            {rightWeek && (
              <>
                <strong>
                  Week {rightWeek.week}: {rightWeek.title}
                </strong>
                <ul>
                  {rightWeek.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </>
            )}
          </td>
        </tr>
      );
    }

    return scheduleRows;
  };

  return (
    <div className={styles.body}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageRepeatTop}></div>
        <h1>{data.title}</h1>
        <h2>{data.subtitle}</h2>
        <p className={styles.courseInfo}>
          <strong>Units:</strong>
          {data.descriptors.units}, <strong>Term:</strong>{" "}
          {data.descriptors.term}, <strong>Prerequisite(s):</strong>{" "}
          {data.descriptors.prerequisites}
          <br />
          <strong>Time:</strong> {data.descriptors.time},{" "}
          <strong>Location:</strong> {data.descriptors.location}
        </p>
        <h2 className={styles.sectionTitle}>Instructor Infromation</h2>
        <h3 className={styles.instructorTitle}>
          <strong>Instructor:</strong>{" "}
          <a href={data.instructor.linkedin}>{data.instructor.name}</a>
        </h3>
        <p className={styles.instructorInfo}>
          <strong>{data.instructor.title}</strong>
          <br />
          <strong>
            Founder of <a href={data.instructor.companyUrl}>Crystalytic.AI</a>
          </strong>
        </p>
        <img
          src={
            data.instructor.profilePicture ||
            "https://static.wixstatic.com/media/1ea898_97bf6eb77cfc4cf183cb64ff74cc81c8~mv2.jpg/v1/fill/w_439,h_498,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1ea898_97bf6eb77cfc4cf183cb64ff74cc81c8~mv2.jpg"
          }
          alt="Instructor Image"
          className={styles.instructorImage}
        />
        <br />
        <br />
        <strong>Office Hours:</strong> Tuesdays 6 PM-8 PM by appointment only.
        <h2 className={styles.sectionTitle}>Course Assistants</h2>
        {data.courseAssistants.map((assistant, index) => (
          <div key={index}>
            <a href={assistant.linkedin} className={styles.assistantLink}>
              {assistant.name}
            </a>
            <br />
            <img
              src={assistant.profilePicture || "/usc-logo.png"}
              alt="Course Assistant"
              className={styles.assistantImage}
            />
            <br />
            {index === 0 && (
              <>
                <br />
                <br />
              </>
            )}
          </div>
        ))}
        <h2 className={styles.sectionTitle}>Course Description</h2>
        <p className={styles.courseDescription}>
          {data.courseDescription.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < data.courseDescription.split("\n").length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
            </React.Fragment>
          ))}
        </p>
        <h2 className={styles.sectionTitle}>
          Course Schedule: A Weekly Breakdown
        </h2>
        <table className={styles.responsiveTable}>
          <thead>
            <tr>
              <th>WeeklyTopics and Details</th>
              <th>WeeklyTopics and Details</th>
            </tr>
          </thead>
          <tbody>{createScheduleTable()}</tbody>
        </table>
        <h2 className={styles.sectionTitle}>Technological Proficiency</h2>
        <p className={styles.techProficiency}>
          {data.technologicalProficiency}
          <br />
          <a href="https://colab.research.google.com/">Google Colab</a>
        </p>
      </div>
    </div>
  );
};

export { Spring2024 };
