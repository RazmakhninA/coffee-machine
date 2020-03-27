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
  if (coffeeStatus!= "ready"){
  return;
}
  coffeeStatus = "waiting";
  coffeeCup.classList.add("d-none");
  /*кружку надо забрать с помощью html*/
  coffeeCup.style.cursor = "auto";
  progressBar.style.width = "0%";
  changeDisplayText("Выберите кофе"); /* */
}
function changeDisplayText(text){
  displayText.innerHTML= "<span>"+text+ "</span>";
}








