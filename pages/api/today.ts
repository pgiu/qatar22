// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, {AxiosError} from "axios";
import dayjs from "dayjs";

type Data = {
  games?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const today = dayjs().format('MM/DD/YYYY');
  const data = JSON.stringify({
    "date": today
  });

  const config = {
    method: 'post',
    url: 'http://api.cup2022.ir/api/v1/bydate',
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data : data
  };

  try {
    let response;
    if (process.env.NODE_ENV === "production") {
      response = await axios(config);
    } else {
      response = {
        data: {
          "status": "success",
          "data": [
            {
              "_id": "629c9c8a5749c4077500ead4",
              "away_score": 0,
              "away_scorers": [
                "null"
              ],
              "away_team_id": "4",
              "finished": "FALSE",
              "group": "A",
              "home_score": 0,
              "home_scorers": [
                "null"
              ],
              "home_team_id": "3",
              "id": "1",
              "local_date": "11/21/2022 19:00",
              "matchday": "2",
              "persian_date": "1400-08-30 19:30",
              "stadium_id": "1",
              "time_elapsed": "h2",
              "type": "group",
              "home_team_fa": "سنگال",
              "away_team_fa": "هلند",
              "home_team_en": "Senegal",
              "away_team_en": "Nederlands",
              "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/125px-Flag_of_Senegal.svg.png",
              "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png"
            },
            {
              "_id": "629c9c8a5749c4077500ead5",
              "away_score": 2,
              "away_scorers": [
                "Mehdi Taremi,Mehdi Taremi"
              ],
              "away_team_id": "6",
              "finished": "TRUE",
              "group": "B",
              "home_score": 6,
              "home_scorers": [
                "Jude Bellingham,Bukayo Saka,Raheem Sterling,Bukayo Saka,Marcus Rashford,Jack Grealish"
              ],
              "home_team_id": "5",
              "id": "2",
              "local_date": "11/21/2022 16:00",
              "matchday": "2",
              "persian_date": "1400-08-01 16:30",
              "stadium_id": "1",
              "time_elapsed": "finished",
              "type": "group",
              "home_team_fa": "انگلستان",
              "away_team_fa": "ایران",
              "home_team_en": "England",
              "away_team_en": "Iran",
              "home_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/125px-Flag_of_England.svg.png",
              "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/125px-Flag_of_Iran.svg.png"
            },
            {
              "_id": "629c9c8a5749c4077500ead7",
              "away_score": 0,
              "away_scorers": [
                "null"
              ],
              "away_team_id": "8",
              "finished": "FALSE",
              "group": "B",
              "home_score": 0,
              "home_scorers": [
                "null"
              ],
              "home_team_id": "7",
              "id": "4",
              "local_date": "11/21/2022 22:00",
              "matchday": "2",
              "persian_date": "1400-08-30 22:30",
              "stadium_id": "1",
              "time_elapsed": "notstarted",
              "type": "group",
              "home_team_fa": "آمریکا",
              "away_team_fa": "ولز",
              "home_team_en": "United States",
              "away_team_en": "Wales",
              "home_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/125px-Flag_of_the_United_States.svg.png",
              "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Wales_%281959%29.svg/125px-Flag_of_Wales_%281959%29.svg.png"
            }
          ]
        }
      }
    }

    res.status(200).json({games: response.data.data})
  } catch(error: any){
    // todo better error handling
    console.log(error)
    res.status(500).json({  error: error.message })
  }
}
