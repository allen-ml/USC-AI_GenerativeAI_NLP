import { Route, Routes, useLocation } from 'react-router-dom';
import styles from './App.module.css';
import { Fall2024 } from './archive/pages/Fall2024/Fall2024';
import {
  Fall2024Projects,
  Spring2024Projects,
  Spring2025Projects,
} from './archive/pages/ProjectsPage';
import { Spring2024 } from './archive/pages/Spring2024/Spring2024';
import { Spring2025 } from './archive/pages/Spring2025/Spring2025';
import { NeuralNetworkBackground } from './components/Background/NeuralNetworkBackground';
import { Navigation } from './components/Navigation/Navigation';
import { Archive } from './pages/archive/Archive';
import { Content } from './pages/content/Content';
import { Alumni } from './pages/alumni/Alumni';
import { Credits } from './pages/credits/Credits';
import { Home } from './pages/home/Home';
import { Projects } from './pages/projects/Projects';
import { Instructors } from './pages/instructors/Instructors';
import { Schedule } from './pages/schedule/Schedule';
import { Syllabus } from './pages/syllabus/Syllabus';

const SKIP_BACKGROUND_PATHS = [
  '/archive/spring-2025',
  '/archive/fall-2024',
  '/archive/spring-2024',
  '/archive/projects/fall-2024',
  '/archive/projects/spring-2025',
  '/archive/projects/spring-2024',
];

const App: React.FC = () => {
  const location = useLocation();
  const shouldSkipBackground = SKIP_BACKGROUND_PATHS.includes(location.pathname);

  return (
    <div className={styles.appContainer}>
      {!shouldSkipBackground && (
        <div className={styles.fixedBackground}>
          <NeuralNetworkBackground />
        </div>
      )}

      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/credits" element={<Credits />} />

        <Route path="/archive" element={<Archive />} />
        <Route path="/archive/spring-2025" element={<Spring2025 />} />
        <Route path="/archive/fall-2024" element={<Fall2024 />} />
        <Route path="/archive/spring-2024" element={<Spring2024 />} />
        <Route path="/archive/projects/fall-2024" element={<Fall2024Projects />} />
        <Route path="/archive/projects/spring-2025" element={<Spring2025Projects />} />
        <Route path="/archive/projects/spring-2024" element={<Spring2024Projects />} />
      </Routes>
    </div>
  );
};

export default App;
