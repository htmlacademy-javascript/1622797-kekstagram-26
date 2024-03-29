import {showAlert} from './util.js';


// Функция получает данные с удаленного сервера
function getData (onSuccess) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) =>
      response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Не удалось загрузить изображения с сервера');
    });
}


// Функция отправляет данные на удаленный сервер
function sendData (onSuccess, onFail, body) {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
}

export {getData, sendData};
