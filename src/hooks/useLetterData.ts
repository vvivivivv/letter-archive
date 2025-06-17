import { useState, useEffect } from "react";
import { allLetters, type Letter } from "../data/letters";


// helper to shuffle array of letter indexes > letters in random order
const shuffleArray = (array: number[]): number[] => {
    const shuffled = [...array];

    for (let i=shuffled.length - 1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export const useLetterState = () => {
    const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
    const [readCount, setReadCount] = useState<number>(0);
    const [isInitialised, setIsInitialised] = useState<boolean>(false);

    useEffect(() => {
        // load shuffled order
        const savedOrder = localStorage.getItem('letterOrder');
        
        if (savedOrder){
            setShuffledOrder(JSON.parse(savedOrder));
        }
        else {
            // create and save new order
            const initialOrder = allLetters.map((_, index) => index);
            const newShuffledOrder = shuffleArray(initialOrder);
            localStorage.setItem('letterOrder', JSON.stringify(newShuffledOrder));
            setShuffledOrder(newShuffledOrder);
        }

        // load num of read letters
        const savedReadCount = localStorage.getItem('readCount');
        setReadCount(savedReadCount ? parseInt(savedReadCount, 10) : 0);

        setIsInitialised(true);
    }, []);


    // func to reveal next letter
    const revealNextLetter = () => {
        if (readCount < allLetters.length){
            const newReadCount = readCount + 1;
            setReadCount(newReadCount);
            localStorage.setItem('readCount', newReadCount.toString());
        }
    };

    // determine current letter based on shuffled order and read count
    const currentLetterIndex = isInitialised ? shuffledOrder[readCount] : -1;
    const currentLetter: Letter | null = currentLetterIndex > -1 ? allLetters[currentLetterIndex] : null;

    const areAllLettersRead = readCount >= allLetters.length;

    return {
        isInitialised, currentLetter, revealNextLetter, areAllLettersRead, readCount, totalLetters: allLetters.length,
    };
};