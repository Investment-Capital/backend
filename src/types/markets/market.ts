import Investment from "./investment";

type Market<T extends { [key: string]: string }> = {
  [_ in keyof T]: Investment;
};

export default Market;
