var expect = require('chai').expect;
const calculate = require('../main/main');

describe('taxi fee', function () {
    it("the distance is less than 0 km and the waiting time is less than 0 minute, print:the data is illegal",function(){
        let distance=-2;
        let minute=-1;
        let money=calculate(distance,minute);
        expect(money).to.be.equal("The data is illegal!");
    });
    it("the distance is less than 2 km and the waiting time is 0 minute, the starting price is 6",function(){
        let distance=1.5;
        let minute=0;
        let money=calculate(distance,minute);
        expect(money).to.be.equal(6);
    });
    it("the distance 8 km and the waiting time is 2 minute,the starting price is 11",function(){
        let distance=8;
        let minute=2;
        let money=calculate(distance,minute);
        expect(money).to.be.equal(11);
    });
    it("the distance 10 km and the waiting time is 6 minute, the starting price is 15",function(){
        let distance=10;
        let minute=6;
        let money=calculate(distance,minute);
        expect(money).to.be.equal(15);
    });   
});
