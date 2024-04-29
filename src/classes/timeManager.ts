type data = (currentHours: number, setHours: any) => number;

const calculateTime = (calculate: data) => {
  const currentTime = new Date();
  const nextTime = new Date(currentTime);

  calculate(currentTime.getHours(), nextTime.setHours.bind(nextTime));

  return nextTime.getTime() - currentTime.getTime();
};

class timeManager {
  static stockUpdate = () =>
    calculateTime((hours, setHours) => setHours(hours + 1, 0, 0, 0));
}

export default timeManager;
