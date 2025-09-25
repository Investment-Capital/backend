import chalk from "chalk";

const log = (text: any, color: string) => console.log(chalk.hex(color)(text));

class Logger {
  static success = (text: any) => log(text, "#00FF00");
  static info = (text: any) => log(text, "#0000FF");
  static warn = (text: any) => log(text, "#FFEA00");
  static error = (error: Error) => log(error, "#FF0000");
}

export default Logger;
