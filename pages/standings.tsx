import Head from 'next/head'
import dayjs from 'dayjs'

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
import styles from '../styles/Home.module.css'
import Image from "next/image";
import Link from "next/link";

interface Team {
  "team_id": string;
  "mp": string;
  "w": string;
  "l": string;
  "pts": string;
  "gf": string;
  "ga": string;
  "gd": string;
  "d": string;
  "name_en": string;
  "flag": string;
}

interface Standing {
  _id: string;
  group: string;
  teams: Team[];
}

interface P {
  standings?: Standing[];
  error?: string;
}

export default function Standings({standings, error}: P) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Qatar 2022</title>
        <meta name="description" content="Qatar 2022 standings"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Qatar 2022 Results
        </h1>

        <p className={styles.description}>
          {`Showing standings up to ${dayjs().format('dddd MMMM DD YYYY')}`}
        </p>

        <Link href={'/'}>See today&apos;s games</Link>

        <div className={styles.grid}>
          {
            error ? error :
              standings ? (
                  standings.length === 0 ? 'No matches today' :
                    standings.map((standing) =>
                      <div className={styles.card} key={standing._id}>
                        <h3>
                          Group {standing.group}
                        </h3>
                        <table>
                          <tr>
                            <td>
                              Team
                            </td>
                            <td>
                              Points
                            </td>
                            <td>
                              gf
                            </td>
                            <td>
                              gd
                            </td>
                          </tr>
                          {
                            standing.teams.sort((a, b) => {
                              if (a.pts > b.pts) {
                                return -1
                              } else if (a.pts < b.pts) {
                                return 1
                              } else if (a.gd > b.gd) {
                                return 1
                              } else if (a.gd < b.gd) {
                                return -1
                              }
                              return 0
                            }).map(team => (
                              <tr key={team.team_id}>
                                <td>
                                  <Image src={team.flag} width={30} height={20}
                                         alt={'flag of ' + team.name_en}/> {team.name_en}
                                </td>
                                <td>
                                  {team.pts}
                                </td>
                                <td>
                                  {team.gf}
                                </td>
                                <td>
                                  {team.gd}
                                </td>
                              </tr>
                            ))
                          }
                        </table>
                      </div>
                    )
                ) :
                'loading...'
          }
        </div>
      </main>

      <footer className={styles.footer}>
        Created with ❤️ by pgiu from 🇦🇷
      </footer>
    </div>
  )
}

export async function getStaticProps() {

  //const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/standings`)
  //const {standings, error} = await res.json()
  const {standings, error} = {standings: [], error:undefined}

  return {
    props: {
      standings: standings || null,
      error: error || null,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
  }
}
