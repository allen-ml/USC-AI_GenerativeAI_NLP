import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import { NeuralNetworkBackground } from "./components/Background/NeuralNetworkBackground";
import { Navigation } from "./components/Navigation/Navigation";
import metaData from "./content/info.json";
import { Archive } from "./pages/archive/Archive";
import { Fall2024 } from "./pages/archive/fall-2024/Fall2024";
import { Fall2024Projects } from "./pages/archive/fall-2024/Fall2024Projects";
import { Spring2024 } from "./pages/archive/spring-2024/Spring2024";
import { Spring2024Projects } from "./pages/archive/spring-2024/Spring2024Projects";
import { Spring2025 } from "./pages/archive/spring-2025/Spring2025";
import { Spring2025Projects } from "./pages/archive/spring-2025/Spring2025Projects";
import { Content } from "./pages/content/Content";
import { Credits } from "./pages/credits/Credits";
import { Home } from "./pages/home/Home";
import { Instructors } from "./pages/instructors/Instructors";
import { Schedule } from "./pages/schedule/Schedule";
import { Syllabus } from "./pages/syllabus/Syllabus";

const App: React.FC = () => {
  const location = useLocation();

  // List of paths where neural network background should be skipped
  const skipBackgroundPaths = [
    "/archive/spring-2024/projects",
    "/archive/fall-2024/projects",
    "/archive/sprint-2025/projects",
  ];
  const shouldSkipBackground = skipBackgroundPaths.includes(location.pathname);

  return (
    <div className={styles.appContainer}>
      {/* Fixed Background - skip only for specific paths */}
      {!shouldSkipBackground && (
        <div className={styles.fixedBackground}>
          <NeuralNetworkBackground />
          {/* USC TAC text stays fixed on the right */}
          <div className={styles.fixedRightText}>
            <img
              src="/usc-logo.png"
              alt="USC Logo"
              className={styles.uscLogo}
            />
            <span>USC TAC-459 {metaData.semester}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navigation />

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/archive/spring-2025" element={<Spring2025 />} />
        <Route
          path="/archive/spring-2025/projects"
          element={<Spring2025Projects />}
        />
        <Route path="/archive/fall-2024" element={<Fall2024 />} />
        <Route
          path="/archive/fall-2024/projects"
          element={<Fall2024Projects />}
        />
        <Route path="/archive/spring-2024" element={<Spring2024 />} />
        <Route
          path="/archive/spring-2024/projects"
          element={<Spring2024Projects />}
        />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </div>
  );
};

export default App;
