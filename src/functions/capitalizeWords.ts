const capitalizeWords = (words: string) =>
  words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export default capitalizeWords;
