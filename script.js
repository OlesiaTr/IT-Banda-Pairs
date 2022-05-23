// 1. Выбрать поле для игры
// 2.Заполнить игровое поле карточками(тегами li)
// 3. Сделать клик по карточкам
// 4. Сделать переворачивание карточек
// 4.1 Разместить картинки для каждой карточки
// 4.2 Показываем картинки
// 5. Если выбрано две картинки - проверяем на совпадение
// 5.1 Если картинки совпадают, то удаляем карточки
// 5.2 Иначе перевернуть все карточки
// 6. Если все карточки удалены - вывести окно с перезапуском игры
// 7. При клике на кнопку "Рестарт" - обновляем страницу

var cardsField = document.querySelector("#cards");
var countCards = 30;

var images = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15,
];

var selected = [];
var pause = false;

var resetBlock = document.querySelector("#reset");
var resetBtn = document.querySelector("#reset-btn");
var deletedCards = 0;

for (var i = 0; i < countCards; i = i + 1) {
  var li = document.createElement("li");
  li.id = i;

  cardsField.appendChild(li);
}

cardsField.onclick = function (event) {
  if (pause == false) {
    var element = event.target;

    if (element.tagName == "LI" && element.className != "active") {
      selected.push(element);
      element.className = "active";
      element.style.backgroundImage =
        'url("images/' + images[element.id] + '.png")';

      if (selected.length == 2) {
        pause = true;
        if (images[selected[0].id] == images[selected[1].id]) {
          selected[0].style.visibility = "hidden";
          selected[1].style.visibility = "hidden";
          deletedCards = deletedCards + 2;
        }

        setTimeout(refreshCards, 600);
      }
    }
  }
};

function refreshCards() {
  for (var i = 0; i < countCards; i++) {
    cardsField.children[i].className = "";
    cardsField.children[i].style.backgroundImage = 'url("images/back.png")';
  }
  selected = [];

  pause = false;
  if (deletedCards == countCards) {
    resetBlock.style.display = "block";
  }
}

resetBtn.onclick = function () {
  location.reload();
};
