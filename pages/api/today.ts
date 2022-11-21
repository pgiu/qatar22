// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, {AxiosError} from "axios";

type Data = {
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = JSON.stringify({
    "date": "11/21/2022"
  });

  const config = {
    method: 'post',
    url: 'http://api.cup2022.ir/api/v1/bydate',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdiOTdiOWZkOWFhYzIyNjc5MDY1NjMiLCJpYXQiOjE2NjkwNDg0OTAsImV4cCI6MTY2OTEzNDg5MH0.PeKN6eQlB4ccV_Y8YIOkn43QpV097rfP6kZKw5z5dUI',
      'Content-Type': 'application/json'
    },
    data : data
  };

  try {
    const response = await axios(config);
    res.status(200).json(response.data.data)
  } catch(error: any){
    // todo better error handling
    res.status(500).json({ error: error.message })
  }


}
