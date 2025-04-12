'use client'

import React, { useState, useEffect } from 'react';
import classes from './loader.module.css';

interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    const [fadeOut, setFadeOut] = useState(false);
    
    useEffect(() => {
        if (!isLoading) {
            setFadeOut(true);
        }
    }, [isLoading]);
    
    if (!isLoading && fadeOut) {
        return null;
    }
    
    return (
        <div className={`${classes['loader-container']} ${fadeOut ? classes['fade-out'] : ''}`}>
            <div className={classes.logo}>TYPING TEST</div>
            <div className={classes.loader}>
                <div className={classes['loader-circle']}></div>
            </div>
            <div className={classes['loader-text']}>Loading your experience</div>
            <div className={classes['loader-subtitle']}>Preparing your typing test...</div>
        </div>
    );
};

export default Loader;
