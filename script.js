"use strict"

let balance = document.querySelector(".balance");
let displayText = document.querySelector(".display-text");/*ищи display-text */
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");
let coffeeStatus = "waiting"; // "cooking" "ready"//

 coffeeCup.onclick = takeCoffee;/*не можем послать сюда параметры функции, нет скобок .первый вариант*/
 
 /*coffeCup.onclick = function(){
   takeCoff(this): второй вариант*/
 /*coffeCup.addEventListener("click", takeCoffee, par1, par2) // второй вариант, пишем 4 раза
   coffeCup.addEventListener("click", takeCoffee, par1, par2)
   coffeCup.addEventListener("click", takeCoffee, par1, par2)
   coffeCup.addEventListener("click", takeCoffee, par1, par2)*/
   /*coffeCup.addEventListener("click", buyCoffee, "Американо", 21)*/
   //если у функции ()то код не выполяняет посторочно//
 
function buyCoffee(name, cost,elem) {
  if (coffeeStatus !="waiting"){
    return;
  }
  let afterBuyValue = +balance.value - cost;
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {
    balance.style.border = "2px solid red";
    balance.style.backgroundColor = "pink";
    changeDisplayText("Недостаточно средств");
    return;
  }
  balance.style.border = "none";
  balance.style.backgroundColor = "white";
  balance.value = (+balance.value - cost).toFixed(2);
  cookCoffee(name,elem);
  }
 
 function cookCoffee(name,elem){
  coffeeStatus = "cooking";
  changeDisplayText("Ваш " + name + " готовится");
   
   let cupImg = elem.querySelector("img");
   let cupSrc = cupImg.getAttribute("src");
   coffeeCup.setAttribute("src",cupSrc);
   coffeeCup.style.opacity = "0%"; /*coffeeCup.classList.add("")//добавить класс*/
   coffeeCup.classList.remove("d-none");//убрать класс
   /* coffeeCup.classList.toggle("")//вкл/выкл класс
   coffeeCup.classList.contains("d-none")// содержит ли?*/
 
  let readyPercent = 0;
  let cookingInterval = setInterval(()=> {
   readyPercent++
   progressBar.style.width = readyPercent + "%";
   coffeeCup.style.opacity = readyPercent + "%";
   if (readyPercent == 100){
     coffeeStatus = "ready";
     changeDisplayText("Ваш " + name + " готов!");
     coffeeCup.style.cursor = "pointer";
     clearInterval(cookingInterval);
   }
 },100);
}
function takeCoffee(){ /* будет переводить нашу машину в состояние нового заказа и потом оно снова будет исчезать */
  if (coffeeStatus != "ready"){/*не равно готов*/
  return;
}
  coffeeStatus = "waiting";
  coffeeCup.classList.add("d-none");
  /*кружку надо забрать с помощью html*/
  coffeeCup.style.cursor = "auto";
  progressBar.style.width = "0%";
  changeDisplayText("Выберите кофе"); /*появляется по окончании эта надпись */
}
function changeDisplayText(text){
  displayText.innerHTML= "<span>"+text+ "</span>";
}

let bills = document.querySelectorAll(".wallet img");/*querySelectorAll  чтобы все найти купюры*/
for(let i = 0; i < bills.length; i++){ /*цикл для купюр*/
  bills[i].onmousedown = takeMoney;/*на мышку долгое нажатие*/
  /*bills[i].onmousedown = ()=>{takeMoney()};*/
}

function takeMoney(event){ /*вызвали функцию нажать на купюру event - это относительно курсора, он всегда слушатели событий...не поняла*/
 event.preventDefault(); /*чтобы тащилась купюра а не её призрак*/
  let bill = this;
  
  /*console.log(billCost);*/
  bill.style.position = "absolute";/*купюра встала поверх остальных*/
  bill.style.transform = "rotate(90deg)";/*перевернули купюру*/
  
 let billCoords = bill.getBoundingClientRect(); /*координаты наших купюр*/
 let billWidth = billCoords.width;   /* координаты купюры относительно не запомнила.. курсора переменная ширины*/
 let billHeight = billCoords.height;/*переменная высоты*/
 /*console.log(event);
 console.log(event.clientX, event.clientY);*/
 
 bill.style.top = event.clientY - billWidth/2 + "px";
 bill.style.left = event.clientX - billHeight/2 + "px";
 
 window.onmousemove = (event) => {  
   /*console.log(event.clientX, event.clientY);*/
  bill.style.top = event.clientY - billWidth/2 + "px";
  bill.style.left = event.clientX - billHeight/2 + "px";
 };
 bill.onmouseup = dropMoney;/*слушатель события - отжатие мышки, чтобы купюру отпускал*/
}
function dropMoney(){
  window.onmousemove = null;/* отжали мышку и купюра отпускается*/
  let bill = this;
  let billCost = bill.getAttribute("cost");
  if (inAtm(bill)){
   balance.value = +balance.value + +billCost
   bill.remove();/*убирает элемент со страницы*/
 }
}

