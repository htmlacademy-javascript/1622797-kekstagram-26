import {getRandomArrayElement, debounce} from './util.js';
import {createThumbnails} from './thumbnails.js';

const RANDOM_PHOTOS_COUNT = 10;
const filters = document.querySelector('.img-filters');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');


// Функция высчитывает разницу между количеством комменатриев изображений
function compareComments (photoA, photoB) {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
}


// Функция показывает все фотографии с сервера
function createDefaultFilters (photos) {
  photos.slice();
}


// Функция показывает рандомные 10 фотографий
function createRandomFilters (photos) {
  const photosArray = photos.slice();
  return getRandomArrayElement(photosArray).slice(0, RANDOM_PHOTOS_COUNT);
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


function clearPhotosContainer () {

}


