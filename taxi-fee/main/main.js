module.exports = function calculate(distance,minute) {
    if(distance<=2){
      return  Math.round(6+minute*0.25);
    }
  };