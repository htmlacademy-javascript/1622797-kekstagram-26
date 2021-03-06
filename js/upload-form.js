import {isEscapeKey} from './util.js';
import {body} from './big-pictures.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const preview = document.querySelector('.img-upload__preview').querySelector('img');


// Функция отменяет нажатие клавиши Escape при фокусе на полях с хэштегом и комментарием
function onUploadFormEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === textHashtags || document.activeElement === textDescription) {
      evt.stopPropagation();
    } else {
      closeUploadOverlay();
    }
  }
}


// Функция открытия формы с изображением на странице
function openUploadOverlay () {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadFormEscKeydown);
}


// Обработчик события для загрузки изображения
uploadFile.addEventListener('change', openUploadOverlay);


// Функция закрывает форму по нажаю на Escape
function closeUploadOverlay () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  preview.src = '';
  textHashtags.value = '';
  textDescription.value = '';
  document.removeEventListener('keydown', onUploadFormEscKeydown);
}


// Обработчик события по нажатию на крестик
uploadCancel.addEventListener('click', () => {
  closeUploadOverlay();
});

export {textHashtags, textDescription};
