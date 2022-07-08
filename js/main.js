import {createThumbnails} from './thumbnails.js';
import {getPhotos} from './data.js';
import {openBigPictures} from './big-pictures.js';
import './util.js';

const photosData = getPhotos();
const photosContainer = document.querySelector('.pictures');
const photoFragment = createThumbnails(photosData);
photosContainer.appendChild(photoFragment);
