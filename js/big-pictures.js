import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicturesContainer = document.querySelector('.big-picture');
const bigPicturesCloseButton = bigPicturesContainer.querySelector('.big-picture__cancel');
const commentCount = bigPicturesContainer.querySelector('.social__comment-count');
const commentsLoader = bigPicturesContainer.querySelector('.comments-loader');
const commentsBlock = bigPicturesContainer.querySelector('.social__comments');
const MAX_COMMENTS_SHOW = 5;
let count = 0;
let comments = [];


// Функция закрытия полноэкранного изображения по нажатия на клавишу Escape
function onBigPicturesEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictures();
  }
}


// Функция закрытия полноэкранного изображения по нажатию на крестик
function closeBigPicturesClick () {
  closeBigPictures();
}


// Функция закрывает полноэкранное изображение
function closeBigPictures () {
  bigPicturesContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPicturesEscKeydown);
  document.removeEventListener('click', closeBigPicturesClick);
  commentsLoader.removeEventListener('click', commentsLoaderOnClick);
  count = 0;
  comments = [];
}


// Функция создает полноэкранное изображение и заполняет его
function createBigPictures(photos) {
  body.classList.add('modal-open');
  bigPicturesContainer.classList.remove('hidden');
  bigPicturesContainer.querySelector('.big-picture__img img').src = photos.url;
  bigPicturesContainer.querySelector('.likes-count').textContent = photos.likes;
  bigPicturesContainer.querySelector('.social__caption').textContent = photos.description;
  bigPicturesContainer.querySelector('.comments-count').textContent = String(photos.comments.length);
  comments = photos.comments;
  renderCommentsCounter();
  commentsLoader.addEventListener('click', commentsLoaderOnClick);
  bigPicturesCloseButton.addEventListener('click', closeBigPictures);
  document.addEventListener('keydown', onBigPicturesEscKeydown);
}


// Функция создает блок с комментарием
function createComment (comment) {
  const newCommentItem  = document.createElement('li');
  newCommentItem.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = 35;
  commentImage.height = 35;
  newCommentItem.appendChild(commentImage);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  newCommentItem.appendChild(commentText);
  return newCommentItem;
}


// Функция загружает комментарии, если их больше 5
function commentsLoaderOnClick () {
  count += MAX_COMMENTS_SHOW;
  renderCommentsCounter();
}


// Функция показывает комментарии под фотографией
function renderCommentsCounter () {
  commentsBlock.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  const commentsToShow = comments.slice(0, count + MAX_COMMENTS_SHOW);
  commentsToShow.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });
  commentsBlock.appendChild(commentsFragment);
  if (comments.length === commentsToShow.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  commentCount.textContent = `${commentsToShow.length} из ${comments.length} комментариев`;
}

export {createBigPictures, body, closeBigPictures};
