'use client'

import { useState, useEffect } from 'react'
import classes from './page.module.css'
import Typing from '@/components/typing/typing'
import GithubButton from '@/components/github-button/github-button'
import Loader from '@/components/loader/loader'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time and resources initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className={classes.main}>
      <Loader isLoading={isLoading} />
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <p>
            TYPING SPEED TEST
          </p>
          <h1>
            Master Your Typing Skills
          </h1>
          <h2>
            Improve your typing speed and accuracy with our interactive typing test. Challenge yourself and track your progress.
          </h2>
        </div>
        <Typing />
      </div>
      <GithubButton />
    </main>
  )
}
