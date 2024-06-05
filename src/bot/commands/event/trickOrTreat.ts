import { SlashCommandBuilder } from "discord.js";
import Command from "../../../types/command";
import Months from "../../../classes/months";

export default {
  data: new SlashCommandBuilder()
    .setName("trick-or-treat")
    .setDescription("???"),
  disabled: () => {
    const currentDate = new Date();

    return (
      (currentDate.getDate() !== 31 &&
        currentDate.getMonth() !== Months.october) ||
      (currentDate.getDate() !== 1 &&
        currentDate.getMonth() !== Months.november)
    );
  },
  execute: () => null,
} satisfies Command;
