const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('[name="info"]');
const nameInput = popupProfile.querySelector('[name="name"]');
const jobInput = popupProfile.querySelector('[name="job"]');

editButton.addEventListener('click', (evt) => {
  popupProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', (evt) => {
  closePopup(popupProfile);
})

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

popupProfile.addEventListener('submit', handleFormSubmit);
