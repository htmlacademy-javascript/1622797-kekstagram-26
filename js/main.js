import {createThumbnails} from './thumbnails.js';
import {getPhotos} from './data.js';
import {createBigPictures} from './big-pictures.js';
import './util.js';

const photosData = getPhotos();
const photosContainer = document.querySelector('.pictures');
const photoFragment = createThumbnails(photosData);
photosContainer.appendChild(photoFragment);

const thumbnails = photosContainer.querySelectorAll('.picture');
createBigPictures(thumbnails, photosData);
