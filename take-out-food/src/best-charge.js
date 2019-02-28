
function bestCharge(selectedItems) {
  //获取全部的菜品
  let allItems = loadAllItems();
  //console.log(allItems);
  //获取全部的优惠方式
  let promotions = loadPromotions();
  //从输入中获取到菜品ID和数量([{id:"ITEM0001 x 1",num:"1"}...])
  let details=getIdAndNums(selectedItems);
  let otherDetails=getDetailMessage(details,allItems);
  //没优惠前的总价
  let totalPrice=getTotalPrice(details,allItems);
  console.log(totalPrice);
  let preferentialPrice=getPreferentialPrice(details,promotions,totalPrice,allItems);
  console.log(preferentialPrice);
  let result=print(details, otherDetails,totalPrice, preferentialPrice,allItems,promotions);
  

  return result;
}

/**
 * 根据输入获取菜品和其对应的数量然后存入到数组当中
 */
function getIdAndNums(selectedItems,allItems){
  let details = [];
  for(let i = 0; i < selectedItems.length; i++) {
    let temp = selectedItems[i].split(' x ');
    details.push((temp,{id:temp[0].trim(),num:temp[1].trim()}));
  }
  return details;
}

/**
 * 获取选择的菜品的名字和价格
 */
function getDetailMessage(details,allItems){
  let summary=0;
  let temp=[];
  for(var i=0;i<details.length;i++)
    for(var j=0;j<allItems.length;j++)
    {
      if(allItems[j].id==details[i].id)
      {
        temp.push((allItems[j],{name:allItems[j].name,price:allItems[j].price}));
      }
    }  
    return temp;
}

/**
 * 获取没优惠前的总价
*/ 
function getTotalPrice(details,allItems){
  let summary=0;
  for(var i=0;i<details.length;i++)
    for(var j=0;j<allItems.length;j++)
    {
      if(allItems[j].id==details[i].id)
      {
        summary+=allItems[j].price*details[i].num;
      }
    }  
    return summary;
}

/**
 * 获取半价商品对应的价钱和名字
 */
function getHalfItem(allItems,promotions){
  let tempArr=[];
  let halfPriceItemID=promotions[1].items;  //半价菜品id
  for(var i=0;i<halfPriceItemID.length;i++)
  for(var j=0;j<allItems.length;j++)
  {
    if(halfPriceItemID[i]==allItems[j].id)
    {
      tempArr.push((allItems[j],{id:allItems[j].id,price:allItems[j].price,name:allItems[j].name}));
    }
  }  
  return tempArr;
}

/**
 * 计算优惠后的价钱
 */
function getPreferentialPrice(details,promotions,totalPrice,allItems){
  let tempPrice1=totalPrice;
  let tempPrice2=totalPrice;
  let preferentialPrice=0;
  //第一种优惠方式
  //获取第一种优惠政策的具体优惠方式
  let temp=promotions[0].type;
  let arr=temp.split("减");
  //满max减少min
  max=arr[0].substring(1);
  min=parseInt(arr[1]);
  if(totalPrice>max){
    tempPrice1-=min;
  }
  //第二种优惠方式
  let halfItem=getHalfItem(allItems,promotions);//半价菜单
  for(var i=0;i<details.length;i++)
  for(var j=0;j<halfItem.length;j++)
  {
    if(halfItem[j].id==details[i].id)
    {
      tempPrice2-=halfItem[j].price*(1/2)*details[i].num;
    }
  }  
  if(tempPrice1>tempPrice2){
    preferentialPrice=tempPrice2;
  }else{
    preferentialPrice=tempPrice1;
  }
  return preferentialPrice;
}

function print(details, otherDetails,totalPrice, preferentialPrice,allItems,promotions) {
  let result = "============= 订餐明细 =============";
  if (totalPrice === preferentialPrice) {
    for (let i = 0; i < details.length; i++) {
      result += "\n" + otherDetails[i].name + " x " + details[i].num + " = " + otherDetails[i].price*details[i].num  + "元";
    }
    result += "\n-----------------------------------";
    result += "\n总计：" + totalPrice + "元";
    result += "\n===================================";
  }  else if (preferentialPrice === totalPrice - 6) {
    for (let i = 0; i < details.length; i++) {
    result += "\n" + otherDetails[i].name + " x " + details[i].num + " = " + otherDetails[i].price*details[i].num  + "元";
    }
    result += "\n-----------------------------------";
    result += "\n使用优惠:";
    result += "\n满30减6元，省6元";
    result += "\n-----------------------------------";
    result += "\n总计：" + preferentialPrice;
    result += "\n===================================";
  }else{
    for (let i = 0; i < details.length; i++) {
      result += "\n" + otherDetails[i].name + " x " + details[i].num + " = " +  otherDetails[i].price*details[i].num  + "元";
      }
      result += "\n-----------------------------------";
      result += "\n使用优惠:";
      result += "\n指定菜品半价(";
      let halfItem=getHalfItem(allItems,promotions);//半价菜单
      for(var i=0;i<details.length;i++)
      for(var j=0;j<halfItem.length;j++)
      {
        if(halfItem[j].id==details[i].id)
        {
          result += halfItem[j].name;
          result += "，";
        }
      }  
      result = result.substr(0, result.length - 1);
      result += ")，";
      result += "省" + (totalPrice - preferentialPrice) + "元";
      result += "\n-----------------------------------";
      result += "\n总计：" + preferentialPrice + "元";
      result += "\n===================================";
  }
  return result;
}