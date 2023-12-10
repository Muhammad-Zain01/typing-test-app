'use client'
import classes from './typing-cards.module.css'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import Card from './card'
const TypingCards = () => {
    return (
        <div className={classes['card-wrapper']}>
            <div className={classes.timer}>
                <CircularProgress
                    style={{ marginRight: 40 }}
                    value={40}
                    size='120px'
                    thickness='4px'
                    color='#ffd000'
                >
                    <CircularProgressLabel>
                        <span className={classes['timer-label']}>
                            <span> 60 </span>
                            <span className={classes.second}>SECONDS</span>
                        </span>
                    </CircularProgressLabel>
                </CircularProgress>
            </div>
            <div className={classes.cards}>
                <Card label='words/min' />
                <Card label='chars/min' />
                <Card label='% accuracy' />
            </div>
        </div>
    )
}
export default TypingCards;