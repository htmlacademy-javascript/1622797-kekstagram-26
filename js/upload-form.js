import {isEscapeKey} from './util.js';
import {body} from './big-pictures.js';
import {initScaleControl, destroyScaleControl, imgPreview} from './scale-control.js';
import {onFilterButtonChange, sliderWrapper} from './effects.js';
import {sendData} from './api.js';
import {showMessage} from './messages.js';
import {validator, imgForm} from './validate-form.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const effectList = document.querySelector('.effects__list');
const buttonCancel = uploadOverlay.querySelector('.img-upload__cancel');
const buttonSubmit = uploadOverlay.querySelector('.img-upload__submit');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


// Функция добавляет загруженную фотографию в шаблон для редактирования
function getPreviewPhoto() {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
}


// Функция отменяет нажатие клавиши Escape при фокусе на полях с хэштегом и комментарием
function onDocumentKeydown (evt) {
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
  sliderWrapper.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  buttonCancel.addEventListener('click', closeUploadOverlay);
  initScaleControl();
  effectList.addEventListener('change', onFilterButtonChange);
  getPreviewPhoto();
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
  document.removeEventListener('keydown', onDocumentKeydown);
  destroyScaleControl();
  effectList.removeEventListener('change', onFilterButtonChange);
  imgPreview.removeAttribute('class');
  imgPreview.removeAttribute('style');
}


// Обработчик события по нажатию на крестик
uploadCancel.addEventListener('click', () => {
  closeUploadOverlay();
});


// Функция блокирует кнопку отправки поста
function blockSubmitButton () {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Публикую...';
}


// Функция разрокировывает кнопку отправки поста
function unblockSubmitButton () {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
}


// Обработчик события на отправку и валидацию данных на сервер
imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = validator.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        unblockSubmitButton();
        showMessage('success');
        closeUploadOverlay();
      },
      () => {
        unblockSubmitButton();
        showMessage('error');
      },
      new FormData(evt.target),
    );
  }
});

export {openUploadOverlay};
