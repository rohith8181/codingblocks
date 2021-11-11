
const tbody = document.querySelector("tbody");
// api request to get user details 
let topicDetailsArray = [];
const apiRequestTogetdata = async ()=>{
    try{
        const res = await fetch('/api/topicDetails',{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            }
        });
        if(res.status === 200){
            let results = await res.json();
            topicDetailsArray = results.data;
            let topicDetails = ``;
            topicDetailsArray.forEach(element => {
                topicDetails +=`<tr>
                                    <td>${element.topic}</td>
                                    <td>${element.email}</td>
                                    <td>${element.date}</td>
                                </tr>`
            });
            tbody.innerHTML = topicDetails;
            if(topicDetailsArray.length ==0){
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

apiRequestTogetdata();


// adding topic 
const alertInternalError = document.getElementById("alertInternalError")
const alertIncomplete = document.getElementById("alertIncomplete");
alertIncomplete.style.display = 'none';
alertInternalError.style.display = 'none'
let topic;
const email = localStorage.getItem("codingBlocksEmail");
// for getting date 
let time,date;
const month = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
const dateFunction = ()=>{
    time = new Date();
    date = time.getDate()+" "+month[time.getMonth()]+" "+time.getFullYear()
}
const addTopic = async ()=>{
    topic = document.querySelector("input").value;
    dateFunction()
    const response = await fetch('/api/topicDetails/addTopic',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            topic:topic,email:email,date:date
        })
    });
    if(response.status == 200){
        window.location.reload();
        alertIncomplete.style.display = 'none';
        alertInternalError.style.display = 'none';
    }else if(response.status == 203){
        alertIncomplete.style.display = 'block';
        alertInternalError.style.display = 'none';
    }else{
        alertIncomplete.style.display = 'none';
        alertInternalError.style.display = 'block';
    }
}

