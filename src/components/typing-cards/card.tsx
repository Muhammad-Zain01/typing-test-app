import React from 'react'
import classes from './card.module.css'
type ComponentProps = {
    label: string
}
const Card: React.FC<ComponentProps> = ({ label }): JSX.Element => {
    return (
        <div className={classes.card}>
            <div className={classes['card-value']}>
                <span>
                    0
                </span>
            </div>
            <div className={classes.label}>
                {label}
            </div>
        </div>
    )
}

export default Card