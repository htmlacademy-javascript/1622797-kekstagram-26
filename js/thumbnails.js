import {createBigPictures} from './big-pictures.js';

const photoTemplate = document.querySelector('#picture').content;
const photoListFragment = document.createDocumentFragment();
const photoContainer = document.querySelector('.pictures');
const template = photoTemplate.querySelector('a');


// Функция отрисовывает миниатюру изображения и заполняет ее данными
function createThumbnail (photo) {
  const photoElement = template.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  photoElement.addEventListener('click', () => {
    createBigPictures(photo);
  });
  photoListFragment.appendChild(photoElement);
}


// Функция создает и отрисовывает миниатюры на странице
function createThumbnails (photos) {
  photos.forEach((photo) => {
    createThumbnail(photo);
  });

  photoContainer.appendChild(photoListFragment);
}

export {createThumbnails};
