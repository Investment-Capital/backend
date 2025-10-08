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
  prestige: number;
  stocks: Map<string, number>;

  admin: boolean;
  created: number;
};

export default Investor;
