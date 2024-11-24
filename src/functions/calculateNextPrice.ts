const calculateNextPrice = (
  currentPrice: number,
  basePrice: number,
  volatility: number
): number =>
  Math.max(
    Math.min(
      Math.floor(
        (Math.random() * basePrice * 2) / volatility - basePrice / volatility
      ) + currentPrice,
      basePrice * 3
    ),
    basePrice
  );

export default calculateNextPrice;
