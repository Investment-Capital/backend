type Event = {
  event: string;
  once?: boolean;
  execute: (...data: any) => any;
};

export default Event;
