import chalk from "chalk";
import { WebhookClient } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL as string });

const formatDateValue = (number: number) =>
  number < 10 ? `0${number}` : number.toString();

const log = (logs: any) => {
  const date = new Date();

  console.log(
    chalk.grey(
      `${formatDateValue(date.getDay())}/${formatDateValue(
        date.getMonth() + 1
      )}/${
        date.getFullYear().toString().charAt(2) +
        date.getFullYear().toString().charAt(3)
      } ${formatDateValue(date.getHours())}:${formatDateValue(
        date.getMinutes()
      )}:${formatDateValue(date.getSeconds())}`
    ) +
      chalk.bold(" => ") +
      logs
  );
};

class logger {
  static success = (text: any) => log(chalk.green(text));
  static info = (text: any) => log(chalk.blue(text));
  static warn = (text: any) => {
    log(chalk.yellow(text));
    webhook.send({
      content: `Warning: ${text}`,
    });
  };
  static error = (text: any, error: Error) => {
    log(chalk.red(text));
    console.log(chalk.red(error.stack));
    webhook.send({
      content: `Error Occurred: ${text}`,
    });
  };
}

export default logger;
