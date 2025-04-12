'use client'
import classes from './typing.module.css'
import TypingContainer from '../typing-container/typing-container';
import TypingCards from '../typing-cards/typing-cards';
import { useRef, useState } from 'react';
import { getText } from '@/common/data';
import TypingResult from '../typing-result/typing-result';
import { useEffect } from 'react';
import useTypingContext from '@/hooks/useTypingContext';
import { Howl } from 'howler';
import Settings from '../setting/setting';
import { PlayCircleOutlined, PauseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Typing = () => {
    const TypingSound = new Howl({ src: ['/typing.mp3'] });
    const WrongTyping = new Howl({ src: ['/wrong-typing.mp3'] });
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

    const [isPaused, setIsPaused] = useState(false);
    const [isTimerComplete, setIsTimerComplete] = useState(false);
    const [isParagraphComplete, setIsParagraphComplete] = useState(false);
    const typeStrokes = useRef<number>(0) // Calculate How Much Right Characters I Typed
    const keyStrokes = useRef<number>(1) // Calculate Total Characters I Typed Either Wrong or Right
    const intervalId = useRef<NodeJS.Timeout | null>(null); // Time Interval Id
    const calcIntervalId = useRef<NodeJS.Timeout | null>(null); // Parameter Calculation Interval Id
    const timeRef = useRef<number>(1); // Save Time Based on Seconds
    const hasStarted = useRef<boolean>(false); // Track if typing has started

    const changeText = () => {
        // Reset paragraph completion state
        setIsParagraphComplete(false);
        // Load new paragraph
        if (setCurrentParagraph) setCurrentParagraph(getText());
        if (setCurrentIndex) setCurrentIndex(0);
        if (setCurrentStatus) setCurrentStatus(0);
    }

    const reset = () => {
        typeStrokes.current = 0;
        keyStrokes.current = 1;
        timeRef.current = 1;
        if (setCurrentParagraph) setCurrentParagraph(getText());
        if (setCurrentTimer) setCurrentTimer(0);
        if (setCurrentIndex) setCurrentIndex(0);
        if (setCurrentStatus) setCurrentStatus(0);
        if (setWpm) setWpm(0);
        if (setCpm) setCpm(0);
        if (setAccuracy) setAccuracy(0);
        setIsPaused(false);
        setIsTimerComplete(false);
        setIsParagraphComplete(false);
        hasStarted.current = false;
        StopInterval();
    }

    const togglePause = () => {
        if (!hasStarted.current || isTimerComplete || isParagraphComplete) return; // Don't allow pause if typing hasn't started, timer is complete, or paragraph is complete

        if (isPaused) {
            // Resume
            initTimer();
            calcParams();
        } else {
            // Pause
            StopInterval();
        }
        setIsPaused(!isPaused);
    };

    const initTimer = () => {
        if (!intervalId.current && !isTimerComplete) {
            intervalId.current = setInterval(() => {
                if (currentTimer >= defaultTimer - 1) {
                    // If this is the last second, stop the timer
                    StopInterval();
                    if (setCurrentTimer) setCurrentTimer(defaultTimer);
                    setIsTimerComplete(true);
                    if (setResultModal) setResultModal(true);
                } else {
                    if (incrementTimer) incrementTimer();
                    timeRef.current = timeRef.current + 1;
                }
            }, 1000);
        }
    }

    const calcParams = () => {
        if (!calcIntervalId.current && !isTimerComplete) {
            calcIntervalId.current = setInterval(() => {
                const typed = typeStrokes.current;
                const elaspedTime = timeRef.current;
                const wpm = Math.round((typed / 5) * 60 / elaspedTime);
                const cpm = Math.round((typed / elaspedTime) * 60 / 1);
                const accuracy = Math.round((typed / keyStrokes.current) * 100);
                if (setWpm) setWpm(wpm);
                if (setCpm) setCpm(cpm);
                if (setAccuracy) setAccuracy(accuracy);
            }, 2000);
        }
    }

    const StopInterval = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }

        if (calcIntervalId.current) {
            clearInterval(calcIntervalId.current);
            calcIntervalId.current = null;
        }
    }

    const onKeyPress = (e: KeyboardEvent) => {
        if (isPaused || isTimerComplete || isParagraphComplete) return; // Don't process keypresses when paused, timer is complete, or paragraph is complete

        const { key } = e;
        if ((key.length === 1 || key === "Backspace")) {
            if (!hasStarted.current) {
                hasStarted.current = true;
            }

            keyStrokes.current = keyStrokes.current + 1;

            initTimer();
            calcParams();

            if (key === currentParagraph[currentIndex]) {
                if (defaultSound) right();
                if (incrementIndex) incrementIndex();
                if (setCurrentStatus) setCurrentStatus(0);
                typeStrokes.current = typeStrokes.current + 1;

                // Check if paragraph is complete
                if (currentParagraph.length === (currentIndex + 1)) {
                    setIsParagraphComplete(true);
                    // Wait for 2 seconds before loading a new paragraph
                    setTimeout(() => {
                        changeText();
                    }, 2000);
                }
            } else {
                if (defaultSound) wrong();
                if (setCurrentStatus) setCurrentStatus(2);
            }
        }
    }

    useEffect(() => {
        if (setCurrentParagraph) setCurrentParagraph(getText());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (currentTimer >= defaultTimer) {
            StopInterval();
            setIsTimerComplete(true);
            if (setResultModal) setResultModal(true);
        }
    }, [currentTimer, defaultTimer, setResultModal]);

    return (
        <>
            <div className={classes['parameter-container']}>
                <TypingCards />
            </div>
            <div className={classes['typing-container']}>
                <div className={classes['control-buttons']}>
                    <button
                        className={classes['control-button']}
                        onClick={togglePause}
                        disabled={!hasStarted.current || isTimerComplete || isParagraphComplete}
                        aria-label={isPaused ? "Resume typing test" : "Pause typing test"}
                        title={isPaused ? "Resume typing test" : "Pause typing test"}
                    >
                        {isPaused ? (
                            <PlayCircleOutlined className={classes['control-icon']} />
                        ) : (
                            <PauseCircleOutlined className={classes['control-icon']} />
                        )}
                    </button>
                </div>
                <TypingContainer
                    onKeyPress={onKeyPress}
                    isPaused={isPaused || isTimerComplete}
                    isParagraphComplete={isParagraphComplete}
                />
                {isPaused && !isTimerComplete && !isParagraphComplete && (
                    <div className={classes['pause-overlay']}>
                        <div className={classes['pause-content']}>
                            <PlayCircleOutlined className={classes['pause-icon']} />
                            <h3>Typing Test Paused</h3>
                            <p>Click the play button to resume</p>
                        </div>
                    </div>
                )}
                {isTimerComplete && (
                    <div className={classes['pause-overlay']}>
                        <div className={classes['pause-content']}>
                            <h3>Time&apos;s Up!</h3>
                            <p>Your results are ready</p>
                        </div>
                    </div>
                )}
                {isParagraphComplete && !isTimerComplete && (
                    <div className={classes['pause-overlay']}>
                        <div className={classes['pause-content']}>
                            <CheckCircleOutlined className={classes['pause-icon']} style={{ color: '#22c55e' }} />
                            <h3>Paragraph Complete!</h3>
                            <p>Loading next paragraph...</p>
                        </div>
                    </div>
                )}
            </div>
            <TypingResult reset={reset} />
            <Settings reset={reset} />
        </>
    )
}

export default Typing;