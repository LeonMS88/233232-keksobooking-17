'use strict';

var MIN_X = 40;
var MAX_X = 1200 - 40;
var MIN_Y = 130;
var MAX_Y = 630 - 40;

// Получаем шаблон
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

// Отрисовка карты
var map = document.querySelector('.map');
map.classList.add('map--faded');

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

// Генерация меток
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

// Генерация меток на карте
// eslint-disable-next-line no-unused-vars
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

// generatePins(8);

// Добавление атрибута disabled всем полям
var setAtt = function (doc, att, item) {

  for (var i = 0; i < doc.length; i++) {
    var docList = doc[i];
    docList.setAttribute(att, item);
  }
};

// Блокировка полей формы
var fieldsetForm = document.querySelector('.ad-form');
var fieldsetList = fieldsetForm.querySelectorAll('fieldset');

var formLock = function () {
  setAtt(fieldsetList, 'disabled', 'true');
  return fieldsetList;
};

formLock();

// Блокировка формы с фильтрами
var mapFilters = document.querySelector('.map__filters');
mapFilters.classList.add('ad-form--disabled');

var mapFiltersLock = function () {
  var mapFiltersList = mapFilters.querySelectorAll('.map__filter');
  setAtt(mapFiltersList, 'disabled', 'true');
  return mapFiltersList;
};

mapFiltersLock();

// Получаем координаты главной метки
var pinMain = document.querySelector('.map__pin--main');

var getCoordsMainPin = function (elem) {

  var coords = {
    x: elem.offsetLeft,
    y: elem.offsetTop
  };

  return coords;
};

// Записываем координаты метки в строку адреса
var coordsPin = function () {

  var coordPinMain = getCoordsMainPin(pinMain);
  fieldsetForm.querySelector('#address').value = coordPinMain.x + ',' + coordPinMain.y;
};

coordsPin();

// Активация карты и форм
var activeMode = function () {
  pinMain.addEventListener('mouseup', function () {

    // Удаление класса
    var removeClass = function (doc, item) {
      doc.classList.remove(item);
    };

    removeClass(map, 'map--faded');
    removeClass(fieldsetForm, 'ad-form--disabled');
    removeClass(mapFilters, 'ad-form--disabled');

    // Удаление атрибута
    var removeAtt = function (doc, att, item) {

      for (var i = 0; i < doc.length; i++) {
        var docList = doc[i];
        docList.removeAttribute(att, item);
      }
    };

    removeAtt(formLock(), 'disabled', 'false');
    removeAtt(mapFiltersLock(), 'disabled', 'false');

  });
};

activeMode();

// Добавление атрибута обязательным полям
var addAtt = function (doc, att, val) {
  doc.setAttribute(att, val);
};

var title = document.querySelector('#title');
addAtt(title, 'required', '');
addAtt(title, 'minlength', '30');
addAtt(title, 'maxlength', '100');

var price = document.querySelector('#price');
addAtt(price, 'required', '');
addAtt(price, 'max', '1000000');

var type = document.querySelector('#type');
addAtt(type, 'required', '');

type.addEventListener('change', function (evt) {
  if (evt.target.value === 'bungalo') {
    price.placeholder = '0';
    price.min = '0';
  } else if (evt.target.value === 'flat') {
    price.placeholder = '1000';
    price.min = '1000';
  } else if (evt.target.value === 'house') {
    price.placeholder = '5000';
    price.min = '5000';
  } else if (evt.target.value === 'palace') {
    price.placeholder = '10000';
    price.min = '10000';
  }
});

var address = document.querySelector('#address');
addAtt(address, 'readonly', 'readonly');

var timein = document.querySelector('#timein');
var timeinOption = timein.querySelectorAll('option');
addAtt(timein, 'required', '');

var timeout = document.querySelector('#timeout');
var timeoutOption = timeout.querySelectorAll('option');
addAtt(timeout, 'required', '');

timein.addEventListener('change', onChange);

timeout.addEventListener('change', onChange);

function onChange(e) {
  var selectedValue = e.target.value;
  var targetId = e.target.id;
  var mirrorOptions = timeinOption;

  if (targetId === 'timein') {
    mirrorOptions = timeoutOption;
  }
  mirrorOptions.forEach(function (option) {
    option.selected = false;
    if (option.value === selectedValue) {
      option.selected = true;
    }
  });
}

document.querySelector('.ad-form__submit');
fieldsetForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
