'use client'
import classes from './typing.module.css'
import TypingContainer from '../typing-container/typing-container';
import TypingCards from '../typing-cards/typing-cards';
import { useEffect, useState } from 'react';
import { data } from '@/text';
import useKeyPress from '@/hooks/useKeyPress';
const Typing = () => {
    const words = data.split('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentKey, setCurrentKey] = useState("")
    const [status, setStatus] = useState(0);
    useEffect(() => {
        if (currentKey === words[currentIndex]) {
            setCurrentIndex(currentIndex + 1)
        }
    }, [currentKey])

    const ExecuteType = (key: string) => setCurrentKey(key)
    useKeyPress(ExecuteType);

    return (
        <>
            <div className={classes['parameter-container']}>
                <TypingCards />
            </div>
            <div className={classes['typing-container']}>
                <TypingContainer data={words} index={currentIndex} />
            </div>
        </>
    )
}

export default Typing;