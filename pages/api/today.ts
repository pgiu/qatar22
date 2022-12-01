// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import dayjs from "dayjs";
import {todayGames} from "../../stubs/todayGames";

type Data = {
  games?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const today = dayjs().format('MM/D/YYYY');
  console.log(`today is ${today}`)

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

  console.log(`api token is: ${process.env.API_TOKEN}`)

  try {
    let response;
    if (process.env.NODE_ENV === "production") {
      response = await axios(config);
    } else {
      response = {
        data: todayGames
      }
    }

    res.status(200).json({games: response.data.data})
  } catch(error: any){
    // todo better error handling
    console.log(error)
    res.status(500).json({  error: error.message })
  }
}
