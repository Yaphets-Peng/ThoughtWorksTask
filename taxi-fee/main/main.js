module.exports = function calculate(distance, minute) {
  if (distance < 0 || minute < 0) {
      return ("The data is illegal!");
  } else if (0<distance  && distance <= 2) {
      return Math.round(6 + minute * 0.25);
  } else if (2 < distance && distance <= 8) {
      return Math.round(6 + (distance - 2) * 0.8 + minute * 0.25);
  } else {
      return Math.round(6 + (8 - 2) * 0.8 + (distance - 8) * 1.2 + minute * 0.25);
  }
};