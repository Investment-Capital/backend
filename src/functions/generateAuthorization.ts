import { randomUUID } from "crypto";

const generateAuthorization = (): string => randomUUID();

export default generateAuthorization;
