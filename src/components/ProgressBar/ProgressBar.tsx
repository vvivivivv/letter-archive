import styles from './ProgressBar.module.css'

import charStage6 from '/images/ProgressBarImages/charStage6.png'
import charStage5 from '/images/ProgressBarImages/charStage5.png'
import charStage4 from '/images/ProgressBarImages/charStage4.png'
import charStage3 from '/images/ProgressBarImages/charStage3.png'
import charStage2 from '/images/ProgressBarImages/charStage2.png'
import charStage1 from '/images/ProgressBarImages/charStage1.png'

interface ProgressBarProps {
    progress: number;
    readCount: number;
    totalLetters: number;
}

const getProgressState = (progress: number) => {
    if (progress >= 100){
        return {image: charStage6, message: "i love you more than 100 reasons"}
    }
    else if (progress >= 80){
        return {image: charStage5, message: "almost there..."}
    }
    else if (progress >= 60){
        return {image: charStage4, message: "zoom zoom"}
    }
    else if (progress >= 40){
        return {image: charStage3, message: ""}

    }
    else if (progress >= 20){
        return {image: charStage2, message: "waddle waddle"}
    }
    else {
        return { image: charStage1, message: "first of many" };
    }
}

export function ProgressBar({progress, readCount, totalLetters}: ProgressBarProps){
    const {image, message} = getProgressState(progress);
    const cappedProgress = Math.min(progress, 100);

    return (
    <div className={styles.progressBarContainer}>
        <div className={styles.statusMessage}>{message}</div>
        <div className={styles.track}>

        <div 
            className={styles.fill} 
            style={{width: `${cappedProgress}%`}} 
        />

        <img
          src={image}
          alt="Progress character"
          className={styles.character}
          style={{left: `${cappedProgress}%`}}
        />

        <div className={styles.counter}>
            {readCount}/{totalLetters}
        </div>

      </div>
    </div>
    );
}