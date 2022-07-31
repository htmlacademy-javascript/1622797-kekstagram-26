import {checkStringLength, haveSameElements} from './util.js';


const MAX_HASHTAG_LENGTH = 20;
const MAX_COUNT_HASHTAG = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const imgForm = document.querySelector('.img-upload__form');
const validator = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
  errorTextTag: 'div'
}, true);

const HashtagRule = {
  FIRST_SYMBOL_IS_HASH: 'хэш-тег начинается с символа # (решётка)',
  NO_SPECIAL_SYMBOLS: 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  NOT_ONLY_HASHTAG: 'хеш-тег не может состоять только из одной решётки',
  MAX_LENGTH: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
  MAX_COUNT: 'нельзя указать больше пяти хэш-тегов',
  NO_SAME_HASHTAGS: 'один и тот же хэш-тег не может быть использован дважды',
  NO_ERROR: 'хэштег'
};

const DESCRIPTION_ERROR = 'Длина комментария не может составлять больше 140 символов';
const regularExpressions =  /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;


// Функция для валидации поля с комментарием
function validateDescription(value) {
  return checkStringLength(value, MAX_DESCRIPTION_LENGTH);
}


validator.addValidator(descriptionInput, validateDescription, DESCRIPTION_ERROR);


let errorHashtags = HashtagRule.NO_ERROR;


// Функция валидирует введеный хэштег
function validateHashtag(hashtag) {
  if (!regularExpressions.test(hashtag)) {
    if (hashtag[0] !== '#') {
      errorHashtags = HashtagRule.FIRST_SYMBOL_IS_HASH;
      return false;
    }
    if (hashtag === '#') {
      errorHashtags = HashtagRule.NOT_ONLY_HASHTAG;
      return false;
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      errorHashtags = HashtagRule.MAX_LENGTH;
      return false;
    }
    errorHashtags = HashtagRule.NO_SPECIAL_SYMBOLS;
    return false;
  }
  return true;
}


// Функция валидирует поле с хэштегами
function validateHashtags(value) {
  value = value.trim();
  if (value) {
    const hashtags = value.toLowerCase().split(' ');
    if (hashtags.length > MAX_COUNT_HASHTAG) {
      errorHashtags = HashtagRule.MAX_COUNT;
      return false;
    }
    if (haveSameElements(hashtags)) {
      errorHashtags = HashtagRule.NO_SAME_HASHTAGS;
      return false;
    }
    for (let i = 0; i < hashtags.length; i++) {
      if (!validateHashtag(hashtags[i])) {
        return false;
      }
    }
  }
  return true;
}


function getHashtagErrorMessage() {
  return errorHashtags;
}

validator.addValidator(hashtagsInput, validateHashtags, getHashtagErrorMessage);

export {validator, imgForm};
