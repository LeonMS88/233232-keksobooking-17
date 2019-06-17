'use strict';

var MIN_X = 40;
var MAX_X = 1200 - 40;
var MIN_Y = 130;
var MAX_Y = 630 - 40;

// Получаем шаблон
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

// Отрисовка карты
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Массив вида жилья
var offer = ['palace', 'flat', 'house', 'bungalo'];

// Находим случайный элемент
var getRandomItem = function (array) {
  var item = Math.floor(Math.random() * array.length);
  return array[item];
};

// Находим случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Подставляем номер юзера
var imgPathGenerator = function (max) {
  return new Array(max).fill(1).map(function (el, i) {
    return 'img/avatars/user0' + (i + 1) + '.png';
  });
};

var avatarImgs = imgPathGenerator(8);

// Генерация случайного не повторяющегося числа
var shuffle = function (arr) {
  var shuffledArr = arr.slice();
  var i = shuffledArr.length;
  while (--i >= 0) {
    var randNum = Math.floor(Math.random() * (i + 1));
    var temp = shuffledArr[randNum];
    shuffledArr[randNum] = shuffledArr[i];
    shuffledArr[i] = temp;
  }
  return shuffledArr;
};

// Генерация объекта с данными
var renderData = function (avatar, type, coords) {
  var data = {
    'author': {'avatar': avatar},
    'offer': {'type': type},
    'location': {'x': coords.x, 'y': coords.y}
  };
  return data;
};

var renderMapPins = function (ad) {
  // Копируем и вставляем шаблон
  var mapPin = pin.cloneNode(true);
  var mapPins = document.querySelector('.map__pins');
  var addMapPins = mapPins.appendChild(mapPin);

  // Подставляем данные
  mapPin.querySelector('img').src = ad.author.avatar;
  mapPin.style = 'left:' + ad.location.x + 'px; top:' + ad.location.y + 'px;';

  return addMapPins;
};


var generatePins = function (_max) {
  var avatars = shuffle(avatarImgs);
  var ads = [];

  for (var i = 0; i < 8; i++) {
    var avatar = avatars[i];
    var type = getRandomItem(offer);
    var coords = {
      x: getRandomNumber(MIN_X, MAX_X),
      y: getRandomNumber(MIN_Y, MAX_Y)
    };
    var adData = renderData(avatar, type, coords);
    ads.push(adData);
    renderMapPins(adData);
  }
};

generatePins(8);
