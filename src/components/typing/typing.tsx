import classes from './typing.module.css'
import TypingContainer from '../typing-container/typing-container';
import TypingCards from '../typing-cards/typing-cards';
const Typing = () => {
    return (
        <>
            <div className={classes['parameter-container']}>
                <TypingCards />
            </div>
            <div className={classes['typing-container']}>
                <TypingContainer />
            </div>
        </>
    )
}

export default Typing;