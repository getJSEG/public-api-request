window.onload = () => {
    let increment = 0;
    const galleryContainer = document.querySelector('#gallery'); 
    const body = document.querySelector('body');
    const searchFieldContainer = document.querySelector('.search-container');
    const employeeData = [];
    let displayedEmployees = [];
    let userErros ='';
    let itemsFound;
    
    //getting the response from the url and parsing it to json
    const fetchData = url =>{
        return fetch(url).then(response => response.json());
    } 
    //creating an element and ading it to the dom and showing messsage when something dint go as expected
    const errors = () => {
        const errors = document.createElement('span');
        errors.setAttribute('class', 'error');
        errors.innerHTML = `Oops!... Something went wrong`;
        galleryContainer.append(errors);
    }
    
    //gettin employee data and passing it to the function displayEmplyeeData
    const getEmployeeData = () => {
          return  fetchData('https://randomuser.me/api/?results=12')
            .then(data => {
                   for(let info in data.results){
                       displayEmplyeeData(data.results[info], info);
                       setData(data.results[info]);
                       displayedEmployees.push(info);
                   }
            }).catch(error => {
                    errors();
                    errorStatus = error;               
            });        
    }   
    
    //setting the data fromt fetch to the array
    const setData = (data) => { employeeData.push(data); }
    
    //displaying the employee data to the DOM
    const displayEmplyeeData = (data, index)=> {
        //creating a container element div with a attibute class name card
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.classList.add(index);
        
        //making  the content in the card container 
        const emplyeeGallery = `
                    <div class="card-img-container">
                        <img class="card-img" src="${data.picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name names cap">${data.name.first} ${data.name.last}</h3>
                        <p class="card-text">${data.email}</p>
                        <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
                    </div>`;
        //adding the dta into the card Container
        card.innerHTML = emplyeeGallery;
        //appending the card in to gallery Dom Element
        galleryContainer.append(card);
        //When the user clicks an Employee card it sets increment to the index of the card that was cliked
        //and call the displayModalWindow function to display the modal window and passes the data
        card.addEventListener('click', (evt) =>{
            increment = index;
            displayModalWindow(data);
        });
    }
    
    //create the modal window and display it with the user information
    const displayModalWindow = (data) =>{
        const modalWindowContainer = document.querySelector('.modal-info-container'); 
        //making an array of the user data to store ONLY the users information that was cliked
        const emplyeeInformation = [   data.picture.large, data.name.first, data.email, data.location.city,'', data.cell, 
                                                [data.location.street, data.location.city, data.location.state, data.location.postcode],
                                                data.dob.date];
        //looping through the modalWindowContainer children element 
        //and adding the content in the emplyeeInformation to the children of modalWindowContainer
        for(let index in modalWindowContainer.children){
            if(modalWindowContainer.children[index].tagName === 'IMG'){
                modalWindowContainer.children[index].src = emplyeeInformation[index];
            }
            if(modalWindowContainer.children[index].tagName === 'H3'){
                modalWindowContainer.children[index].innerHTML = emplyeeInformation[index];
            }
            if(modalWindowContainer.children[index].tagName === 'P'){
                modalWindowContainer.children[index].innerHTML = emplyeeInformation[index];
            }
        } 
        show();
    }
        
    //Adding functionality to the modalWindow Buttons (Close, Next, Prev Buttons)
    const modalWindowButtons = () => {
        const nextBtn = document.querySelector('.modal-next');
        const prevBtn = document.querySelector('.modal-prev'); 
        const closeBtn = document.querySelector('.modal-close-btn');
        //this event hides the modal window the the user clikes the X on the top right window of the modal window        
        closeBtn.addEventListener('click', (evt) => { hide(); }); 
            
        prevBtn.addEventListener('click', (evt) => {
            //if increment is NOT less or equal to 0 or increment is NOT greater than the length of the array then we can subtract the increment
            //the second (else if statement)fixes a bug of when the user clicked the last card item in the dom and cliked the prev button it would not show the prev. user until it was cliked again
            //else sets the increment to the length of the array('displayedEmployees.length-1' is the position of the last employee)
            if(!(increment <= 0 ) && !(increment > displayedEmployees.length-1)){
               increment--;
            }else if(displayedEmployees.indexOf(increment) === displayedEmployees.length-1 && displayedEmployees.length !== 1){ 
                increment = displayedEmployees.length-1;
                increment--;
            }else{
               increment = displayedEmployees.length-1;
            }            
            displayModalWindow(employeeData[displayedEmployees[increment]]);
        }); 
        
        nextBtn.addEventListener('click', (evt) => {
            //if increment is NOT greater or equal to the length of the array
            //the second (else if statement)fixes a bug of when the user clicked the last card item in the dom and cliked the next button it would not show the next. user until it was cliked again
            //else sets the increment to 0(0 is the position of the first employee)
            if(!(increment >= displayedEmployees.length-1) ){
               increment++
            }else if(displayedEmployees.indexOf(increment) === 0 && displayedEmployees.length !== 1){
                  increment = 0; 
                increment++;
            }else{
                increment = 0;
            }
            displayModalWindow(employeeData[displayedEmployees[increment]]);
        }); 
    }
    //return the element modalWindow
    const modalWindow = () => { return document.querySelector('.modal-container'); } 
    //Hides The Modal Window
    const hide = () => { modalWindow().style.display = 'none'; }    
    //Show The Modal Window
    const show = () => { modalWindow().style.display = 'block'; }
        
    //creating an container for the modal window and adding its content with a template literal
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
    //Creating template literal for search field and adding it to searchfieldContainer inner HTML
    const createSearchField = () => {       
        const searchFieldHTML = `
                    <form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`;        
        searchFieldContainer.innerHTML = searchFieldHTML;
    }
    
    const searchField = () => {
        const inputField = document.querySelector('#search-input');
        const searchButton = document.querySelector('#search-submit');
        const names = document.querySelectorAll('.card-name');
        let SearchValue;
        //when users types a character the it call the function to find one or more users in the array
        inputField.addEventListener('keyup',(event) => {
            itemsFound = 0;
            SearchValue = event;
            matchString(event);
        });
        //when the button is clicked then it calls the function to find the user typed in the serch field
        searchButton.addEventListener('click', (event) =>{
            event.preventDefault();
            matchString(SearchValue);
        });
    }
    
    const matchString = (event) =>{
        displayedEmployees = [];
        galleryContainer.innerHTML = '';
        let filteredSearchValue = event.target.value.toLowerCase();
        createModalWindow();
        hide();
        modalWindowButtons();
        //Lopping the EmployeeData Array And trying to find the value from the searchfield        
        for(let i = 0 ; i < employeeData.length; i++){
            //chacks if the search value matches any of the names in the array
            //if it does the display it in the DOM
              if(!(employeeData[i].name.first.indexOf(filteredSearchValue))){
                    displayEmplyeeData(employeeData[i], i);
                    displayedEmployees.push(i);
                    itemsFound++;
                }
        }  
        //If there isnt any value that matched the search value then display the error
        if(itemsFound === 0){
            userErros = `<div class="error">"${event.target.value}" Name was Not Found </div>`
            galleryContainer.innerHTML = userErros;      
        }
    }
 
    getEmployeeData().then(()=>{
        createModalWindow();
        hide();
        modalWindowButtons();
        searchField();
    });  
    
    createSearchField();
}