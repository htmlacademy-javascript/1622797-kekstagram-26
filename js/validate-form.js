import {checkStringLength, isNotDuplicates} from './util.js';
import {textHashtags, textDescription} from './upload-form.js';

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COUNT_HASHTAG = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_VALID_REG = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const form = document.querySelector('#upload-select-image');
const pristine = new Pristine(form);


// Функция для валидации поля с комментарием
function isValidComment(comment) {
  if (!checkStringLength(comment, MAX_DESCRIPTION_LENGTH)) {
    textDescription.setCustomValidity(`Длина комментария не может составлять больше ${MAX_DESCRIPTION_LENGTH} символов;`);
    textDescription.reportValidity();
    return false;
  }
  return true;
}


// Функция для валидации хэштега
function isValidHashtag(hashtag) {
  if (!checkStringLength(hashtag, MAX_HASHTAG_LENGTH, MIN_HASHTAG_LENGTH)) {
    textHashtags.setCustomValidity(`Максимальная длина хэш-тега не должна превышать ${MAX_HASHTAG_LENGTH} символов (включая решетку)`);
    return false;
  }
  if (!HASHTAG_VALID_REG.test(hashtag)) {
    textHashtags.setCustomValidity('Хэш-тег должен начинается с символа # (решётка). Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
    return false;
  }
  return true;
}


// Функция для валидации поля с хэштегами
function isValidHashtags(hashtags) {
  if (textHashtags.value.length === 0) {
    return true;
  }
  if (!hashtags.every(isValidHashtag)) {
    textHashtags.reportValidity();
    return false;
  }
  if (hashtags.length > MAX_COUNT_HASHTAG) {
    textHashtags.setCustomValidity(`Хэш-тегов не должно быть больше чем ${MAX_COUNT_HASHTAG}`);
    textHashtags.reportValidity();
    return false;
  }
  if (!isNotDuplicates(hashtags)) {
    textHashtags.setCustomValidity('Хэш-теги не должны повторяться');
    textHashtags.reportValidity();
    return false;
  }
  return true;
}


form.addEventListener('submit', (evt) => {
  isValidComment();
  isValidHashtags();
  const isValid = pristine.validate();
  if (!isValid || !isValidComment() || !isValidHashtags()) {
    evt.preventDefault();
  }
});

export {isValidComment, isValidHashtags};
