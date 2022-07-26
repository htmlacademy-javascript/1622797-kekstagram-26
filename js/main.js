import {getData} from './api.js';
import {createThumbnails} from './thumbnails.js';
import {submitForm} from './upload-form.js';
import {createSlider} from './effects.js';
import {showPhotosFilter} from './filters.js';


getData((photos) => {
  createThumbnails(photos);
  showPhotosFilter(photos);
});

createSlider();
submitForm();
