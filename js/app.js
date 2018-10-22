window.onload = () => {
    let increment = 0;
    const galleryContainer = document.querySelector('#gallery'); 
    const body = document.querySelector('body');
    const searchFieldContainer = document.querySelector('.search-container');
    const employeeData = [];
    
    //getting the response from the url and parsing it to json
    const fetchData = url =>{
        return fetch(url).then(response => response.json());
    } 
    const errors = () => {
        const errors = document.createElement('span');
        errors.setAttribute('class', 'error');
        errors.innerHTML = `Oops!... Something went wrong`;
        galleryContainer.append(errors);
    }
    
    //gettin employee data and passing it to the function displayEmplyeeData
    const getEmployeeData = () => {
        errorStatus = 200;
        for(let i = 0; i < 12; i++){
           fetchData('https://randomuser.me/api/')
            .then(data => {
               displayEmplyeeData(data.results, i)
               setData(data.results);
            }).catch(error => {
                    errors();
                    errorStatus = error;               
                }); 
            if(errorStatus !== 200){ break; }
        }
    }   
    
    //setting the data fromt fetch to the array
    const setData = (data) => { employeeData.push(data); }
    
    //displaying the employee data to the DOM
    const displayEmplyeeData = (data, index)=> {
        //creating a container element div with a attibute class name card
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.classList.add(index);
        
        //TODO: MAKE THIS ALL INTO A STRING PUT CARD AND EMPPLEGALLERY CODE IN TO ONE
        //getting the data and setting it into a
        const emplyeeGallery = `
                    <div class="card-img-container">
                        <img class="card-img" src="${data[0].picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name names cap">${data[0].name.first} ${data[0].name.last}</h3>
                        <p class="card-text">${data[0].email}</p>
                        <p class="card-text cap">${data[0].location.city}, ${data[0].location.state}</p>
                    </div>`;
        //TODO:ADD ALL OF THIS INTO GALLERY INNER HTML
        //adding the dta into the card Container
        card.innerHTML = emplyeeGallery;
        //appending the card in to gallery Dom Element
        galleryContainer.append(card);
        //TODO: MAKE THIS IN TO A SEPARET FUNCTION
        card.addEventListener('click', (evt) =>{
            increment = index;
            displayModalWindow(data);
        });
    }
    
    //create the modal window and display it with the user information
    //TODO: FIX THIS WHEN IT GET TO 4TH ELEMENT IN THE ARRAY IS SKIPT
    const displayModalWindow = (data) =>{
        const modalWindowContainer = document.querySelector('.modal-info-container');        
        const importantEmplyeeInformation = [   data[0].picture.large, data[0].name.first, data[0].email, data[0].location.city,'', data[0].cell, 
                                                [data[0].location.street, data[0].location.city, data[0].location.state, data[0].location.postcode],
                                                data[0].dob.date];
        
        for(let index in modalWindowContainer.children){
            if(modalWindowContainer.children[index].tagName === 'IMG'){
                modalWindowContainer.children[index].src = importantEmplyeeInformation[index];
            }
            if(modalWindowContainer.children[index].tagName === 'H3'){
                modalWindowContainer.children[index].innerHTML = importantEmplyeeInformation[index];
            }
            if(modalWindowContainer.children[index].tagName === 'P'){
                modalWindowContainer.children[index].innerHTML = importantEmplyeeInformation[index];
            }
        } 
        show();
    }
    
    //Adding functionality to the modalWindow Buttons (Close, Next, Prev Buttons)
    const modalWindowButtons = () => {
        const nextBtn = document.querySelector('.modal-next');
        const prevBtn = document.querySelector('.modal-prev'); 
        const closeBtn = document.querySelector('.modal-close-btn');
        const allEl = document.querySelectorAll('.card');
        
        console.log(allEl)
        
        closeBtn.addEventListener('click', (evt) => { hide(); }); 
    
        prevBtn.addEventListener('click', (evt) => {            
            increment !== 0 ? increment-- :increment = 11; 
            displayModalWindow(employeeData[increment]);
        }); 
        nextBtn.addEventListener('click', (evt) => { 
            increment !== 11 ? increment++ :increment = 0; 
            displayModalWindow(employeeData[increment]);
        }); 
    }
    //return the element modalWindow
    const modalWindow = () => { return document.querySelector('.modal-container'); } 
    //Hides The Modal Window
    const hide = () => { modalWindow().style.display = 'none'; }    
    //Show The Modal Window
    const show = () => { modalWindow().style.display = 'block'; }
        
    //creating a single modal window
    const createModalWindow = () => {
        const modal = document.createElement('div');
        modal.setAttribute('class', 'modal-container'); 
        
        const modalWindowHTML = `
                <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap city">city</p>
                        <hr>
                        <p class="modal-text Phone">(555) 555-5555</p>
                        <p class="modal-text adress">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text birthday">Birthday: 10/21/2015</p>
                    </div>
                </div>
 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;
        
            modal.innerHTML = modalWindowHTML;
            galleryContainer.append(modal);
    }
    
    const createSearchField = () => {       
        const searchFieldHTML = `
                    <form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                        </form>`;
        
        searchFieldContainer.innerHTML = searchFieldHTML;
    }
    
    const searchField = () => {
        const inputField = document.querySelector('#search-input');
        const names = document.querySelectorAll('.card-name');
        
        inputField.addEventListener('keyup',(evt) => {
            galleryContainer.innerHTML = '';
            createModalWindow();
            hide();
            modalWindowButtons();
            
            for(let i = 0 ; i < employeeData.length; i++){
              if(employeeData[i]['0'].name.first.indexOf(evt.target.value) !== -1){
//                   console.log(employeeData[i]['0'].name.first)
//                    console.log(employeeData[i]['0'])
                    displayEmplyeeData(employeeData[i], i);
                }else{
                    console.log('No Name Found');
                }
            }
        });
    }
    
    getEmployeeData()

    createModalWindow();
    hide();
    modalWindowButtons();                     

    createSearchField();
    searchField();
}