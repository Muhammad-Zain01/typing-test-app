'use client'
import classes from './typing.module.css'
import TypingContainer from '../typing-container/typing-container';
import TypingCards from '../typing-cards/typing-cards';
import { useEffect, useState, useRef } from 'react';
import { data, data2 } from '@/text';
import useKeyPress from '@/hooks/useKeyPress';
const Typing = () => {
    const words = data.split('')
    const [text, setText] = useState<string[]>(words)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentKey, setCurrentKey] = useState("")
    const previousTypes = useRef(0)
    const keyStrokes = useRef(1)
    
    const [wpm, setwpm] = useState(0)
    const [cpm, setcpm] = useState(0)
    const [accuracy, setAccuracy] = useState(0)

    const [status, setStatus] = useState(0);
    const [timer, setTimer] = useState(0)
    const intervalId = useRef(null);
    const changeText = () => {
        previousTypes.current = currentIndex
        setText(data2.split(''))
        setCurrentIndex(0)
        setStatus(0)
        setCurrentKey('')
    }

    if (timer === 60) {
        clearInterval(intervalId.current);
        console.log("TIME COMPLETED")
    }
    const initTimer = () => {
        if (!intervalId.current) {
            intervalId.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer < 60 ? prevTimer + 1 : prevTimer);
                calcParams()
            }, 1000)
        }
    }
    const calcParams = () => {
        const typed = previousTypes.current + currentIndex + 1;
        const elaspedTime = timer > 0 ? timer : 1;
        setwpm(Math.round((typed / 5) * 60 / elaspedTime))
        setcpm(Math.round((typed / elaspedTime) * 60 / 1))
        setAccuracy(Math.round((typed / keyStrokes.current) * 100))
    }
    useEffect(() => {

        if (currentKey != '') {
            initTimer()
            
            keyStrokes.current =  keyStrokes.current + 1
            if (currentKey === text[currentIndex]) {
                setCurrentIndex(currentIndex + 1)
                setStatus(0)
            } else {
                setStatus(2)
            }

            if (words.length === (currentIndex + 1)) {
                changeText()
            }
        }
    }, [currentKey])

    const ExecuteType = (key: string) => setCurrentKey(key)
    useKeyPress(ExecuteType);

    return (
        <>
            <div className={classes['parameter-container']}>
                <TypingCards timer={timer} wpm={wpm} cpm={cpm} accuracy={accuracy} />
            </div>
            <div className={classes['typing-container']}>
                <TypingContainer data={text} index={currentIndex} status={status} />
            </div>
        </>
    )
}

export default Typing;