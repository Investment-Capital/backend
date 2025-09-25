type DatabaseEvent = {
  event: string;
  execute: (...data: any[]) => any;
};

export default DatabaseEvent;
