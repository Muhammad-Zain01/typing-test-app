'use client'
import classes from './typing-container.module.css'
import React, { useState } from 'react'
import { useRef } from 'react'
import useTypingContext from '@/hooks/useTypingContext'
import { Divider, Popover } from 'antd'
type ComponentProps = {
    onKeyPress: (key: any) => void
}
const TypingContainer: React.FC<ComponentProps> = ({ onKeyPress }) => {
    const { currentParagraph, currentIndex, currentStatus } = useTypingContext()
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef()
    const Status = ['current-key', 'green', 'red']

    return (
        <>
            <div className={classes['typing-box']} onClick={() => inputRef.current.focus()}  >
                <div className={classes.div}>
                    {
                        currentParagraph.map((item, idx) => {
                            return (
                                <>
                                    {
                                        idx == 0 ? (
                                            <Popover
                                                content={
                                                    <div>
                                                        Start Typing Here
                                                    </div>
                                                }
                                                trigger="click"
                                                open={true}
                                                key={idx + "UNIQE"}
                                            // onOpenChange={handleOpenChange}
                                            >
                                                <span
                                                    key={idx}
                                                    className={`${isFocused && idx === currentIndex ? classes[Status[currentStatus]] : ""}  ${idx < currentIndex ? classes['green'] : ""}`}>
                                                    {item}
                                                </span>
                                            </Popover>
                                        ) : (
                                            <span
                                                key={idx}
                                                className={`${isFocused && idx === currentIndex ? classes[Status[currentStatus]] : ""}  ${idx < currentIndex ? classes['green'] : ""}`}>
                                                {item}
                                            </span>
                                        )
                                    }
                                </>

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
            />
        </>

    )
}

export default TypingContainer