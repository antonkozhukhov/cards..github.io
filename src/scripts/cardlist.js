import {Card} from './card.js';
export class CardList{
    constructor(container, initialCards){
      this.container = container;
      this.initialCards = initialCards;
      this.render(initialCards);
      // массивы принято называть во множественном числе
      // внутри методов лучше использовать поля класса
      // this.initialCards
      // render лучше выполнять внутри конструктора класса без передачи параметров
    }
    
    addCard(name,link,likes, cardID, idOwner, liked){          
        const {cardElement} = new Card(name, link,likes, cardID, idOwner, liked);
        this.container.appendChild(cardElement);      
    }
    render(initialCards){
            initialCards.forEach((card) => this.addCard(card.name, card.link, card.likes.length, card._id, card.owner._id, true))          
    }
  }
  