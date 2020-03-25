"use strict"

let balance = document.querySelector(".balance");

function buyCoffee(name, cost){
  let afterbuyvalue = +balance.value-cost;
  if ((balance.value-cost)<0)
    {
      alert("Недостаточно средств!");
    return;
  }
 /* alert(`Вы заказали ${name}. Цена: ${cost}`);*/
 balance.value =+ balance.value - cost;
 alert("Ваш "+ name +" готовится");
}
