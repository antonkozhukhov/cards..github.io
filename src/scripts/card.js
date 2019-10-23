const myID = 'ba779b70717b07ad9c49ec5f';
import {api} from './script.js'

export class Card{
    constructor(cardName,cardImage, likes, cardID, idOwner, liked){
      this.liked =liked;
      this.cardElement = this.createCard(cardName, cardImage,likes, cardID, idOwner, liked);       
      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
      this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openImage);   
      
    }
    createCard(cardName, cardImage, likes, cardID, idOwner, liked){
       
      const card = document.createElement('div');  /*создание элементов карточки*/
      card.classList.add('place-card');
      card.setAttribute('id', `${cardID}`)
    
      const cardTitle = document.createElement('h3');
      cardTitle.classList.add('place-card__name');
      cardTitle.textContent = cardName;                   /*установка названия карточки*/
    
      const cardImg = document.createElement('div');
      cardImg.classList.add('place-card__image');
      cardImg.style.backgroundImage = `url(${cardImage})`;   /*установка background карточки*/
    
      const deleteIcon = document.createElement('button');
      deleteIcon.classList.add('place-card__delete-icon');
      if (idOwner != myID){
      deleteIcon.classList.add('notvisible');
      }
      const likePlace = document.createElement('div');  /*создание элементов карточки*/
      likePlace.classList.add('place-card__like-place');
      const likeIcon = document.createElement('button');
      
      likeIcon.classList.add('place-card__like-icon');
        if (liked){
          likeIcon.classList.add('place-card__like-icon_liked');
       }
      const likeNumber = document.createElement('p');
      likeNumber.classList.add('place-card__like-number');
      likeNumber.textContent = `${likes}`;   
     
      const placeCard = document.createElement('div');
      placeCard.classList.add('place-card__description');
    
      placeCard.appendChild(cardTitle);
      placeCard.appendChild(likePlace);
      likePlace.appendChild(likeIcon);
      likePlace.appendChild(likeNumber);
      cardImg.appendChild(deleteIcon);
      card.appendChild(cardImg);
      card.appendChild(placeCard);
    
      return card;
    }
    
    like(event){   
      console.log(event.target.classList.value)
      if (this.liked){
      api.putLike(event.target.parentElement.parentElement.parentElement.id);
      console.log(event.target.parentElement.parentElement.parentElement.id);
      let numbLike =  Number(event.target.parentElement.parentElement.parentElement.querySelector('.place-card__like-number').textContent);
      numbLike += 1 ; 
      event.target.parentElement.parentElement.parentElement.querySelector('.place-card__like-number').textContent = numbLike;
      event.target.classList.add('place-card__like-icon_liked');  
      this.liked =false;
      }
      else {
      api.deleteLike(event.target.parentElement.parentElement.parentElement.id);
      console.log(event.target.parentElement.parentElement.parentElement.id);
      let numbLike =  Number(event.target.parentElement.parentElement.parentElement.querySelector('.place-card__like-number').textContent);
      numbLike -= 1 ; 
      event.target.parentElement.parentElement.parentElement.querySelector('.place-card__like-number').textContent = numbLike;
      event.target.classList.remove('place-card__like-icon_liked');   
      this.liked = true;
      }
      }
    remove(event){ 
      event.stopPropagation();   
      if (window.confirm('Вы действительно хотите удалить эту карточку?')){    
      const card = event.target.parentElement.parentElement;
      card.parentElement.removeChild(card);
      api.deleteCard(event.target.parentElement.parentElement.id);
      }
      else return false;
  
    }
    openImage(event){
      document.querySelector('.image').classList.add('image_open');
      const src = event.target.style.backgroundImage.substr(4).substr(0,event.target.style.backgroundImage.length);
      document.querySelector('.image_src').src = src.substr(1, src.length-3);     
    }  
  }