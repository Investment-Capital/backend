type Investor = {
  account: {
    infomation: {
      password: string;
      authorization: string;
    };
    profile: {
      username: string;
      id: string;
    };
  };

  cash: number;
  stocks: Record<string, number>;

  admin: boolean;
  created: number;
};

export default Investor;
