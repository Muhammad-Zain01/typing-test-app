'use client'
import classes from './typing-container.module.css'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import useTypingContext from '@/hooks/useTypingContext'
import { Tooltip } from 'antd'

type ComponentProps = {
    onKeyPress: (key: any) => void;
    isPaused?: boolean;
    isParagraphComplete?: boolean;
}

const TypingContainer: React.FC<ComponentProps> = ({ 
    onKeyPress, 
    isPaused = false,
    isParagraphComplete = false 
}) => {
    const { currentParagraph, currentTimer, currentIndex, currentStatus } = useTypingContext()
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const Status = ['current-key', 'green', 'red']

    useEffect(() => {
        if (!isPaused && !isParagraphComplete) {
            inputRef.current && inputRef.current.focus()
        }
    }, [isPaused, isParagraphComplete])

    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [])

    return (
        <>
            <div 
                className={`${classes['typing-box']} ${isPaused ? classes['typing-box-paused'] : ''} ${isParagraphComplete ? classes['typing-box-completed'] : ''}`} 
                onClick={() => !isPaused && !isParagraphComplete && inputRef.current && inputRef.current.focus()}
            >
                <div className={classes.div}>
                    {
                        currentParagraph.map((item, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    {
                                        idx == 0 ? (
                                            <Tooltip
                                                title={"Start Typing"}
                                                className={classes.typingLabel}
                                                color='#ffd000'
                                                open={currentIndex == 0 && currentTimer == 0 ? true : false}
                                            >
                                                <span
                                                    className={`${isFocused && idx === currentIndex && !isParagraphComplete ? classes[Status[currentStatus]] : ""}  ${idx < currentIndex ? classes['green'] : ""}`}>
                                                    {item}
                                                </span>
                                            </Tooltip>
                                        ) : (
                                            <span
                                                className={`${isFocused && idx === currentIndex && !isParagraphComplete ? classes[Status[currentStatus]] : ""}  ${idx < currentIndex ? classes['green'] : ""}`}>
                                                {item}
                                            </span>
                                        )
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
            <input
                className={classes.input}
                ref={inputRef}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={onKeyPress}
                type="text"
                disabled={isPaused || isParagraphComplete}
            />
        </>
    )
}

export default TypingContainer