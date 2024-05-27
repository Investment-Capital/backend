import { SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import months from "../../../classes/months";

export default {
  data: new SlashCommandBuilder()
    .setName("trick-or-treat")
    .setDescription("???"),
  disabled: () => {
    const currentDate = new Date();

    return (
      (currentDate.getDate() !== 31 &&
        currentDate.getMonth() !== months.october) ||
      (currentDate.getDate() !== 1 &&
        currentDate.getMonth() !== months.november)
    );
  },
  requiedPrestige: 2,
  execute: () => null,
} satisfies Command;
