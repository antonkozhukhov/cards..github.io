const token = 'b2bd7464-a835-4f04-b8ac-13db5545ebd0';
 export class Api {
    constructor(options) {
      this.baseUrl = options['baseUrl'];
      this.headers = options['headers'];
      
    }
    
postPlace(name,link){
    return fetch(`${this.baseUrl}/cards`, {
    method: 'POST',
    headers: {
        authorization: `${token}`, 
       
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name.value,
        link: link.value
       
      })
    })
    
    .then(res => {
      if (res.ok) {
       return res.json();
      }      
      return Promise.reject(`Ошибка1: ${res.status}`);
    })
        .catch((err) => {
      console.log(err); 
    });      
}


patchProfile(){
    fetch(`${this.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: profileAuthorName.value,
        about: profileAuthorJob.value
    }) 
  })

   .then(res => {          
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); 
    })

}
patchAvatar(linkAvatar){
  return fetch(`${this.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: {
    authorization: `${token}`,
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      avatar: linkAvatar
      
  }) 
})

 .then(res => {          
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  })

}
getProphile() {
  return  fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
    headers: {
      authorization: `${token}`
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, переходим в catch
      return Promise.reject(`Ошибка: ${res.status}`);
    })   
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });  
    }  


deleteCard(_id){
        fetch(`${this.baseUrl}/cards/${_id}`, {
          method: 'DELETE',
      headers: {
        authorization: `${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
      })
          
      .catch((err) => {
        console.log(err); 
      });
}
putLike(_id){
          fetch(`${this.baseUrl}/cards/like/${_id}`, {
          method: 'PUT',
      headers: {
        authorization: `${token}`
      }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
      })
          
      .catch((err) => {
        console.log(err); 
      });
 }
deleteLike(_id){
          fetch(`${this.baseUrl}/cards/like/${_id}`, {
          method: 'DELETE',
        headers: {
        authorization: `${token}`
        }
        })
        .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
          
        .catch((err) => {
        console.log(err); 
        });
}
getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
        headers: {
          authorization: `${token}`
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
         return Promise.reject(`Ошибка: ${res.status}`);
        })
       
        .catch((err) => {
          console.log(err); 
        });  
  }  
}