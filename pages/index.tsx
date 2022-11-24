import Head from 'next/head'
import dayjs from 'dayjs'

const customParseFormat = require('dayjs/plugin/customParseFormat')
// const utc = require('dayjs/plugin/utc')
// const timezone = require('dayjs/plugin/timezone')
dayjs.extend(customParseFormat)
// dayjs.extend(utc)
// dayjs.extend(timezone)
import styles from '../styles/Home.module.css'
import Image from "next/image";

interface Game {
  _id: string;
  home_team_en: string;
  away_team_en: string;
  home_flag: string;
  away_flag: string;
  local_date: string;
  time_elapsed: 'notstarted' | 'finished' | 'h1' | 'h2';
  home_score: number;
  away_score: number;
  group: string;
  finished: 'FALSE' | 'TRUE';
  home_scorers: string[];
  away_scorers: string[];
}

interface P {
  games?: Game[];
  error?: string;
}

export default function Home({games, error}: P) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Qatar 2022</title>
        <meta name="description" content="Qatar 2022 results"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Qatar 2022 Results
        </h1>

        <p className={styles.description}>
          {`Showing games for ${dayjs().format('dddd MMMM DD YYYY')}`}
        </p>

        <div className={styles.grid}>
          {
            error ? error :
              games ? games.map((g) =>
                  <div className={styles.card} key={g._id}>
                    <table>
                      <tr>
                        <td colSpan={2} style={{textAlign: 'center'}}>
                          {g.finished === 'TRUE' ?
                            'finished' :
                            (
                              g.time_elapsed !== 'notstarted' ?
                                g.time_elapsed :
                                dayjs(g.local_date).subtract(6, 'hours').format('h:mm a')
                            )}
                        </td>
                      </tr>
                      <tr>
                        <td className="right">
                          <h2>
                            {g.home_team_en} <Image width={30} height={20} src={g.home_flag} alt='flag'/>
                          </h2>
                        </td>
                        <td className='left'>
                          <h2>
                            {g.away_team_en} <Image width={30} height={20} src={g.away_flag} alt='flag'/>
                          </h2>
                        </td>
                      </tr>
                      <tr>
                        <td className='right'>
                          <h2>
                            {g.home_score}
                          </h2>
                        </td>
                        <td className='left'>
                          <h2>
                            {g.away_score}
                          </h2>
                        </td>
                      </tr>
                      {
                        g.time_elapsed !== 'notstarted' && (!g.home_scorers?.includes("null") || !g.away_scorers?.includes("null")) &&
                        <tr>
                          <td>
                            Scorers
                            <p>{!g.home_scorers?.includes("null") ? g.home_scorers[0].split(',').join(', ') : ''}</p>
                          </td>
                          <td>
                            Scorers
                            <p>{!g.away_scorers?.includes("null") ? g.away_scorers[0].split(',').join(', ') : ''}</p>
                          </td>
                        </tr>
                      }
                    </table>
                  </div>
                ) :
                'loading...'
          }
        </div>
        <p>
          The FIFA World Cup is currently being played in Qatar. The event is taking place in Qatar from 20 November to
          18 December 2022. This is the first World Cup to be held in the Arab world, and the second World Cup held
          entirely in Asia after the 2002 tournament in South Korea and Japan.
          Tune in for daily updates and never miss a
          result. Feel free to say hi on <a href={"https://www.linkedin.com/in/pablogiudice"}>LinkedIn</a>.
        </p>
      </main>

      <footer className={styles.footer}>
        Created with ❤️ by pgiu from 🇦🇷
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/today`)
  const {games, error} = await res.json()

  return {
    props: {
      games: games || null,
      error: error || null,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
  }
}
