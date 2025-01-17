import numberFormats from "../config/numberFormats";

const formatNumber = (value: number) => {
  for (const [suffix, suffixValue] of Object.entries(numberFormats).reverse()) {
    if (suffixValue > value) continue;
    return `${parseFloat((value / suffixValue).toFixed(2))}${suffix}`;
  }
  return value.toLocaleString();
};

export default formatNumber;
