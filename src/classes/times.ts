class Times {
  static ms = 1;
  static second = Times.ms * 1000;
  static minute = Times.second * 60;
  static hour = Times.minute * 60;
  static day = Times.hour * 24;
  static week = Times.day * 7;
}

export default Times;
