import classes from './card.module.css'
const Card = () => {
    return (
        <div className={classes.card}>
            <div className={classes['card-value']}>
                <span>
                    0
                </span>
            </div>
            <div className={classes.label}>
                words/min
            </div>
        </div>
    )
}

export default Card