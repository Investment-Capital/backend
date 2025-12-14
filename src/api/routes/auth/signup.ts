import z from "zod";
import Route from "../../../types/route";
import { config } from "dotenv";
import investors from "../../../database/schemas/investors";
import { randomUUID } from "crypto";
import Password from "../../../classes/password";
config();

const MIN_PASSWORD_LENGTH = parseInt(process.env.MIN_PASSWORD_LENGTH as string);

export default {
  path: "/auth/signup",
  method: "post",
  schema: {
    username: z.string().max(24),
    password: z.string().min(MIN_PASSWORD_LENGTH),
  },
  execute: async (_, req, res) => {
    const { password, username } = req.body;

    const foundUser = await investors.findOne({
      "account.profile.username": username,
    });

    if (foundUser)
      return res.json({
        error:
          "An account with this username already exists, pick a different username or login to your account",
      });

    const id = randomUUID();
    const authorization = id + " " + randomUUID();

    await new investors({
      created: Date.now(),
      account: {
        infomation: {
          authorization,
          password: await Password.hash(password),
        },
        profile: {
          username,
          id,
        },
      },
    }).save();

    res.json({ authorization });
  },
} satisfies Route;
