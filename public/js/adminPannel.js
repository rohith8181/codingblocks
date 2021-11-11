// for togggle function  of admin pannel navbar 
const toggleButton = document.getElementById("toggleButton");
const navbar = document.getElementById("navbar");
toggleButton.addEventListener('click',()=>{
    if(navbar.style.display == 'flex'){
        navbar.style.display = 'none';
    }else{
        navbar.style.display = 'flex';
    }
})

// setting color green of active page 
let url,selected;
const items = document.querySelectorAll("#navbar a");
items.forEach(element => {
    url = window.location.href;
    selected =element.id;
    if(url.includes(selected)){
        element.style.color = 'green';
    }else{
        element.style.color = 'white'
    }
});










