
const accordionExample = document.querySelector("#accordionExample");

// api request to get user details 
let newArticlesRequestArray = [];
const apiRequestTogetUserdata = async ()=>{
    try{
        const res = await fetch('/api/newArticlesRequest',{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            }
        });
        if(res.status === 200){
            let results = await res.json();
            newArticlesRequestArray = results.data;
            let newArticlesRequest = ``;
            newArticlesRequestArray.forEach((element,index) => {
                newArticlesRequest += `  <div class="mb-4">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="heading${index+1}">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index+1}" aria-expanded="true" aria-controls="collapse${index+1}">
                                                    <div class="d-flex flex-column">
                                                        <h4>${element.heading}</h4>
                                                        <div class="ms-3">Requested On : ${element.date}</div>
                                                        <div class="ms-3">- ${element.name}</div>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id="collapse${index+1}" class="accordion-collapse collapse" aria-labelledby="heading${index+1}" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <p>${element.content1}</p>
                                                    <img src="../images/${element.image}">
                                                    <p>${element.content2}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row-reverse mt-2">
                                            <div id="${index}" class="btn btn-success ms-1" onclick="approve(this.id)">Approve</div>
                                            <div  id="${element.emailHeadingDate}" class="btn btn-danger" onclick="deleteArticle(this.id)">Delete</div>
                                        </div>
                                    </div>  `;
            });
            accordionExample.innerHTML = newArticlesRequest;
            if(newArticlesRequestArray.length ==0){
                nothing.innerHTML = "<p>Nothing to show</p>"
            }
        }else{
            nothing.innerHTML = "<p>Nothing to show</p>"
            throw new Error(res.error);
        }
    }catch(err){
        console.log(err);
    }
}

apiRequestTogetUserdata();


const alertInternalError = document.getElementById("alertInternalError");
alertInternalError.style.display = 'none'
const deleteArticle = async (emailHeadingDate)=>{
    const response = await fetch('/api/deleteUnapprovedArticle',{
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

let time,date;
const month = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
const dateFunction = ()=>{
    time = new Date();
    date = time.getDate()+" "+month[time.getMonth()]+" "+time.getFullYear()
}
let email = localStorage.getItem("codingBlocksEmail");
const approve = async (index)=>{
    dateFunction();
    let emailHeadingDate = newArticlesRequestArray[index].emailHeadingDate;
    const response = await fetch('/api/approveNewArticle',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
           emailHeadingDate:emailHeadingDate,email:email,date:date
        })
    });
    if(response.status == 200){
        window.location.reload()
    }else{
        alertInternalError.style.display = 'block'
    }
}