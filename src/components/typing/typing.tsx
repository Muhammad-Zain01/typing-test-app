'use client'
import classes from './typing.module.css'
import TypingContainer from '../typing-container/typing-container';
import TypingCards from '../typing-cards/typing-cards';
import { useState, useRef } from 'react';
import { getText } from '@/common/data';
import TypingResult from '../typing-result/typing-result';
import { useEffect } from 'react';
import { TIMER } from '@/common/settings';
const Typing = () => {
    const typeStrokes = useRef(0)
    const keyStrokes = useRef(1)
    const intervalId = useRef(null);
    const calcIntervalId = useRef(null);
    const timeRef = useRef(1);

    const [text, setText] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [wpm, setwpm] = useState(0)
    const [cpm, setcpm] = useState(0)
    const [accuracy, setAccuracy] = useState(0)
    const [status, setStatus] = useState(0);
    const [timer, setTimer] = useState(0)
    const [resultModal, setResultModal] = useState(false);
    const values = { wpm, cpm, accuracy }

    const changeText = () => {
        setText(getText())
        setCurrentIndex(0)
        setStatus(0)
    }

    const reset = () => {
        typeStrokes.current = 0
        keyStrokes.current = 1
        timeRef.current = 1;
        setText(getText())
        setTimer(0)
        setCurrentIndex(0)
        setStatus(0)
        setwpm(0)
        setcpm(0)
        setAccuracy(0)
        intervalId.current = null
        calcIntervalId.current = null
    }
    const initTimer = () => {
        if (!intervalId.current) {
            intervalId.current = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === TIMER) {
                        clearInterval(intervalId.current);
                        setResultModal(true)
                    } else if (prevTimer < TIMER) {
                        timeRef.current = timeRef.current + 1
                        return prevTimer + 1
                    }
                    return prevTimer
                });
            }, 1000)
        }
    }

    const calcParams = () => {
        if (!calcIntervalId.current) {
            calcIntervalId.current = setInterval(() => {
                const typed = typeStrokes.current;
                const elaspedTime = timeRef.current;
                const wpm = Math.round((typed / 5) * 60 / elaspedTime)
                const cpm = Math.round((typed / elaspedTime) * 60 / 1)
                const accuracy = Math.round((typed / keyStrokes.current) * 100)

                setwpm(wpm)
                setcpm(cpm)
                setAccuracy(accuracy)
            }, 2000)
        }

    }

    const onKeyPress = (e) => {
        const { key } = e;
        if ((key.length === 1 || key === "Backspace")) {
            keyStrokes.current = keyStrokes.current + 1
            initTimer()
            calcParams()

            if (key === text[currentIndex]) {
                setCurrentIndex(currentIndex + 1)
                typeStrokes.current = typeStrokes.current + 1
                setStatus(0)
            } else {
                setStatus(2)
            }
            if (text.length === (currentIndex + 1)) {
                changeText()
            }
        }
    }
    useEffect(() => {
        setText(getText());
    },[])
    return (
        <>
            <div className={classes['parameter-container']}>
                <TypingCards timer={timer} wpm={wpm} cpm={cpm} accuracy={accuracy} />
            </div>
            <div className={classes['typing-container']}>
                <TypingContainer data={text} index={currentIndex} status={status} onKeyPress={onKeyPress} />
            </div>
            <TypingResult isOpen={resultModal} setIsOpen={setResultModal} values={values} reset={reset} />
        </>
    )
}

export default Typing;