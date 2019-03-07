
const {printInventory, getSpecialItems} = require('../main/main');

describe('pos', function () {
    var inputs;

    beforeEach(function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });
    it('get BUY_TWO_GET_ONE_FREE items', function () {
        let result = getSpecialItems();
        expect(result).toEqual(['ITEM000000', 'ITEM000001', 'ITEM000005']);

    });
    
    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);
        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：15(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：13.5(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：2瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：58.5(元)\n' +
            '节省：10.5(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
   
});
