import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoCloseButton = document.querySelector('#picture-cancel');


// Функция закрытия полноэкранного изображения по нажатия на клавишу Escape
function onFullPhotoEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
}

// Функция закрывает полноэкранное изображение
function closeFullPhoto () {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
}
