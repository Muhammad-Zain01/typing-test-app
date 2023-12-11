import React from 'react'
import classes from './typing-cards.module.css'
import Card from './card'
// import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { TIMER } from '@/common/settings'
import useTypingContext from '@/hooks/useTypingContext'
const TypingCards: React.FC = () => {
    const { currentTimer, wpm, cpm, accuracy } = useTypingContext()
    let time = TIMER;
    let percentage = 100 - ((100 / TIMER) * currentTimer)
    
    return (
        <div className={classes['card-wrapper']}>
            <div className={classes.timer}>
                {/* <CircularProgress
                    style={{ marginRight: 40 }}
                    value={percentage}
                    size='150px'
                    thickness='4px'
                    color='#ffd000'
                >
                    <CircularProgressLabel>
                        <span className={classes['timer-label']}>
                            <span> {time - currentTimer} </span>
                            <span className={classes.second}>SECONDS</span>
                        </span>
                    </CircularProgressLabel>
                </CircularProgress> */}
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