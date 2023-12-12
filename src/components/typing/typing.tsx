'use client'
import classes from './typing.module.css'
import TypingContainer from '../typing-container/typing-container';
import TypingCards from '../typing-cards/typing-cards';
import { useRef } from 'react';
import { getText } from '@/common/data';
import TypingResult from '../typing-result/typing-result';
import { useEffect } from 'react';
import useTypingContext from '@/hooks/useTypingContext';
import useSound from 'use-sound';
const Typing = () => {
    const [play] = useSound('/typing.mp3');
    const {
        setCurrentParagraph,
        setCurrentIndex,
        setCpm,
        setWpm,
        setAccuracy,
        setCurrentStatus,
        setCurrentTimer,
        setResultModal,
        incrementTimer,
        incrementIndex,
        currentParagraph,
        currentIndex,
        currentTimer,
        defaultTimer,
        defaultSound
    } = useTypingContext();
    const typeStrokes = useRef(0) // Calculate How Much Right Characters I Typed
    const keyStrokes = useRef(1) // Calculate Total Characters I Typed Either Wrong or Right
    const intervalId = useRef(null); // Time Interval Id
    const calcIntervalId = useRef(null); // Parameter Calculation Interval Id
    const timeRef = useRef(1); // Save Time Based on Seconds


    const changeText = () => {
        setCurrentParagraph(getText())
        setCurrentIndex(0)
        setCurrentStatus(0)
    }

    const reset = () => {
        typeStrokes.current = 0
        keyStrokes.current = 1
        timeRef.current = 1;
        setCurrentParagraph(getText())
        setCurrentTimer(0)
        setCurrentIndex(0)
        setCurrentStatus(0)
        setWpm(0)
        setCpm(0)
        setAccuracy(0)
        intervalId.current = null
        calcIntervalId.current = null
    }
    const initTimer = () => {
        if (!intervalId.current) {
            intervalId.current = setInterval(() => {
                incrementTimer()
                timeRef.current = timeRef.current + 1
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

                setWpm(wpm)
                setCpm(cpm)
                setAccuracy(accuracy)
            }, 2000)
        }

    }

    const onKeyPress = (e) => {
        const { key } = e;
        if ((key.length === 1 || key === "Backspace")) {
            defaultSound && play()
            keyStrokes.current = keyStrokes.current + 1
            initTimer()
            calcParams()

            if (key === currentParagraph[currentIndex]) {
                incrementIndex()
                setCurrentStatus(0)
                typeStrokes.current = typeStrokes.current + 1
            } else {
                setCurrentStatus(2)
            }

            if (currentParagraph.length === (currentIndex + 1)) {
                changeText()
            }
        }
    }
    useEffect(() => {
        setCurrentParagraph(getText());
    }, [])
    useEffect(() => {
        if (currentTimer == defaultTimer) {
            clearInterval(intervalId.current);
            setResultModal(true)
        }
    }, [currentTimer])
    return (
        <>
            <div className={classes['parameter-container']}>
                <TypingCards />
            </div>
            <div className={classes['typing-container']}>
                <TypingContainer onKeyPress={onKeyPress} />
            </div>
            <TypingResult reset={reset} />
        </>
    )
}

export default Typing;