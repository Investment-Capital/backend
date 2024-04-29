type DatabaseStatus = {
  status: string;
  execute: (...data: any) => any;
};

export default DatabaseStatus;
