export class Popup{
    constructor(popupElement){
      this.popupElement = popupElement;            
    }
    open(){
      this.popupElement.classList.add('popup_is-opened');
    }
    close(){
      this.popupElement.classList.remove('popup_is-opened');
      this.popupElement.querySelector('.error_valid').textContent = '';
      this.popupElement.querySelector('.a').textContent = '';  // убираем сообщение об ошибке у второго ввода
    }
  }
  
  export class Validate{
    constructor(button, popuptype){
      this.button = button;
      this.popuptype = popuptype;      
    }
    buttonIsValid(){
      this.button.removeAttribute('disabled');
      this.button.classList.add('popup__button_save_profile__valid');
    }
    buttonIsNotValid(){
      this.button.setAttribute('disabled', true);
      this.button.classList.remove('popup__button_save_profile__valid');
    }
  
   
    handleValidate(event){    
      this.buttonValidate();
        if (event.target.value.length === 0){
          this.popuptype.querySelector(`#error-${event.target.name}`).textContent = 'Это обязательное поле';
          return false
        }
        if (event.target.value.length < 2 || event.target.value.length > 30 && event.target.name != "link"){
          this.popuptype.querySelector(`#error-${event.target.name}`).textContent = 'Должно быть от 2 до 30 символов';
          return false}
  
        if (event.target.name === "link" && !event.target.value.startsWith('https://')){
          this.popuptype.querySelector(`#error-${event.target.name}`).textContent = 'Здесь должна быть ссылка';
          return false
        }
        else {
          this.popuptype.querySelector(`#error-${event.target.name}`).textContent = '';
           return true;
        }
    }    
  }    
  export class ValidateProfile extends Validate{
    buttonValidate(){  //описываем специфичное для конкретного попапа поведение
      const form = document.forms.profile;
      const name = form.elements.name;
      const job = form.elements.job;
      if (name.value.length > 1 && name.value.length < 30 && job.value.length > 1 && job.value.length < 30){
        this.buttonIsValid();
        return true;
      }
      else {
      this.buttonIsNotValid();
      return false;
      }
    }
  }
  export class ValidateNewCard extends Validate{  //класс ValidateNewCard расширяет функционал базового класса
    buttonValidate(){ //описываем специфичное для конкретного попапа поведение
      const form = document.forms.new;
      const name = form.elements.placeName;
      const link = form.elements.link;
      if (name.value.length > 1 && name.value.length < 30 && link.value.length > 1 && link.value.startsWith('https://')){
      this.buttonIsValid();
      return true;
      }
      else {
        
        this.buttonIsNotValid();
        return false;
      }
    }
  }