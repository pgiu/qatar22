import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

interface Data {
  status: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const {authorization} = req.headers;

  if (authorization !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
    res.status(401).json({status: 'false'})
  }

  const response = await axios.post('http://api.cup2022.ir/api/v1/user/login',{
    'email': process.env.FOOTBALL_API_EMAIL,
    'password': process.env.FOOTBALL_API_PASSWORD
  })
  const authToken = response.data.data.token;

  try {
    // 0li8YplpB3AoUyG4 = API_TOKEN in vercel
    await axios.patch("https://api.vercel.com/v9/projects/qatar22/env/0li8YplpB3AoUyG4", {
      "value": authToken
    }, {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`
      }
    })
    res.status(200).json({"status": "ok"})
  } catch (err) {
    res.status(500).json({"status": JSON.stringify(err)})
  }
}