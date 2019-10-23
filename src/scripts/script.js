const cardContainer = document.querySelector('.places-list');
const saveProfileButton = document.querySelector('.popup__button_save_profile');
const popupButton = document.querySelector('.user-info__button');
const popupOpenProfileButton = document.querySelector('.user-info_profile');
const savePlaceButton = document.querySelector('.popup__button');
const placeForm = document.forms.new;
const placeName = placeForm.elements.placeName;
const placeLink = placeForm.elements.link;
const authorName = document.querySelector('.user-info__name');
const authorJob = document.querySelector('.user-info__job');
const profileForm = document.forms.profile;
const profileAuthorName = profileForm.elements.name;
const profileAuthorJob = profileForm.elements.job;
const popup = document.querySelector('.popup');
const popupAvatar = document.querySelector('.popup_avatar');
const popupProfile = document.querySelector('.popup_profile');
const token = 'b2bd7464-a835-4f04-b8ac-13db5545ebd0';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'
const myID = 'ba779b70717b07ad9c49ec5f';
let cardList;
import {Api} from './fetchs.js';
import {CardList} from './cardlist.js';
import {Popup, ValidateProfile, ValidateNewCard} from './popupValidation.js';

export const api = new Api({
  baseUrl: `${serverUrl}`,
  headers: {
    authorization: `${token}`,    
    'Content-Type': 'application/json'
  }
});
const popupPlace = new Popup(popup);
const popupProf = new Popup(popupProfile);
const popupAva = new Popup (popupAvatar);
const profileValidate = new ValidateProfile(saveProfileButton, popupProfile);
const placeValidate = new ValidateNewCard(savePlaceButton, popup);




api.getCards().then(cards =>{cardList = new CardList(cardContainer, cards)}); 
api.getProphile().then(res => {       
      authorName.textContent = res.name;
      authorJob.textContent = res.about;
      document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`; 
  })

function changeProfile(event){
    event.preventDefault();
    const form = document.forms.profile;
    const name = form.elements.name;
    const job = form.elements.job;
    authorName.textContent = name.value;
    authorJob.textContent = job.value;
    popupProf.close(); 
    console.log(profileAuthorName.value);
    api.patchProfile();    
}

document.querySelector('.image_close_button').addEventListener('click', function(){
  document.querySelector('.image').classList.remove('image_open');
});
popupButton.addEventListener('click', function() {
  popupPlace.open();
});

document.querySelector('.popup__close').addEventListener('click', function() {
  popupPlace.close(); 
  placeForm.reset();
  placeValidate.buttonIsNotValid();
});
 
popupOpenProfileButton.addEventListener('click', function() {
  popupProf.open();
  const form = document.forms.profile;
  const name = form.elements.name;
  const job = form.elements.job;
  name.value = authorName.textContent;
  job.value = authorJob.textContent;
  profileValidate.buttonValidate();  
});
document.querySelector('.popup__close-profile').addEventListener('click', function() {
  popupProf.close();
  profileForm.reset();      
});
document.querySelector('.user-info__photo').addEventListener('click', function() {
  popupAva.open(); 
});
document.querySelector('.popup__close-avatar').addEventListener('click', function() {
  popupAva.close();
    
});   
document.querySelector('.popup__button_save_avatar').addEventListener('click', function() {
  event.preventDefault()
  const form = document.forms.avatar;
  const name = form.elements.avatarLink;
  api.patchAvatar(name.value).then(res=> {document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;});
  popupAva.close();
    
});   
placeName.addEventListener('input',function(){
    placeValidate.handleValidate(event);
  });
placeLink.addEventListener('input', function(){
    placeValidate.handleValidate(event);
  });
profileAuthorName.addEventListener('input',function(){
    profileValidate.handleValidate(event);
  });
profileAuthorJob.addEventListener('input', function(){
    profileValidate.handleValidate(event);
  });

placeForm.addEventListener('submit', function(){  
  event.preventDefault()
  
  api.postPlace(placeName, placeLink).then((result) => {
              // Исправил
     cardList.addCard(result.name, result.link, 0,result._id, myID, true);
  });
  popupPlace.close();  
  placeValidate.buttonIsNotValid(); 
  
});
profileForm.addEventListener('submit', changeProfile);

