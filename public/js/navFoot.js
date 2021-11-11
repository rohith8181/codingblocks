const categoryUl = document.getElementById("categoryUl");
const accordionExample = document.getElementById("accordionExample");


// toggle button of home 
const toggleButton = document.getElementById("toggleButton");
const toggleMenu = document.getElementById("toggleMenu");
toggleButton.addEventListener('click',()=>{
    toggleMenu.classList.toggle('d-none')
})



// for search bar 
const searchBar = document.getElementsByName("searchBar");
const searchBox = document.getElementById("searchBox");
const searchBoxForSmall = document.getElementById("searchBoxForSmall");
searchBox.style.display = 'none'
searchBoxForSmall.style.display = 'none'
let searchBoxHtml = ``,array;
searchBar.forEach(element => {
    element.addEventListener('input', async ()=>{
        searchBoxHtml = ``;
        heading = element.value;
        const response = await fetch('/api/searchBar',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                heading:heading
            })
        });
        let data = await response.json();
        array = data.data;
        array.forEach(element => {
            searchBoxHtml += `<a href="/content?article=${element['heading']}">${element.heading}</a>`
        });
        searchBox.innerHTML = searchBoxHtml;
        searchBoxForSmall.innerHTML = searchBoxHtml;
        if(heading.length <= 1){
            searchBox.style.display = 'none'
            searchBoxForSmall.style.display = 'none'
        }else{
            searchBox.style.display = 'block'
            searchBoxForSmall.style.display = 'block'
        }
    })
    
});





// array will be fetched from database  and not completed till now 
let detailsArray = [],topicArray = [];
const apiRequestTogetUserdata = async ()=>{
    try{
        const res = await fetch('/api/navFoot',{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            }
        });
        if(res.status === 200){
            let results = await res.json();
            // storing array of data in detailsArray
            detailsArray = results.data;

            // getting topiics from detailsarray 
            topicArray = gettingTopic(topicArray,detailsArray)
           
            // for navbar 
            let html = ``;
            topicArray.forEach(topic => {
                let headingHtml = ``;
                detailsArray.forEach(heading => {
                    if(heading['topic'] == topic){
                        headingHtml += `<li><a href="/content?article=${heading['heading']}">${heading['heading']}</a></li>`
                    }
                });
                html += `<li class="nav-item dropdown">
                                    <a class="category dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        ${topic}
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        ${headingHtml}
                                    </ul>
                                </li>`
            });
            categoryUl.innerHTML = html;


            // for sidebar 
            let accordionHtml = ``;
            topicArray.forEach((topic,index) => {
                let subAccordionHtml = ``;
                detailsArray.forEach(element => {
                    if(element['topic'] == topic){
                        subAccordionHtml += `<li><a href="/content?article=${element['heading']}">${element['heading']}</a></li>`
                    }
                });
                accordionHtml += `<div class="accordion-item" style="border-radius: 0px;background: transparent;">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#a${index+1}" aria-expanded="false" aria-controls="a${index+1}"" style="background: transparent;border-bottom: 1px solid white;border-radius: 0px;">
                                            ${topic}
                                        </button>
                                    </h2>
                                    <div id="a${index+1}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <ul class="list-unstyled">
                                            ${subAccordionHtml}
                                            </ul>
                                        </div>
                                    </div>
                                </div>`
            });
            accordionExample.innerHTML = accordionHtml;
            
           
        }else{
            throw new Error(res.error);
        }
    }catch(err){
        console.log(err);
    }
}

// running api request function whenever page reloads 
apiRequestTogetUserdata();




function gettingTopic(topicArray,detailsArray){
            let i,j,available
            topicArray.push(detailsArray[0]['topic']);
            for (i= 1; i < detailsArray.length; i++) {
                for(j=0;j<topicArray.length;j++){
                    if(topicArray[j] == detailsArray[i]['topic']){
                        available = 1;
                        break;
                    }else{
                        available = 0;
                    }
                }
                if(available == 0){
                    topicArray.push(detailsArray[i]['topic']);
                }
            }
    return topicArray;
}