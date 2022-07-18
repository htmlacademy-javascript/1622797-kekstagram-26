import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicturesContainer = document.querySelector('.big-picture');
const bigPicturesCloseButton = document.querySelector('#picture-cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsBlock = document.querySelector('.social__comments');


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


// Обработчик события на кнопку закрытия изображения
bigPicturesCloseButton.addEventListener('click', () => {
  closeBigPictures();
});


// Функция создает полноэкранное изображение и заполняет его
function createBigPictures(thumbnails, photosData) {
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      body.classList.add('modal-open');
      bigPicturesContainer.classList.remove('hidden');

      bigPicturesContainer.querySelector('.big-picture__img img').src = photosData[i].url;
      bigPicturesContainer.querySelector('.likes-count').textContent = photosData[i].likes;
      bigPicturesContainer.querySelector('.social__caption').textContent = photosData[i].description;
      bigPicturesContainer.querySelector('.comments-count').textContent = String(photosData[i].comments.length);

      document.addEventListener('keydown', onBigPicturesEscKeydown);
      commentsBlock.innerHTML = '';
      commentsLoader.classList.add('hidden');
      commentCount.classList.add('hidden');
      createComments(photosData, i);
    });
  }
}


// Функция создает блок с комментарием
function createComments(photosData, i) {
  const commentList = document.createDocumentFragment();
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');
  photosData[i].comments.forEach((comment) => {
    li.classList.add('social__comment');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    li.appendChild(img);
    p.classList.add('social__text');
    p.innerText = comment.messages;
    li.appendChild(p);
    commentList.appendChild(li);
    commentsBlock.appendChild(commentList);
  });
  return commentList;
}

export {createBigPictures};
