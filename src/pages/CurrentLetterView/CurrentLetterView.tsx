
import { Link } from 'react-router-dom';
import { useLetterState } from '../../hooks/useLetterData';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import styles from './CurrentLetterView.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export function CurrentLetterView() {
    const {
        isInitialised,
        currentLetter,
        revealNextLetter,
        revealPreviousLetter,
        areAllLettersRead,
        canGoBack,
        readCount,
        totalLetters,
    } = useLetterState();

    if (!isInitialised) {
        return <div className={styles.loading}>ちょっとまって</div>;
    }


    const cardAnimation = {
        initial: { opacity: 0, y: 40, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -40, scale: 0.98 },
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    } as const;

    return (
        <div className={styles.pageContainer}>
            <nav className="appNav">
                <Link to="/" className="navButton">
                    Back to Welcome
                </Link>
                <Link to="/archive" className="navButton">
                    View Archive
                </Link>
            </nav>

            <div className={styles.mainContent}>
                <ProgressBar
                    progress={readCount}
                    readCount={readCount}
                    totalLetters={totalLetters}
                />

                <div className={styles.cardContainer}>
                    <AnimatePresence mode="wait">
                        {areAllLettersRead ? (
                            <motion.div
                                key="final-card"
                                className={`${styles.letterCard} ${styles.finalCard}`}
                                {...cardAnimation}
                            >
                                <h2></h2>
                                <p>
                                    The End
                                </p>
                            </motion.div>
                        ) : (
                            currentLetter && (
                                <motion.div
                                    key={currentLetter.id}
                                    className={styles.letterCard}
                                    {...cardAnimation}
                                >
                                    <p>{currentLetter.text}</p>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <div className={styles.buttonSlot}>
                    {canGoBack && (
                        <button
                            onClick={revealPreviousLetter}
                            className={styles.backButton}
                        >
                            Back
                        </button>
                    )}
                </div>
                <div className={styles.buttonSlot}>
                    {!areAllLettersRead && (
                        <button
                            onClick={revealNextLetter}
                            className={styles.nextButton}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}