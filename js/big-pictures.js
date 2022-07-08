import {isEscapeKey} from './util.js';
import {getPhotos} from './data.js';

const photosData = getPhotos();
const body = document.querySelector('body');
const bigPicturesContainer = document.querySelector('.big-picture');
const bigPicturesCloseButton = document.querySelector('#picture-cancel');
const previews = photosContainer.querySelectorAll('.picture');


// Функция закрытия полноэкранного изображения по нажатия на клавишу Escape
function onBigPicturesEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictures();
  }
}


// Функция закрывает полноэкранное изображение
function closeBigPictures () {
  bigPictures.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPicturesEscKeydown);
}


// Функция создает полноэкранное изображение
function createBigPictures (dataPicture) {
  const bigPictureImg = bigPicturesContainer.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPictureContainer.querySelector('.likes-count');
  const bigPicttureDescription = bigPictureContainer.querySelector('.social__caption');

  bigPictureImg.src = dataPicture.url;
  bigPictureLikes.textContent = dataPicture.likes;
  bigPicttureDescription.textContent = dataPicture.description;
}


// Функция открывает полноэкранное изображение
function openBigPictures (dataPicture) {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPicturesEscKeydown);
  bigPicturesCloseButton.addEventListener('click', () => {
    closeBigPictures();
  });

  createBigPictures(dataPicture);
}


function initBigPicture(item, dataPicture) {
  item.addEventListener('click', () => {
    openBigPicture(dataPicture);
  });
}

for (let i = 0; i < photosData.length; i++) {
  initBigPicture(previews[i], photosData[i]);
}

export {openBigPictures};
