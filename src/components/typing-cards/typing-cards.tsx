import React from 'react'
import classes from './typing-cards.module.css'
import Card from './card'
import useTypingContext from '@/hooks/useTypingContext'
import { Progress } from 'antd'
const TypingCards: React.FC = () => {
    const { currentTimer, wpm, cpm, accuracy, defaultTimer } = useTypingContext()
    let percentage = 100 - ((100 / defaultTimer) * currentTimer)
    return (
        <div className={classes['card-wrapper']}>
            <div className={classes.timer}>
                <Progress
                    type="circle"
                    percent={percentage}
                    size={120}
                    strokeWidth={4}
                    strokeColor={'#ffd000'}
                    style={{ backgroundColor: "white", borderRadius: '100%' }}
                    format={
                        () => (
                            <span className={classes['timer-label']}>
                                <span> {defaultTimer - currentTimer} </span>
                                <span className={classes.second}>seconds</span>
                            </span>
                        )} />
            </div>
            <br />
            <div className={classes.cards}>
                <Card label='words/min' value={wpm} />
                <Card label='chars/min' value={cpm} />
                <Card label='% accuracy' value={accuracy} />
            </div>
        </div>
    )
}
export default TypingCards;