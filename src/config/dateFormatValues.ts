import DateFormats from "../enum/dateFormats";

const dateFormatValues: { [_ in DateFormats]: string } = {
  default: "",
  shortDate: ":d",
  longTime: ":T",
  longDate: ":D",
  shortDateAndTime: ":f",
  longDateAndTime: ":F",
  relative: ":R",
  shortTime: ":t",
};

export default dateFormatValues;
