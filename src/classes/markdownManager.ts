import { ApplicationCommand } from "discord.js";
import DateFormats from "../enum/dateFormats";
import dateFormatValues from "../config/dateFormatValues";

class MarkdownManager {
  static slashCommand = (
    commandName: `/${string}`,
    commandData?: ApplicationCommand
  ) => (commandData ? `<${commandName}:${commandData.id}>` : commandName);

  static date = (date: number, format: DateFormats) =>
    `<t:${Math.floor(date / 1000).toString() + dateFormatValues[format]}>`;
}

export default MarkdownManager;
