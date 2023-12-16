'use client'
import classes from './typing.module.css'
import TypingContainer from '../typing-container/typing-container';
import TypingCards from '../typing-cards/typing-cards';
import { useRef } from 'react';
import { getText } from '@/common/data';
import TypingResult from '../typing-result/typing-result';
import { useEffect } from 'react';
import useTypingContext from '@/hooks/useTypingContext';
import { Howl } from 'howler';
import Settings from '../setting/setting';
const Typing = () => {
    var TypingSound = new Howl({ src: ['/typing.mp3'] });
    var WrongTyping = new Howl({ src: ['/wrong-typing.mp3'] });
    const right = () => TypingSound.play();
    const wrong = () => WrongTyping.play();
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
    const typeStrokes = useRef<number>(0) // Calculate How Much Right Characters I Typed
    const keyStrokes = useRef<number>(1) // Calculate Total Characters I Typed Either Wrong or Right
    const intervalId = useRef<NodeJS.Timeout | null>(null); // Time Interval Id
    const calcIntervalId = useRef<NodeJS.Timeout | null>(null); // Parameter Calculation Interval Id
    const timeRef = useRef<number>(1); // Save Time Based on Seconds

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
        StopInterval()
    }
    const initTimer = () => {
        if (!intervalId.current) {
            intervalId.current = setInterval(() => {
                incrementTimer && incrementTimer()
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

    const StopInterval = () => {
        intervalId.current && clearInterval(intervalId.current);
        intervalId.current = null;
        calcIntervalId.current && clearInterval(calcIntervalId.current);
        calcIntervalId.current = null;

    }
    const onKeyPress = (e: KeyboardEvent) => {
        const { key } = e;
        if ((key.length === 1 || key === "Backspace")) {
            keyStrokes.current = keyStrokes.current + 1

            initTimer()
            calcParams()

            if (key === currentParagraph[currentIndex]) {
                defaultSound && right()
                incrementIndex()
                setCurrentStatus(0)
                typeStrokes.current = typeStrokes.current + 1
            } else {
                defaultSound && wrong()
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
        if ((currentTimer) >= defaultTimer) {
            StopInterval()
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
            <Settings reset={reset} />
        </>
    )
}

export default Typing;