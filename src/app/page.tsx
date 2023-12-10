import classes from './page.module.css'
import Typing from '@/components/typing/typing'
export default function Home() {
  return (
    <main className={classes.main}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <p>
            TYPING SPEED TEST
          </p>
          <h1>
            Test your typing skills
          </h1>
        </div>
        <Typing />
      </div>
    </main>
  )
}
