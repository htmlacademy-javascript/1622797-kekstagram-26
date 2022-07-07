// Функция отрисовывает миниатюру изображения и заполняет ее данными
function createThumbnail ({url, likes, comments}) {
  const photoTemplate = document.querySelector('#picture').content;
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  return photoElement;
};

// Функция создает и отрисовывает миниатюры на странице
function createThumbnails (photosData) {
  const photoListFragment = document.createDocumentFragment();

  photosData.forEach(({url, likes, comments}) => {
  const photo = createThumbnail({url, likes, comments});
  photoListFragment.appendChild(photo);
  });

  return photoListFragment;
};

export {createThumbnails};
