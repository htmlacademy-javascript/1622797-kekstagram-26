const ALERT_SHOW_TIME = 5000;


// Функция, возвращающая случайное целое число из переданного диапазона
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


// Функция для проверки максимальной длины строки
function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}


// Функция для получения случайного элемента из массива
function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}


// Функция проверяет нажатие клавиши Escape
function isEscapeKey (evt) {
  return evt.key === 'Escape';
}


// Функция выбирает случайный элемент из массива
function haveSameElements(arrayOfElements) {
  return [...new Set(arrayOfElements)].length !== arrayOfElements.length;
}


// Функция показывает текст ошибки
function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomPositiveInteger, checkStringLength, getRandomArrayElement, isEscapeKey, haveSameElements, showAlert};
