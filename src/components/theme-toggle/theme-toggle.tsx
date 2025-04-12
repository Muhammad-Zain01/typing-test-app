'use client'

import React from 'react';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import classes from './theme-toggle.module.css';
import { useTheme } from '@/context/theme-context';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <div className={classes['theme-toggle-container']}>
            <button 
                className={classes['theme-toggle-button']} 
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? (
                    <BulbOutlined style={{ fontSize: 20 }} />
                ) : (
                    <BulbFilled style={{ fontSize: 20 }} />
                )}
            </button>
        </div>
    );
};

export default ThemeToggle;
