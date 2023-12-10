import React from 'react'
import classes from './card.module.css'
type ComponentProps = {
    label: string
    value: number
}
const Card: React.FC<ComponentProps> = ({ label, value }): JSX.Element => {
    return (
        <div className={classes.card}>
            <div className={classes['card-value']}>
                <span>
                    {value}
                </span>
            </div>
            <div className={classes.label}>
                {label}
            </div>
        </div>
    )
}

export default Card