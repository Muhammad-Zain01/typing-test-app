'use client'

import React from 'react'
import classes from './typing-cards.module.css'
import Card from './card'
import useTypingContext from '@/hooks/useTypingContext'
import { Progress } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

const TypingCards: React.FC = () => {
    const { currentTimer, wpm, cpm, accuracy, defaultTimer } = useTypingContext()
    let percentage = Math.max(0, 100 - ((100 / defaultTimer) * currentTimer))
    const remainingTime = defaultTimer - currentTimer;

    // Calculate colors based on remaining time
    const getStrokeColor = () => {
        if (percentage > 60) return { '0%': '#FFD100', '100%': '#FFC107' }; // Yellow
        if (percentage > 30) return { '0%': '#FFC107', '100%': '#FFA000' }; // Orange-Yellow
        return { '0%': '#FFA000', '100%': '#FF8800' }; // Orange
    };

    return (
        <div className={classes['card-wrapper']}>
            <div className={classes.timer}>
                <div className={classes['timer-container']}>
                    <Progress
                        type="circle"
                        percent={percentage}
                        size={130}
                        strokeWidth={8}
                        strokeColor={getStrokeColor()}
                        trailColor="rgba(255, 209, 0, 0.1)"
                        format={() => (
                            <div className={classes['timer-content']}>
                                <div className={classes['timer-icon']}>
                                    <ClockCircleOutlined />
                                </div>
                                <div className={classes['timer-value']}>
                                    {remainingTime}
                                </div>
                                <div className={classes['timer-label']}>
                                    seconds
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
            <div className={classes.cards}>
                <Card label='words/min' value={wpm} />
                <Card label='chars/min' value={cpm} />
                <Card label='% accuracy' value={accuracy} />
            </div>
        </div>
    )
}

export default TypingCards;