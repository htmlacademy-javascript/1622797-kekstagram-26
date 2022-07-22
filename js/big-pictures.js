import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicturesContainer = document.querySelector('.big-picture');
const bigPicturesCloseButton = document.querySelector('#picture-cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsBlock = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social_comment');
const maxCommentValue = 5;
const commentsFragment = document.createDocumentFragment();


// Функция закрытия полноэкранного изображения по нажатия на клавишу Escape
function onBigPicturesEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictures();
  }
}


// Функция закрывает полноэкранное изображение
function closeBigPictures () {
  bigPicturesContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPicturesEscKeydown);
}


// Функция открывает полноэкранное изображение
function openBigPictures () {
  body.classList.add('modal-open');
  bigPicturesContainer.classList.remove('hidden');
  document.addEventListener('keydown', onBigPicturesEscKeydown);
}



// Функция создает полноэкранное изображение и заполняет его
function createBigPictures(url, likes, comments, description) {
  openBigPictures();

  bigPicturesContainer.querySelector('.big-picture__img img').src = url;
  bigPicturesContainer.querySelector('.likes-count').textContent = likes;
  bigPicturesContainer.querySelector('.social__caption').textContent = description;

  let commentsValue = 0;

  function showComments (comments) {
    comments.slice(0, commentsValue += maxCommentsValue).forEach({avatar, name, message} => {
      const socialCommentTemplate = commentElement.cloneNode(true);
      const socialCommentImage = socialCommentTemplate.querySelector('.social__picture');
      const socialCommentText = socialCommentTemplate.querySelector('.social__text');

      socialCommentImage.src = avatar;
      socialCommentImage.alt = name;
      socialCommentText.textContent = message;

      commentsFragment.append(socialCommentTemplate);
    });

    commentsBlock.innerHTML = '';
    commentsBlock.append(commentsFragment);

    if (comment.length <= commentsValue) {
      commentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
      commentsLoader.classList.add('hidden');
    } else {
      commentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
      commentsLoader.classList.remove('hidden');
    }
  };

  showComments();

  bigPicturesCloseButton.addEventListener('click', closeBigPictures);
  commentsLoader.addEventListener('click', () => showComments());
}

export {createBigPictures, body};
