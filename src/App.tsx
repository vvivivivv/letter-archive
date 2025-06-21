
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { WelcomeScreen } from './pages/WelcomeScreen/WelcomeScreen';
import { CurrentLetterView } from './pages/CurrentLetterView/CurrentLetterView';
import { ArchiveView } from './pages/ArchiveView/ArchiveView';
import { Music } from './components/Music/Music';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/letter" element={<CurrentLetterView />} />
          <Route path="/archive" element={<ArchiveView />} />
        </Routes>

        <Music />
      </div>
    </Router>
  );
}

export default App;