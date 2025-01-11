import { Request, Response } from "express";
import Route from "../../../types/route";
import dotenv from "dotenv";
import Cache from "../../../types/cache";
import createAccount from "../../../functions/createAccount";
import getIdBytoken from "../../../functions/getIdByToken";
import Times from "../../../classes/times";
import Logger from "../../../classes/logger";
dotenv.config();

export default {
  path: "/auth/login",
  method: "post",
  ratelimit: 4,
  ratelimitDuration: Times.minute,
  execute: async (cache: Cache, req: Request, res: Response) => {
    const code = req.body?.code;

    if (!code) return res.status(401).json({ error: "Invalid code." });

    const tokenData = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: getIdBytoken(process.env.TOKEN as string),
        client_secret: process.env.CLIENT_SECRET as string,
        redirect_uri: (process.env.WEBSITE_URL as string) + "/auth/login",
        code,
        grant_type: "authorization_code",
        scope: "identify",
      }).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const tokenJson = await tokenData.json();

    if ("error" in tokenJson) {
      Logger.error(new Error(tokenJson.error));

      return res.status(400).json({
        error: "Authorization error.",
      });
    }

    const userData = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenJson.token_type} ${tokenJson.access_token}`,
      },
    });

    const userJson = await userData.json();

    if ("message" in userJson) {
      Logger.error(new Error(userJson.message));

      return res.status(400).json({
        error: "Authorization error.",
      });
    }

    let foundInvestor = cache.investors.find(
      (investor) => investor.user.id == userJson.id
    );

    if (!foundInvestor)
      foundInvestor = createAccount(cache, {
        id: userJson.id,
        username: userJson.username,
        displayName: userJson.global_name ?? userJson.username,
        avatar: `https://cdn.discordapp.com/avatars/${userJson.id}/${userJson.avatar}`,
      });

    res.json({
      authorization: foundInvestor.authorization,
      ...foundInvestor.user,
    });
  },
} satisfies Route;
