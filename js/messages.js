import {isEscapeKey} from './util.js';

// Функция показывает сообщения об ошибке или успешной отправке
function showMessage (typeOfMessage) {
  const messageTemplateUpload = document.querySelector(`#${typeOfMessage}`).content.querySelector(`.${typeOfMessage}`);
  const messageElementUpload = messageTemplateUpload.cloneNode(true);
  messageElementUpload.style.zIndex = 100;
  document.body.append(messageElementUpload);
  messageElementUpload.querySelector(`.${typeOfMessage}__button`).addEventListener('click', () => {
    closeMessage();
  });
  function closeMessage() {
    messageElementUpload.remove();
    document.removeEventListener('click', onOutsideClick);
    document.removeEventListener('keydown', onMessageEscKeydown);
  }
  document.addEventListener('click', onOutsideClick);
  function onOutsideClick(evt) {
    if (!evt.target.closest(`div.${typeOfMessage}__inner`)) {
      closeMessage();
    }
  }
  document.addEventListener('keydown', onMessageEscKeydown);
  function onMessageEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }
}

export {showMessage};
