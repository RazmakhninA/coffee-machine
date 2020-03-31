    Иван ДмитриевичСегодня, 26.03.в 13:25
//События

click => onclick - щелчок мыши
mouseover => onmouseover - наведение мыши
mousedown => onmousedown - зажали кнопку мыши
mouseup => onmouseup - отпустили кнопку мыши

//Способы найти элементы на странице:

1. по ID
2.  document.getElementById("balance")
    document.getElementsByClass("coffee-item")
    document.getElementsByTag("img")

3.  document.querySelector("img") 
    document.querySelector(".coffee-item")
    document.querySelector("#balance")

    document.querySelectorAll(".coffee-item")
    
  далее
  
  //Изменять стили элементов

    elem.style.opacity = "25%";
    elem.style.border-radius      => elem.style.borderRadius = "50%";

    //Работа с классами

    elem.classList.add("d-none") //добавить класс
    elem.classList.remove("d-none") //убрать класс
    elem.classList.toggle("d-none") //вкл/выкл класс
    elem.classList.contains("d-none") //содержит ли (выдает true или false)

    //Работа с аттрибутами

    elem.getAttribute("src") //Возвращает значение аттрибута
    elem.setAttribute("src", "img/coffee.png") //Присваимаем значение аттрибута
    elem.hasAttribute("src") //Существует ли (выдает true или false)

    //Планирование

    let timeout = setTimeout(function() {} , 2000) // Отрабатывает только один раз
    let interval = setInterval(function() {} , 2000) // Отрабатывает каждый 2 секунды пока не сбросим

    clearTimeout(timeout);
    clearInterval(interval);

    //Функции-стрелки

    function () {} ======================  () => {}

    () => alert("dfdf")  ====================== function () {return alert("dfdf")}

    //Работа со внутренним содержимим элементов
    let elem = document.querySelector("p");
    elem.innerText = "Новый текст"; //Вписать новый текст в тэг
    elem.innerHTML = "<span>Новый текст</span>"; //Вписать код HTML в элемент

    //querySelector

    let childElem = elem.querySelector(".childElem");
    
     // Cлушатели событий
  
  1. Вписать событие в html
  
  2.  let elem = document.querySelector(".elem");
      elem.onclick = someFunction;
  3.  elem.addEventListener("click", someFunction);
      elem.addEventListener("click", anotherFunction);
      
      coffeeCup.addEventListener("click", () => {
        takeCoffee
      })

      coffeeCup.onclick = function() {
        takeCoffee();
      }
      //--------------------------------------------//
      elem.onclick = null;
      elem.removeEventListener("click", someFunction);
      
      //-----параметр event-------------------------//
      
      elem.onclick = someFunction;
      
      function someFunction(event) {
        event.preventDefault() //Сбрасывает события по умолчанию
        event.clientX //Положение курсора по оси Х
        event.clientY //Положение курсора по оси Y
      } 
      

      //querySelectorAll()
      bills = document.querySelectorAll(".wallet img") ===> NodeList[img, img, img];
      
      //Получить координаты
      let elem = document.querySelector(".elem");
      let coords = elem.getBoundingClientRect();
      
      coords.x
      coords.y
      coords.width
      coords.height
      coords.top
      coords.left
      coords.right
      coords.bottom
      
    /*coffeeCup.addEventListener("click", takeCoffee, par1, par2) //второй вариант
coffeeCup.addEventListener("click", takeCoffee, par1, par2)
coffeeCup.addEventListener("click", takeCoffee, par1, par2)
coffeeCup.addEventListener("click", takeCoffee, par1, par2)

coffeeCup.addEventListener("click", buyCoffee, "Американо", 21)*/

/*coffeeCup.addEventListener("click", () => {
  takeCoffee
})*/

/*coffeeCup.onclick = function() {
  takeCoffee();
}*/
    
    