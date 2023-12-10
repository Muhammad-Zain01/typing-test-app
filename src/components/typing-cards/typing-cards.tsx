import React from 'react'
import classes from './typing-cards.module.css'
import Card from './card'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { TIMER } from '@/common/settings'
type ComponentProps = {
    timer: number;
    wpm: number;
    cpm: number;
    accuracy: number;
}
const TypingCards: React.FC<ComponentProps> = ({ timer, wpm, cpm, accuracy }) => {
    let time = TIMER;
    let percentage = 100 - ((100 / TIMER) * timer)
    return (
        <div className={classes['card-wrapper']}>
            <div className={classes.timer}>
                <CircularProgress
                    style={{ marginRight: 40 }}
                    value={percentage}
                    size='150px'
                    thickness='4px'
                    color='#ffd000'
                >
                    <CircularProgressLabel>
                        <span className={classes['timer-label']}>
                            <span> {time - timer} </span>
                            <span className={classes.second}>SECONDS</span>
                        </span>
                    </CircularProgressLabel>
                </CircularProgress>
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