import {createThumbnails} from './thumbnails.js';
import './data.js';
import './util.js';

const photosData = getPhotos();
const photosContainer = document.querySelector('.pictures');
const photoFragment = createThumbnails(photosData);
photosContainer.appendChild(photoFragment);
