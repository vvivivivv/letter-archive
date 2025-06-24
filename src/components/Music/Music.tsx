import { useState, useRef } from "react";
import { HiPlay, HiPause } from "react-icons/hi";
import styles from './Music.module.css';


export function Music() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlayPause = () => {
        if (isPlaying){
            audioRef.current?.pause();
        }
        else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={styles.playerContainer}>
            {/* the <audio> element is the actual music player
            'ref' connects it to audioRef
            'loop' makes the music repeat automatically
            */}

            <audio ref={audioRef} src='/garage_band.m4a' loop /> 
            
            <button
                onClick={togglePlayPause}
                className={styles.controlButton}
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {isPlaying ? <HiPause size={24}/> : <HiPlay size={24}/>}
            </button>
        </div>
    )
};

