import numberFormats from "../config/numberFormats";

const formatNumber = (value: number) => {
  for (const [suffix, suffixValue] of Object.entries(numberFormats).reverse()) {
    if (suffixValue > value) continue;
    return `${Math.trunc((value / suffixValue) * 100) / 100}${suffix}`;
  }
  return value.toLocaleString();
};

export default formatNumber;
