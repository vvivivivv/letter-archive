import styles from './WelcomeScreen.module.css'
import { Link } from 'react-router-dom'

export function WelcomeScreen(){
    return (
        <div className={styles.welcomeContainer}>

            <div className={styles.heartsContainer}>
                {Array.from({length: 10}).map((_, index) => (
                    <div key={index} className={styles.heart}>❤️</div>
                    ))}
            </div>

            <h1 className={styles.welcomeTitle}>
                Letter Archive
            </h1>

            <Link to="/letter" className={styles.beginButton}>
                Click
            </Link>
        </div>
    );
};