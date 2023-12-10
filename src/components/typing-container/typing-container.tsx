import classes from './typing-container.module.css'
import React from 'react'

type ComponentProps = {
    data: string[];
    index: number;
    status: number;
}
const statuses = ['current-key', 'green', 'red']
const TypingContainer: React.FC<ComponentProps> = ({ data, index, status }) => {
    return (
        <div className={classes['typing-box']}  >
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
    )
}

export default TypingContainer