function inAtm(bill){
  let billCoord = bill.getBoundingClientRect();/*координты купюры*/
  let atm = document.querySelector(".atm");/*нашли купюроприемник*/
  let atmCoord = atm.getBoundingClientRect();/*нашли координаты купюроприемника-*/
  let billLeftTopCornerX = billCoord.x /*левый верхний край купюры*/
  let billLeftTopCornerY = billCoord.y /*левый верхний край купюры*/
  let billRightTopCornerX = billCoord.x+billCoord.width;/* прибавили ширину*/
  let billRightTopCornerY = billCoord.y;
  
  let atmLeftTopCornerX = atmCoord.x;
  let atmLeftTopCornerY = atmCoord.y;
  
  let atmRightTopCornerX = atmCoord.x + atmCoord.width;
  let atmRightTopCornerY = atmCoord.y;
  
  let atmLeftBottomCornerX = atmCoord.x;/*координаты купюроприемника, все четыре*/
  let atmLeftBottomCornerY = atmCoord.y + atmCoord.height/3;
  
  let atmRightBottomCornerX = atmCoord.x + atmCoord.width;
  let atmRightBottomCornerY = atmCoord.y + atmCoord.height/3;/*правый нижний угол АТМ*/ /*мы нашли все, но потом почистим, все 4 необязательно*/
   
 /*console.log(
              [
                [billLeftTopCornerX, billLeftTopCornerY] , [billRightTopCornerX, billRightTopCornerY]
              ],
              [
                [atmLeftTopCornerX, atmLeftTopCornerY] , [atmRightTopCornerX, atmRightTopCornerY],
                [atmLeftBottomCornerX, atmLeftBottomCornerY] , [atmRightBottomCornerX, atmRightBottomCornerY],
              ]/*вывело на консоль две координаты купюры и 4 точки купюроприемника
              ); */
  if  (
    billLeftTopCornerX >= atmLeftTopCornerX /*проверили верхний край, что купюра не заходит левый край АТМ, ограничили слева*/
    && billLeftTopCornerY >= atmLeftTopCornerY/*ограничили справа*/
    && billRightTopCornerX <= atmRightTopCornerX /* <=  именно так */
    && billRightTopCornerY >= atmRightTopCornerY
    
    
    && billLeftTopCornerX >= atmLeftBottomCornerX
    && billLeftTopCornerY <= atmLeftBottomCornerY/* сравнили верхний левый край купюры и  левый низ АТМ */
    ){      
  return(true);
  }else {
   return(false);
  }

}
//....сдача..................//
let changeBtn = document.querySelector(".change");/*changeBtn - 'это changeBaton*/
changeBtn.onclick = takeChange;
function takeChange(){
 // alert("Сдача");/*в алерте написал сдача*/
  tossCoin("10");
}
  function tossCoin(cost){  /*функция выдает монетку, не считает пока*/
  let changeContainer = document.querySelector(".change-box");
  let changeContainerCoords = changeContainer.getBoundingClientRect();/*ищет координаты контейнера "сдача"*/
  /*console.log(changeContainerCoords); выдал коордтнаты*/
  let coinSrc= "";
  
  switch (cost){
   case"10":
     coinSrc = "img/10rub.png";
     break;
    case"5":
     coinSrc = "img/5rub.png";
     break;
   case"2":  
     coinSrc = "img/2rub.png";
     break;
    case"1":
     coinSrc = "img/1rub.png";
     break;
  }
  /*changeContainer.innerHTML += `
  <img src="${coinSrc}"style="height: 50px">  так можно добавлять новый элемент 1 способ
  `*/
  
  let coin = document.createElement("img");
  coin.setAttribute("src", coinSrc);
  coin.style.height = "50px";
  coin.style.cursor = "pointer";
  coin.style.display = "inline-block";
  coin.style.position = "absolute";
  
  changeContainer.append(coin);//внутрь контейнера прикрепить после
  /*changeContainer.prepend(coin);// прикрепить до, в самое начало*/
 /* changeContainer.after(coin);//после контейнера
  changeContainer.before(coin);// перед контейнером
  changeContainer.replace(coin);//заменяет элементы. сначала к чему, потом что прикрепляет*/
  
  coin.style.top = Math.round(Math.random()*(changeContainerCoords.height-50))+"px";
  coin.style.left = Math.round(Math.random()*(changeContainerCoords.width-50))+"px";/*добавили в css .change-box {
position: relative;
} и сдача стала только в сером квадрате не выходить за края*/

  coin.onclick = () => coin.remove();/*кушуются купюры*/
  
  
}

