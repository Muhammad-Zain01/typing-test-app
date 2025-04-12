import { Modal, Button } from 'antd';
import React from 'react';
import classes from './typing-result.module.css'
import useTypingContext from '@/hooks/useTypingContext';
import SocialShare from '../social-share/social-share';
import Image from 'next/image';
import { TrophyOutlined, RedoOutlined } from '@ant-design/icons';
import { useTheme } from '@/context/theme-context';

type ComponentProps = {
    reset: () => void
}
const TypingResult: React.FC<ComponentProps> = ({ reset }) => {
    const { wpm, cpm, accuracy, resultModal, setResultModal } = useTypingContext();
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const reviews = [
        { 
            head: 'Speed Master', 
            img: 'https://res.cloudinary.com/dn1j6dpd7/image/upload/v1600425019/typing-speed-test/avatars/octopus.svg', 
            msg: ['Amazing!', 'You have impressive typing skills!'] 
        },
        { 
            head: 'Getting Better', 
            img: 'https://res.cloudinary.com/dn1j6dpd7/image/upload/v1600425019/typing-speed-test/avatars/turtle.svg', 
            msg: ['Good effort!', 'Keep practicing to improve your speed!'] 
        }
    ]
    const heading = wpm > 25 ? reviews[0].head : reviews[1].head
    const img = wpm > 25 ? reviews[0].img : reviews[1].img
    const msg = wpm > 25 ? reviews[0].msg : reviews[1].msg

    const close = () => {
        setResultModal && setResultModal(false)
        reset()
    }

    const shareText = `I just scored ${wpm} WPM (${cpm} CPM) with ${accuracy}% accuracy on this typing test! Can you beat my score?`;
    
    return (
        <div>
            <Modal
                open={resultModal}
                onCancel={close}
                footer={false}
                centered
                width={500}
                closeIcon={<span style={{ color: 'var(--text-secondary)', fontSize: 18 }}>×</span>}
                styles={{
                    mask: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                        padding: 0,
                        borderRadius: 'var(--border-radius)',
                        overflow: 'hidden'
                    }
                }}
            >
                <div className={classes.result}>
                    <div className={classes.confetti}></div>
                    <h2 className={classes.heading}>
                        <TrophyOutlined style={{ marginRight: 10, color: 'var(--primary-color)' }} />
                        {heading}
                    </h2>
                    <div className={classes.image}>
                        <div className={`${classes.imageWrapper} ${isDarkMode ? classes.darkModeImage : ''}`}>
                            <Image 
                                src={img} 
                                alt={heading} 
                                width={150} 
                                height={150} 
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                    
                    <div className={classes.stats}>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>{wpm}</span>
                            <span className={classes.statLabel}>WPM</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>{cpm}</span>
                            <span className={classes.statLabel}>CPM</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>{accuracy}%</span>
                            <span className={classes.statLabel}>Accuracy</span>
                        </div>
                    </div>
                    
                    <p className={classes['result-text']}>
                        {msg[0]} <mark>{msg[1]}</mark>
                    </p>
                    
                    <div className={classes.button}>
                        <Button 
                            type='primary' 
                            onClick={close}
                            icon={<RedoOutlined />}
                            className={isDarkMode ? classes.darkModeButton : ''}
                            style={{
                                backgroundColor: isDarkMode ? '#ff4d4f' : 'var(--primary-color)',
                                borderColor: isDarkMode ? '#ff4d4f' : 'var(--primary-color)',
                                color: isDarkMode ? 'white' : 'var(--text-primary)',
                                fontWeight: 600
                            }}
                        >
                            Try again
                        </Button>
                    </div>
                    
                    <div className={`${classes['social-share']} ${isDarkMode ? classes.darkModeSocial : ''}`}>
                        <SocialShare 
                            title="My Typing Test Results" 
                            text={shareText}
                        />
                    </div>
                    
                    <div className={classes.footer}>
                        <span>Created by Muhammad Zain</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TypingResult;