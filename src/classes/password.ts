import { hash, compare } from "bcrypt";
import { config } from "dotenv";
config();

const ENCRYPTION_SALT_ROUNDS = parseInt(
  process.env.ENCRYPTION_SALT_ROUNDS as string
);

class Password {
  static hash = (password: string) => hash(password, ENCRYPTION_SALT_ROUNDS);
  static verify = (password: string, hashedPassword: string) =>
    compare(password, hashedPassword);
}

export default Password;
