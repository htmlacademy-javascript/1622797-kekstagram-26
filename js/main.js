import {getData} from './api.js';
import {createThumbnails} from './thumbnails.js';
import './util.js';
import {submitForm} from './upload-form.js';
import './validate-form.js';
import {createSlider} from './filters.js';


getData((photos) => {
  createThumbnails(photos);
});

createSlider();
submitForm();
