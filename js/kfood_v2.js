// console.log('kfood_v2.js is connected');

// checkLogin();
let menuSearch=[];
let menuExists = false;

/* display data section  */
async function fetchFavourites(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayData(data);
}

// call function to fetch data
fetchFavourites('app/select.php');

function displayData(data) {
    //select the display div from the DOM where the data will be displayed
    const display = document.querySelector('#display');
    display.innerHTML = '';

    //create the elements to display the data
    let ul = document.createElement('ul');
    let a = document.createElement('a');

    data.forEach((menu)=>{
    menuSearch.push(menu.menuTitle);
    let li = document.createElement('li');
    li.innerHTML = `${menu.menuTitle} :: ${menu.menuInfo} and has ${menu.countedFavourites} favourite(s).`;
    li.appendChild(a);
    ul.appendChild(li);
    })
    display.appendChild(ul);
    //console.log(menuSearch);
}

// ** dynamically loaded content ** //
    const forms = document.querySelector('#forms');
    forms.addEventListener('keyup',(event)=>{
    //console.log(event.target.id);
    if(event.target.id == "menu"){
        typeSearch(event);
    }
    })

    forms.addEventListener('click',(event)=>{
    //console.log(event.target.id);
    if(event.target.id == "submit-btn"){
        getFormData(event);
    }
    })

// ** insert section ** //
// inserting into 2 tables, menu & favourites
// 2 tables are joined by menuID
function getFormData(event) {
    event.preventDefault();

//get the form data & call an async function
    const insertFormData = new FormData(document.querySelector('#input-form'));
    let url = 'app/insert_favourite.php';
    inserter(insertFormData, url);
}

async function inserter(data, url) {
    const response = await fetch(url, {
        method: "POST",
        body: data
    });
    const confirmation = await response.json();
    console.log(confirmation);
    //call function again to refresh the data
    fetchFavourites('app/select.php');
}

//search on keyup in menu title
function typeSearch(event){
    const menuInput = document.querySelector('#menu');
    let result = [];
    let input = menuInput.value;
    if(input.length){
        result = menuSearch.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        }); 
        //console.log(result); 
    }
    display(result);
}

function display(result){
    const resultsBox = document.querySelector('#results-box');
    const content = result.map((list) => {
    //not thrilled with using "onlclick"
    //return "<li onclick=selectInput(this)>" + list + "</li>";
    return `<li onclick=selectInput(this)> ${list}</li>`; 
    });

    if(!result.length){
    resultsBox.innerHTML = '';  
    }else{
    //resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
    resultsBox.innerHTML = `<ul> ${content.join('')}</ul>`;
    }
}

function selectInput(list){
    menuExists = true;
    console.log(menuExists);
    document.querySelector('#menu').value = list.innerHTML;
    document.querySelector('#results-box').innerHTML = '';
}
