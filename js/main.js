'use strict';

// Отрисовка карты
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var MIN_X = 0;
var MAX_X = 1200 / 2 - 40;

var MIN_Y = 130;
var MAX_Y = 630 - 40;

// Находим случайный элемент
var getRandomItem = function (array) {
  var item = Math.floor(Math.random() * array.length);
  return array[item];
};

// Находим случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Массив вида жилья
var offer = ['palace', 'flat', 'house', 'bungalo'];

var ads = [];

var arr = [1, 2, 3, 4, 5, 6, 7, 8];

var i = arr.length;
while (--i >= 0) {
  var randNum = Math.floor(Math.random() * (i + 1));
  var temp = arr[randNum];
  arr[randNum] = arr[i];
  arr[i] = temp;
}

// eslint-disable-next-line no-redeclare
for (var i = 0; i < 8; i++) {

  var renderData = function () {
    var data = {
      'author': {'avatar': 'img/avatars/user0' + arr[i] + '.png'},
      'offer': {'type': getRandomItem(offer)},
      'location': {'x': getRandomNumber(MIN_X, MAX_X), 'y': getRandomNumber(MIN_Y, MAX_Y)}
    };
    return data;
  };
  ads.push(renderData());

  var renderMapPins = function () {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPin = pin.cloneNode(true);
    var mapPins = document.querySelector('.map__pins');
    var addMapPins = mapPins.appendChild(mapPin);

    mapPin.querySelector('img').src = ads[i].author.avatar;
    mapPin.style = 'left:' + ads[i].location.x + 'px; top:' + ads[i].location.y + 'px;';

    return addMapPins;
  };
  renderMapPins();
}


