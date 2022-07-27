const ALERT_SHOW_TIME = 5000;
const TIME_OUT_DELAY = 500;


// Функция для проверки максимальной длины строки
function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
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


// Функция устраняет "дребезг" при переключении фильтров
const debounce = (callback, timeoutDelay = TIME_OUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


function shuffle(array) {
  const copyArray = array.slice();
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }
  return copyArray;
}

export {checkStringLength, isEscapeKey, haveSameElements, showAlert, debounce, shuffle};
