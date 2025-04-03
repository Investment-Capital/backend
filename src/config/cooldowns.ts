import Times from "../classes/times";

const cooldowns = {
  commandXp: Times.second * 30,
  daily: Times.day,
  businessNameChange: Times.day * 3,
};

export default cooldowns;
