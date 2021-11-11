// getting the tag in which content has to be filled 
const accordionExample = document.querySelector("#accordionExample");

// api request to get user details 
let topicDetailsArray = [];
const apiRequestTogetUserdata = async ()=>{
    try{
        const res = await fetch('/api/articleDetails',{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            }
        });
        if(res.status === 200){
            let results = await res.json();
            // storing array of data in articleDetailsArray 
            articleDetailsArray = results.data;
            let articleDetails = ``;
            // adding html of each array 
            articleDetailsArray.forEach((element,index) => {
                articleDetails += `  <div class="mb-4">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="heading${index+1}">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index+1}" aria-expanded="true" aria-controls="collapse${index+1}">
                                                    <div class="d-flex flex-column">
                                                        <h4>${element.heading}</h4>
                                                        <div class="ms-3">Published On : ${element.dateOfApproved}</div>
                                                        <div class="ms-3">- ${element.nameOfWritter}</div>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id="collapse${index+1}" class="accordion-collapse collapse" aria-labelledby="heading${index+1}" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <p>${element.content1}</p>
                                                    <img src="../images/${element.image}" alt="Array">
                                                    <p>${element.content2}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between mt-2">
                                            <div class="fs-6 ms-2" style="color:gray">-Approved by ${element.nameOfAdmin}</div>
                                            <div id="${element.emailHeadingDate}" class="btn btn-danger" onclick="deleteArticle(this.id)">Delete</div>
                                        </div>
                                    </div>  `;
            });
            accordionExample.innerHTML = articleDetails;

            // if array is empty then showing nothing 
            if(articleDetailsArray.length ==0){
                nothing.innerHTML = "<p>Nothing to show</p>"
            }
        }else{
            // if there some internl error occur then showing nothing 
            nothing.innerHTML = "<p>Nothing to show</p>"
            throw new Error(res.error);
        }
    }catch(err){
        console.log(err);
    }
}

// running api request function whenever page reloads 
apiRequestTogetUserdata();

const alertInternalError = document.getElementById("alertInternalError");
alertInternalError.style.display = 'none'
const deleteArticle = async (emailHeadingDate)=>{
    const response = await fetch('/api/deleteArticle',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
           emailHeadingDate:emailHeadingDate
        })
    });
    if(response.status == 200){
        alertInternalError.style.display = 'none'
        window.location.reload();
    }else{
        alertInternalError.style.display = 'block'
    }
}