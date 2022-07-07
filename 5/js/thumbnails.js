import {getPhotos} from './data.js';

function createThumbnails () {
  const photoTemplate = document.querySelector('#picture').content;
  const photosContainer = document.querySelector('.pictures');
  const photosData = getPhotos();
  const photoListFragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoListFragment.appendChild(photoElement);
  });

  photosContainer.appendChild(photoListFragment);
}

export {createThumbnails};

