const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = imgUploadOverlay.querySelector('.img-upload__preview img');

const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
let currentValue;


// Функция показывает масштаб изображения
function scale () {
  scaleControlValue.value = `${currentValue}%`;
  imgPreview.style.transform = `scale(${currentValue / 100})`;
}


// Функция увеличивает фотографию по нажатию на плюс
function zoomOut () {
  if (currentValue > MIN_VALUE) {
    currentValue -= STEP_VALUE;
  }
  scale();
}


// Функция уменьшает фотографию по нажатию на минус
function zoomIn () {
  if (currentValue < MAX_VALUE) {
    currentValue += STEP_VALUE;
  }
  scale();
}


// Функция управления контролем масштаба на фотографии
function initScaleControl () {
  currentValue = MAX_VALUE;
  scaleControlValue.value = `${MAX_VALUE}%`;
  imgPreview.style.transform = `scale(${1})`;
  scaleControlSmaller.addEventListener('click', zoomOut);
  scaleControlBigger.addEventListener('click', zoomIn);
}


// Функция снимает обработчики с кнопок
function destroyScaleControl () {
  scaleControlSmaller.removeEventListener('click', zoomOut);
  scaleControlBigger.removeEventListener('click', zoomIn);
}

export {initScaleControl, destroyScaleControl, imgPreview};
