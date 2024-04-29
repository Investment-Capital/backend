const getIdBytoken = (token: string) => {
  const parseuser = token.split(".")[0];
  const buff = Buffer.from(parseuser, "base64");
  return buff.toString("utf-8");
};

export default getIdBytoken;
