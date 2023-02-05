const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = document.querySelector('[name="info"]');
const formAddCard = document.querySelector('.form_add-card');
const nameInput = popupProfile.querySelector('[name="name"]');
const jobInput = popupProfile.querySelector('[name="job"]');
const popupProfileSendButton = popupProfile.querySelector('[name="send"]');
const popupProfileAddButton = document.querySelector('.profile__add-button');
const popupSite = document.querySelector('.popup-add');
const popupAddCardSendButton = popupSite.querySelector('[name="send"]');
const formSite = document.querySelector('[name="photo"]');
const siteInput = popupSite.querySelector('[name="name"]');
const linkInput = popupSite.querySelector('[name="link"]');
const popupPhoto = document.querySelector('.popup-site');
const popupPhotoPic = popupPhoto.querySelector('.site__photo');
const popupCaption = popupPhoto.querySelector('.site__caption');
const formInputsError = document.querySelectorAll('.form__input-error');
const formInputs = document.querySelectorAll('.form__input');
const popups = document.querySelectorAll('.popup');
const closeButton = document.querySelectorAll('.popup__close');
const cardsContainer = document.querySelector('.cards__list');
const cardsTemplate = document
  .querySelector('.template')
  .content
  .querySelector('.cards__element');

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inputErrorClass: 'form__input_type_error',
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keyup', addListenerEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.addEventListener('keyup', addListenerEsc);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', handleFormSubmit);

function deleteCard(evt) {
  evt.target.closest('.cards__element').remove();
}

function createCard({ name, link }) {
  const card = cardsTemplate.cloneNode(true);
  const cardName = card.querySelector('.cards__name');
  cardName.textContent = name;
  const cardImage = card.querySelector('.cards__image');
  cardImage.src = link;
  cardImage.alt = name;

  const likeButton = card.querySelector('.cards__like-button');
  likeButton.addEventListener('click', function (evt) {
    likeButton.classList.toggle('cards__like-button_liked');
  });

  const deleteButton = card.querySelector('.cards__delete-button');
  deleteButton.addEventListener('click', function (evt) {
    card.remove();
  });

  cardImage.addEventListener('click', function (evt) {
    popupPhotoPic.src = link;
    popupPhotoPic.alt = name;
    popupCaption.textContent = name;
    openPopup(popupPhoto);
  });

  return card;
}

function addCard(evt) {
  evt.preventDefault();
  const newCardName = siteInput.value;
  const newCardLink = linkInput.value;
  const newCardAdd = createCard({
    name: newCardName,
    link: newCardLink
  })
  cardsContainer.prepend(newCardAdd);

  closePopup(popupSite);
  formSite.reset();
}

formSite.addEventListener('submit', addCard);

function addListenerEsc(evt) {
  const key = evt.key;
  if (key == "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  };
};

function clearErrorForm(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  for (const input of inputList) {
    hideInputError(form, input, config);
  }

  form.reset();
}

function closePopupOutside(event, popup) {
  if (event == popup) {
    closePopup(popup);
  };
}

popupProfileOpenButton.addEventListener('click', (evt) => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupProfileSendButton.setAttribute("disabled", true)
})

popupProfileAddButton.addEventListener('click', (evt) => {
  openPopup(popupSite);
  clearErrorForm(formAddCard, config);
  popupAddCardSendButton.setAttribute("disabled", true);
})

initialCards.forEach(item => {
  const cardHtml = createCard(item);
  cardsContainer.append(cardHtml);
});

closeButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', function (event) {
    closePopupOutside(event.target, popup);
  });
});
