// Функция, возвращающая случайное целое число из переданного диапазона
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

getRandomPositiveInteger(2, 5);


// Функция для проверки максимальной длины строки
function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 140);

// Функция для получения случайного элемента из массива
function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

// Функция проверяет нажатие клавиши Escape
function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

export {getRandomPositiveInteger, checkStringLength, getRandomArrayElement, isEscapeKey};
