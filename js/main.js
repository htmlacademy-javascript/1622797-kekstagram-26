import {getData} from './api.js';
import {createThumbnails} from './thumbnails.js';
import {submitForm} from './upload-form.js';
import {createSlider} from './effects.js';


getData((photos) => {
  createThumbnails(photos);
});

createSlider();
submitForm();
