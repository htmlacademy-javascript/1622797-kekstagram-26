import {getData} from './api.js';
import {createThumbnails} from './thumbnails.js';
import {createSlider} from './effects.js';
import './upload-form.js';
import {initFilters} from './filters.js';


getData((photos) => {
  createThumbnails(photos);
  initFilters(photos);
});

createSlider();
