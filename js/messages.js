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
    document.removeEventListener('click', onOutsideClick);
    document.removeEventListener('keydown', onMessageEscKeydown, true);
    messageElementUpload.remove();
  }
  document.addEventListener('click', onOutsideClick);
  function onOutsideClick(evt) {
    if (!evt.target.closest(`div.${typeOfMessage}__inner`)) {
      closeMessage();
    }
  }
  document.addEventListener('keydown', onMessageEscKeydown, true);
  function onMessageEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      closeMessage();
    }
  }
}

export {showMessage};
