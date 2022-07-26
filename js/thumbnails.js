import {createBigPictures} from './big-pictures.js';


const photoTemplate = document.querySelector('#picture').content;
const photoListFragment = document.createDocumentFragment();
const photoContainer = document.querySelector('.pictures');
const template = photoTemplate.querySelector('a');


// Функция отрисовывает миниатюру изображения и заполняет ее данными
function createThumbnail (photos) {
  const photoElement = template.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photos.url;
  photoElement.querySelector('.picture__likes').textContent = photos.likes;
  photoElement.querySelector('.picture__comments').textContent = photos.comments.length;

  photoElement.addEventListener('click', () => {
    createBigPictures(photos);
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
