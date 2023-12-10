'use client'
import classes from './typing-cards.module.css'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import Card from './card'
const TypingCards = () => {
    return (
        <div className={classes['card-wrapper']}>
            <div className={classes.timer}>
                <CircularProgress value={40} size='120px' thickness='4px' color='#ffd000'>
                    <CircularProgressLabel>40</CircularProgressLabel>
                </CircularProgress>
            </div>
            <div className={classes.cards}>
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}
export default TypingCards;