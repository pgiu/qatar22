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
  // TODO auth with backend
  try {
    await axios.patch("https://api.vercel.com/v9/projects/qatar22/env/API_TOKEN", {
      "value": "123456"
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