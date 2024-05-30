const getIdBytoken = (token: string) =>
  Buffer.from(token.split(".")[0], "base64").toString("utf-8");

export default getIdBytoken;
