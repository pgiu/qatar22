// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";
import {standings} from '../../stubs/standings'

type Data = {
  standings?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('aca')
  const config = {
    method: 'get',
    url: 'http://api.cup2022.ir/api/v1/standings',
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  console.log(`api token is: ${process.env.API_TOKEN}`)

  try {
    let response;
    if (process.env.NODE_ENV === "production") {
      response = await axios(config);
    } else {
      response = {
        data: standings
      }
    }

    res.status(200).json({standings: response.data.data})
  } catch (error: any) {
    // todo better error handling
    console.log(error)
    res.status(500).json({error: error.message})
  }
}
