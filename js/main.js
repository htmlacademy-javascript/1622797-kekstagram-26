// Функция, возвращающая случайное целое число из переданного диапазона
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

getRandomPositiveInteger(2, 5);


// Функция для проверки максимальной длины строки
function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 140);


const MESSAGES = [
'Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Петя',
  'Кирилл',
  'Кристина',
  'Зиновий',
  'Евпатий',
  'Николай',
  'Глеб',
  'Александр',
  'Станислав',
  'Мария',
];

const DESCRIPTIONS = [
  'Наш пляж в Абхазии',
  'Указатель рядом с морем',
  'Лазурное море на пляже',
  'Жена фотограф',
  'Вкусняшки, которые мы ели',
  'Коктейль фруктовый',
  'Суши-котик',
  'Вечерняя набережная',
  'Моя новая тачка',
  'Теплые тапочки',
  'Катаемся по реке',
  'Крабик на пляже',
  'Воздушное пространство',
  'Встречаем самолет',
  'На дискотеке',
  'Сказочный закат',
];


const PHOTOS_MAX_COUNT = 25;
const COMMENTS_MAX_COUNT = 6;
const MESSAGES_MAX_COUNT = 2;


// Функция для получения случайного элемента из массива
function getRandomArrayElement (elements) {
  getRandomPositiveInteger(0, elements.length - 1);
}


let photoId = 0;
let commentId = 0;


// Функция выбирает комментарий из массива
function createCommentMessage () {
  const messageCount = getRandomPositiveInteger(1, MESSAGES_MAX_COUNT);
  let message = '';

  for (let i = 0; i < messageCount; i++) {
    message = `${message} ${getRandomArrayElement(MESSAGES)}`;
  }
  return message;
}


// Функция создает комментарий под постом с именем автора и аватаркой
function createComment () {
  commentId++;

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    messages: createCommentMessage(),
    name: getRandomArrayElement(NAMES),
  };
}


// Функция создает пост со всеми данными: комментарий, подпись под фото, кол-во лайков
function createPhoto () {
  photoId++;
  const commentsCount = getRandomPositiveInteger(1, COMMENTS_MAX_COUNT);
  const comment = Array.from({length: commentsCount}, createComment);
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comments: comment,
  };
}


// Функция получает все фотки и выводит их на страницу
function getPhotos() {
  return Array.from({length: PHOTOS_MAX_COUNT}, createPhoto);
}

getPhotos();
