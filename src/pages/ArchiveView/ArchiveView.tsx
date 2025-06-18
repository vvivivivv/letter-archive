
import { Link } from 'react-router-dom';
import styles from './ArchiveView.module.css';
import { useLetterState } from '../../hooks/useLetterData';

export function ArchiveView() {
  const { readLetters } = useLetterState();

  return (
    <div className={styles.archiveContainer}>
      <nav className="appNav">
        <div></div> 
        <Link to="/letter" className="navButton">
          ← Back to current letter
        </Link>
      </nav>

      <h1 className={styles.title}>Read letters</h1>

      {readLetters.length === 0 ? (
        <p className={styles.emptyMessage}>
          0 letters read. bb pwess to read!!
        </p>
      ) : (
        <div className={styles.grid}>
          {readLetters.map((letter) => (
            <div key={letter.id} className={styles.archiveCard}>
              <p>{letter.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}