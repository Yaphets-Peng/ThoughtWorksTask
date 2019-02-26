var expect = require('chai').expect;
const calculate = require('../main/main');

describe('taxi fee', function () {
    it("the distance is less than 2 km and the waiting time is 0 minute, the starting price is 6",function(){
        let distance=1.5;
        let minute=0;
        let money=calculate(distance,minute);
        expect(money).to.be.equal(6);
       });
});
