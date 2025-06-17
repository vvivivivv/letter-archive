
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 2. Import all your page components
import { WelcomeScreen } from './pages/WelcomeScreen/WelcomeScreen';
import { CurrentLetterView } from './pages/CurrentLetterView/CurrentLetterView';
import { ArchiveView } from './pages/ArchiveView/ArchiveView';
//import { MusicPlayer } from './components/Music/Music';

function App() {
  return (
    <Router>
      {/* components that should appear on all pages */}
      {/* <Music /> */}

      {/* 4. routes component will manage switching between pages */}
      <Routes>
        {/*
          The "path" is the URL in the browser.
          The "element" is the component to show for that path.
        */}
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/letter" element={<CurrentLetterView />} />
        <Route path="/archive" element={<ArchiveView />} />
      </Routes>
    </Router>
  );
}

export default App;