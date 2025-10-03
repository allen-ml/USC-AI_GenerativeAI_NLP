import React from "react";
import { ExpandableTopics } from "../../components/ExpandableTopics/ExpandableTopics";
import spring2025Data from "../../content/spring-2025.json";
import { Spring2025Layout } from "../../layouts/Spring2025Layout/Spring2025Layout";
import type { Spring2025ContentFormat } from "../../types/ContentTypes";
import styles from "./Spring2025.module.css";

const Spring2025: React.FC = () => {
  const data: Spring2025ContentFormat =
    spring2025Data as Spring2025ContentFormat;

  // Group courses by module
  const groupedCourses = () => {
    const modules = new Map<string, typeof data.courseSchedule>();
    data.courseSchedule.forEach((course) => {
      const moduleName = course.module || "Other";
      if (!modules.has(moduleName)) {
        modules.set(moduleName, []);
      }
      modules.get(moduleName)!.push(course);
    });
    return Array.from(modules.entries());
  };

  return (
    <Spring2025Layout>
      <div className={styles.spring2025Page}>
        {/* Overview Section */}
        <section id="overview" className={`${styles.section} mt-4`}>
          <div className="container">
            <h2>Course Overview</h2>
            <p>{data.overview}</p>
          </div>
        </section>

        <hr className="hr col-md-10 mx-auto" />

        {/* Instructors Section */}
        <section id="contacts" className={styles.section}>
          <div className="container py-4">
            <div className="row">
              <div className="col-12 text-center">
                <h2>Instructors</h2>
              </div>
            </div>
            <div className="row">
              {data.instructors.map((instructor, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <div className="text-center p-3">
                    <img
                      src={instructor.profilePicture}
                      alt={instructor.name}
                      className={`${styles.fixedImage} rounded-circle mb-3`}
                    />
                    <h5>
                      <a
                        href={`staff.html?id=${instructor.name
                          .toLowerCase()
                          .replace(/\s+/g, "_")
                          .replace(/\./g, "")}`}
                        style={{ color: "#990000" }}
                      >
                        {instructor.name}
                      </a>
                    </h5>
                  </div>
                </div>
              ))}
            </div>

            <hr className="hr col-md-10 mx-auto" />

            <div className="row">
              <div className="col-12 text-center">
                <h2>Course Assistants</h2>
              </div>
            </div>
            <div className="row">
              {data.teachingAssistants.map((assistant, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="text-center p-3">
                    <img
                      src={assistant.profilePicture}
                      alt={assistant.name}
                      className={`${styles.fixedImage} rounded-circle mb-3`}
                    />
                    <h5>
                      <a
                        href={`staff.html?id=${assistant.name
                          .toLowerCase()
                          .replace(/\s+/g, "_")
                          .replace(/\./g, "")}`}
                        style={{ color: "#990000" }}
                      >
                        {assistant.name}
                      </a>
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="hr col-md-10 mx-auto" />

        {/* Office Hours Section */}
        <section id="schedules" className={`${styles.section} py-5`}>
          <div className="container">
            <h2 className="mb-4">Office Hours</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
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
                    <tr key={index}>
                      <td>{oh.instructor}</td>
                      <td>{oh.mode}</td>
                      <td>{oh.day}</td>
                      <td>{oh.time}</td>
                      <td>{oh.location}</td>
                      <td>
                        {oh.link.href ? (
                          <a href={oh.link.href} style={{ color: "#990000" }}>
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
            </div>
          </div>
        </section>

        <hr className="hr col-md-10 mx-auto" />

        {/* Course Schedule Section */}
        <section id="schedule" className={`${styles.section} py-5`}>
          <div className="container">
            <h2 className="mb-4">Course Schedule</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Week</th>
                    <th>Topics</th>
                    <th>Deliverables</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedCourses().map(([moduleName, courses]) => (
                    <React.Fragment key={moduleName}>
                      <tr className="fw-bold text-start">
                        <td colSpan={3}>{moduleName}</td>
                      </tr>
                      {courses.map((course, courseIndex) => (
                        <tr key={`${moduleName}-${courseIndex}`}>
                          <td>{course.week}</td>
                          <td>
                            <ExpandableTopics
                              title={course.title}
                              topics={course.topics}
                            />
                          </td>
                          <td>
                            {course.deliverables &&
                            course.deliverables.length > 0
                              ? course.deliverables.join(", ")
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Spring2025Layout>
  );
};

export { Spring2025 };
