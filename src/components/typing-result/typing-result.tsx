import { Modal, Button } from 'antd';
import React from 'react';
import classes from './typing-result.module.css'
import useTypingContext from '@/hooks/useTypingContext';
type ComponentProps = {
    reset: () => void
}
const TypingResult: React.FC<ComponentProps> = ({ reset }) => {
    const { wpm, cpm, accuracy, resultModal, setResultModal } = useTypingContext()

    const reviews = [
        { head: 'Octopus', img: 'https://res.cloudinary.com/dn1j6dpd7/image/upload/v1600425019/typing-speed-test/avatars/octopus.svg', msg: ['Neat!', 'Good job!'] },
        { head: 'Turtle', img: 'https://res.cloudinary.com/dn1j6dpd7/image/upload/v1600425019/typing-speed-test/avatars/turtle.svg', msg: ['Well...', 'It could be better!'] }
    ]
    const heading = wpm > 25 ? reviews[0].head : reviews[1].head
    const img = wpm > 25 ? reviews[0].img : reviews[1].img
    const msg = wpm > 25 ? reviews[0].msg : reviews[1].msg

    const close = () => {
        setResultModal && setResultModal(false)
        reset()
    }
    return (
        <div>
            <Modal
                open={resultModal}
                onCancel={close}
                footer={false}
            >
                <div className={classes.result}>
                    <h2 className={classes.heading}>
                        You&apos;re an {heading}.
                    </h2>
                    <div className={classes.image}>
                        <img src={img} alt={heading} />
                    </div>
                    <p className={classes['result-text']}>
                        {msg[0]} You type with the speed of <mark>{wpm} WPM</mark> ({cpm} CPM). Your accuracy was <b>{accuracy}%</b>. {msg[1]}
                    </p>
                    <div className={classes.button}>
                        <Button type='primary' onClick={close}>
                            Try again
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TypingResult;