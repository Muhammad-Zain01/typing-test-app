import classes from './page.module.css'
import Typing from '@/components/typing/typing'
import GithubButton from '@/components/github-button/github-button'
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
      <GithubButton />
    </main>
  )
}
