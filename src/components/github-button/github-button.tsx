'use client'

import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

const GithubButton = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 10
        }}>
            <a
                href="https://github.com/Muhammad-Zain01/typing-test-app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px 0 12px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--text-primary)',
                    height: 40,
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(255, 209, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    fontSize: 16,
                    fontWeight: 600,
                    textDecoration: 'none',
                    gap: '8px'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.backgroundColor = 'var(--secondary-color)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(255, 209, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(255, 209, 0, 0.3)';
                }}
            >
                <GithubOutlined style={{ fontSize: 20 }} />
                <span>Muhammad Zain</span>
            </a>
        </div>
    )
}

export default GithubButton;