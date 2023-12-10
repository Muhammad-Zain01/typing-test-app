'use client'
import classes from './typing-container.module.css'
import React from 'react'
import { useRef } from 'react'
type ComponentProps = {
    data: string[];
    index: number;
    status: number;
}
const statuses = ['current-key', 'green', 'red']
const TypingContainer: React.FC<ComponentProps> = ({ data, index, status, onKeyPress }) => {
    const inputRef = useRef()
    return (
        <>
            <div className={classes['typing-box']} onClick={() => inputRef.current.focus()}  >
                <div className={classes.div}>
                    {
                        data.map((item, idx) => {
                            return (
                                <span
                                    key={idx}
                                    className={`${idx === index ? classes[statuses[status]] : ""}  ${idx < index ? classes['green'] : ""}`}>
                                    {item}
                                </span>
                            )
                        })
                    }
                </div>

            </div>
            <input
                style={{ opacity: 0 }}
                ref={inputRef}
                onKeyDown={onKeyPress}
                type="text"
            />
        </>

    )
}

export default TypingContainer