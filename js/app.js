
window.onload = () => {
   const galleryContainer = document.querySelector('#gallery'); 
   const body = document.getElementsByTagName('body');
    
    //getting the response from the url and parsing it to json
    const fetchData = url =>{
        return fetch(url)
                .then(response => response.json());
    }
    //displaying the employee data to the DOM
    const displayEmplyeeData = (data, index)=> {
        //creating a container element div with a attibute class name card
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.classList.add(index);
        
        //getting the data and setting it into a
        const emplyeeGallery = `
                    <div class="card-img-container ${index}">
                        <img class="card-img ${index}" src="${data[0].picture.medium}" alt="profile ${index} picture">
                    </div>
                    <div class="card-info-container ${index}">
                        <h3 id="name" class="card-name ${index} cap">${data[0].name.first} ${data[0].name.last}</h3>
                        <p class="card-text ${index}">${data[0].email}</p>
                        <p class="card-text ${index} cap">${data[0].location.city}, ${data[0].location.state}</p>
                    </div>`;
        //adding the dta into the card Container
        card.innerHTML = emplyeeGallery;
        //appending the card in to gallery Dom Element
        galleryContainer.append(card);
        //
        displayModalWindow(card, data);
    }
    
    //create the modal window and display it with the user information
    const displayModalWindow = (card, data) =>{
        createModalWindow(data);
        let windowIndex = 0;
        // getting all classes that has a class of modal-container
        const modalWindow = document.querySelectorAll('.modal-container');
        const modalWindowCloseBtn = document.querySelectorAll('.modal-close-btn');
        //lopping through modalwindow and setting display style to none
        for(let window of modalWindow){  window.style.display = 'none'; }
        
        //when the element is cliked it returns a list of classes with the index then i parse it and set it to the var windowIndex and set the display to that element on thelist to block
        card.addEventListener('click', (evt) => { 
            windowIndex = parseInt(evt.target.classList[1]);
            modalWindow[windowIndex].style.display = 'block';
        });
        //looping thourght all close btn and adding an event to each btn  
        for(let btn of modalWindowCloseBtn){
            btn.addEventListener('click', (evt) => {
                //getting the index from the card click event above and passing it to modalWindow List
                modalWindow[windowIndex].style.display = 'none';
            }); 
        }        
        
    }                            
    
    ///creating the modal window and appending it to the gallery container
    const createModalWindow = (data) => {
        const modal = document.createElement('div');
        modal.setAttribute('class', 'modal-container'); 
                  
        const modalWindowHTML = `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[0].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[0].name.first}</h3>
                        <p class="modal-text">${data[0].email}</p>
                        <p class="modal-text cap">${data[0].location.city}</p>
                        <hr>
                        <p class="modal-text">${data[0].cell}</p>
                        <p class="modal-text">${data[0].location.street}, ${data[0].location.city}, ${data[0].location.state} ${data[0].location.postcode}</p>
                        <p class="modal-text">Birthday: ${data[0].dob.date}</p>
                    </div>
                </div>`;
        
            modal.innerHTML = modalWindowHTML;
            galleryContainer.append(modal);
    }    
        
    //gettin employee data and passing it to the function displayEmplyeeData
    const getEmployeeData = () => {
        for(let i = 0; i < 12; i++){
           fetchData('https://randomuser.me/api/')
            .then(data => {
               displayEmplyeeData(data.results, i)
           });        
        }
    }
    
    getEmployeeData();
}