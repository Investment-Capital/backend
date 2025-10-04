import z from "zod";
import Route from "../../../types/route";
import { config } from "dotenv";
import investors from "../../../database/schemas/investors";
import Password from "../../../classes/password";
config();

export default {
  path: "/auth/login",
  method: "post",
  schema: {
    username: z.string(),
    password: z.string(),
  },
  execute: async (_, req, res) => {
    const { password, username } = req.body;

    const foundUser = await investors.findOne({
      "account.profile.username": username,
    });

    if (!foundUser)
      return res.json({
        error: "No account with this username exists, please signup",
      });

    const correctPassword = await Password.verify(
      password,
      foundUser.account.infomation.password
    );

    if (!correctPassword)
      return res.json({
        error: "Incorrect password",
      });

    res.json({ authorization: foundUser.account.infomation.authorization });
  },
} satisfies Route;
