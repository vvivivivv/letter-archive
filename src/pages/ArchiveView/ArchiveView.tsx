// src/pages/ArchiveView/ArchiveView.tsx

// 1. Make sure Link is imported from react-router-dom
import { Link } from 'react-router-dom';

// Assuming you might use a CSS module later
// import styles from './ArchiveView.module.css';

export function ArchiveView() {
  return (
    // A simple container for styling
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>

      {/* 2. Add a header with the title and the new link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#a74069' }}>Read Letters</h1>
        <Link to="/" style={{ color: '#a74069', textDecoration: 'none' }}>
          ← Back to Welcome
        </Link>
      </div>

      <p>All the letters you've read will be shown here.</p>
      
      {/* This link can stay or be removed, depending on your preference */}
      <Link to="/letter">Back to Current Letter</Link>
    </div>
  );
}