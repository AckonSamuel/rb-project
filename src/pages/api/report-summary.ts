/* eslint-disable @typescript-eslint/no-explicit-any */

import type {NextApiRequest, NextApiResponse} from "next";

import axios from "axios";

const REPORT_SUMMARY_URL = "https://rb-playground.onrender.com/internal/api/v1/report/summary/";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({message: "Method Not Allowed"});
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({message: "Unauthorized: Token missing"});
    }

    const response = await axios.get(REPORT_SUMMARY_URL, {
      headers: {Authorization: `Bearer ${token}`},
    });

    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Internal Server Error",
    });
  }
}
