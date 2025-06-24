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
    const [maxReadCount, setMaxReadCount] = useState<number>(0); 
    const [isInitialised, setIsInitialised] = useState<boolean>(false);

    useEffect(() => {
        // load shuffled order
        const savedOrderJSON = localStorage.getItem('letterOrder');
        let savedOrder = [];
        if (savedOrderJSON){
            try {
                savedOrder = JSON.parse(savedOrderJSON);
            } catch (e) {
                savedOrder = [];
            }
        }
        
        if (savedOrder && savedOrder.length === allLetters.length) {
            setShuffledOrder(savedOrder);
        } 
        else {
        // create and save new order
            const initialOrder = allLetters.map((_, index) => index);
            const newShuffledOrder = shuffleArray(initialOrder);
            localStorage.setItem('letterOrder', JSON.stringify(newShuffledOrder));
            setShuffledOrder(newShuffledOrder);

            localStorage.setItem('readCount', '0');
            localStorage.setItem('maxReadCount', '0');
        }
    

        // load num of read letters
        const savedReadCount = localStorage.getItem('readCount');

        // max read count for permanent archive
        const savedMaxReadCount = localStorage.getItem('maxReadCount');

        const currentReadCount = savedReadCount ? parseInt(savedReadCount, 10) : 0;
        setReadCount(currentReadCount);

        const currentMaxReadCount = savedMaxReadCount ? parseInt(savedMaxReadCount, 10) : 0;
        setMaxReadCount(Math.max(currentReadCount, currentMaxReadCount));

        setIsInitialised(true);
    }, []);


    // func to reveal next letter
    const revealNextLetter = () => {
        if (readCount < allLetters.length){
            const newReadCount = readCount + 1;
            setReadCount(newReadCount);
            localStorage.setItem('readCount', newReadCount.toString());

            if (newReadCount > maxReadCount) {
                setMaxReadCount(newReadCount);
                localStorage.setItem('maxReadCount', newReadCount.toString());
            }
        }
    };

    // func to return to prev letter
    const revealPreviousLetter = () => {
        if (readCount > 0){
            const newReadCount = readCount - 1;
            setReadCount(newReadCount);
            localStorage.setItem('readCount', newReadCount.toString())
        }
    };

    // determine current letter based on shuffled order and read count
    const currentLetterIndex = isInitialised ? shuffledOrder[readCount] : -1;
    const currentLetter: Letter | null = currentLetterIndex > -1 ? allLetters[currentLetterIndex] : null;

    // expose read letters
    const readLetters = isInitialised ? shuffledOrder.slice(0, maxReadCount).map(index => allLetters[index]) : [];
    const areAllLettersRead = readCount >= allLetters.length;
    const canGoBack = readCount > 0;

    return {
        isInitialised, currentLetter, readLetters, revealNextLetter, revealPreviousLetter,
        areAllLettersRead, canGoBack, readCount, totalLetters: allLetters.length,
    };
};