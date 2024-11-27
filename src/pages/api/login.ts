/* eslint-disable @typescript-eslint/no-explicit-any */ 

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const LOGIN_URL = "https://rb-playground.onrender.com/internal/api/v1/auth/login/";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;
    const response = await axios.post(
      LOGIN_URL,
      { email, password },
      {
        headers: {
          "Accept": "application/json",
          "Origin": "https://rb-playground.onrender.com",
        },
      }
    );

    const { access } = response.data.data;

    // Set token as HTTP-only cookie
    res.setHeader("Set-Cookie", `token=${access}; Path=/; HttpOnly`);

    res.status(response.status).json({ message: "Login successful" });
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Internal Server Error",
    });
  }
}
