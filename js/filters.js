import {debounce, shuffle} from './util.js';
import {createThumbnails} from './thumbnails.js';

const RANDOM_PHOTOS_COUNT = 10;
const filters = document.querySelector('.img-filters');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');


// Функция высчитывает разницу между количеством комменатриев изображений
function compareComments (a, b) {
  return b.comments.length - a.comments.length;
}


// Функция показывает все фотографии с сервера
function createDefaultFilters (photos) {
  return photos.slice().sort((photoA, photoB) => photoA.id - photoB.id);
}


// Функция показывает рандомные 10 фотографий
function createRandomFilters (photos) {
  const photosArray = photos.slice();
  return shuffle(photosArray.slice()).slice(0, RANDOM_PHOTOS_COUNT);
}


// Фукнция показывает самые обсуждаемые фотографии
function createDiscussedFilters (photos) {
  const photosArray = photos.slice();
  return photosArray.sort(compareComments);
}


// Функция удаляет класс у кнопок фильтров
function removeActiveClass () {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
}


// Функция очищает главную страницу
function clearPhotosContainer () {
  const allPhotos = document.querySelectorAll('.picture');
  allPhotos.forEach((photos) => {
    photos.remove();
  });
}


function renderPhotosFilter (photos) {
  clearPhotosContainer();
  createThumbnails(photos);
}


// Функция переключает фильтры с изображениями
function showPhotosFilter (photos) {
  filters.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === defaultButton) {
      defaultButton.classList.add('img-filters__button--active');
    }
    renderPhotosFilter(createDefaultFilters(photos));
  }));
  randomButton.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === randomButton) {
      randomButton.classList.add('img-filters__button--active');
    }
    renderPhotosFilter(createRandomFilters(photos));
  }));
  discussedButton.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === discussedButton) {
      discussedButton.classList.add('img-filters__button--active');
    }
    renderPhotosFilter(createDiscussedFilters(photos));
  }));
}

export {showPhotosFilter};
