const {loadPromotions, loadAllItems} = require('./database');

 function printInventory(inputs) {

    let allItems = loadAllItems();
    let promotions = loadPromotions();
    let specialItems=getSpecialItems(promotions);
    //console.log(specialItems);
    let  listItems=getListItems(inputs,allItems);
    //console.log(listItems[0].id+" "+listItems[0].number);
    let text=printToSreen(listItems);
    return text;
};

//获取特殊商品id(测试通过，返回数组：["ITEM000000", "ITEM000001", "ITEM000005"]) ）
function getSpecialItems() {
    let promotions = loadPromotions();
    for (let i in promotions) {
        if (promotions[i].type === "BUY_TWO_GET_ONE_FREE") {
            return promotions[i].barcodes;
        }
    }

}

//计算商品数量和总价
function getListItems(inputs,allItems) {
    if(!inputs){
        return "输入数据为空";
    }
    let allListItems = [];
    inputs.forEach(currentId => allItems.forEach(item => {
        let id = currentId;
        let number = 1;
        //特殊情况（ID中有"-"）
        if (currentId.includes("-")) {
            let temp_arr = currentId.split("-");
            id = temp_arr[0];
            number = temp_arr[1];//2
           // console.log("id:"+id+" "+"number:"+number);//id:ITEM000003 number:2(测试通过)
        }
        //流程
        if (id == item.barcode) {
            if (allListItems.map(item1 => item1.id).includes(id)) {
                allListItems.forEach(list_items => {
                    if (list_items.id == id) {
                        list_items.number += number;
                       // console.log("list_items.number:"+list_items.number); //(测试通过)                     
                    }
                })
            }else {
                allListItems.push({
                    id: item.barcode,
                    name: item.name,
                    number: number,
                    unit: item.unit,
                    price: item.price,
                })
            }
        }
    }));
    return allListItems;
}
function printToSreen(listItems) {
    let text = "***<没钱赚商店>购物清单***\n";
    let listItemsId=[];//保存购物清单的商品ID
    let i=0;
    let totoaPrice=0;
    let promotionPrice=0;
        //First part
    listItems.forEach(tempTtem=>{  
        text += '名称：' + tempTtem.name + '，数量：' +
        tempTtem.number + tempTtem.unit + '，单价：' +
        tempTtem.price + '(元)，小计：' + (tempTtem.price*tempTtem.number) + '(元)\n' 
        totoaPrice+=tempTtem.price*tempTtem.number;
        listItemsId[i]=tempTtem.id;
        i++;
    });
    text += '----------------------\n';
    let specialItems=getSpecialItems();
    let promotionItems = specialItems.filter(v => listItemsId.includes(v)) //保存购物清单的商品ID与特殊商品之间的交集
    //console.log(promotionItems);
    if(promotionItems.length>0){//说明购物清单中有促销产品
        text += '挥泪赠送商品：\n';
       for(let i=0;i < promotionItems.length;i++){
        //console.log("listItems.length:"+listItems.length);
        listItems.forEach(tempTtem=>{  
            //console.log(listItems[j].id);
            if(promotionItems[i] === tempTtem.id){
              //  console.log(tempTtem.id);
                if(tempTtem.number>=2){
                   num=parseInt(tempTtem.number/2);
                   text += '名称：' + tempTtem.name + '，数量：' + num + tempTtem.unit + '\n';
                   promotionPrice+=num*(tempTtem.price);
                }
            }
        });
       }
    }
    text += '总计：' + totoaPrice + '(元)\n';
    text += '节省：' + promotionPrice + '(元)\n';
    text+='**********************';
    return text;
}

module.exports = {
    printInventory: printInventory,
    getSpecialItems: getSpecialItems,
};