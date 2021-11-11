let requestType = new URL(location.href).searchParams.get('requestType');
let articleHeading
if(requestType == "edit"){
    articleHeading = new URL(location.href).searchParams.get('article')
    articleHeading = articleHeading.replace("%20"," ");
}



const topicBox = document.getElementById("topicBox");
let topicDetailsArray = [];
const apiRequestTogeTopics = async ()=>{
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
                topicDetails +=`<option value="${element.topic}">${element.topic}</option>`
            });
            topicBox.innerHTML = topicDetails;
        }else{
            throw new Error(res.error);
        }
    }catch(err){
        console.log(err);
    }
}
apiRequestTogeTopics();

let heading = document.getElementsByName("heading")[0];
let content1 = document.getElementsByName("content1")[0];
let content2 = document.getElementsByName("content2")[0];
let topic = document.getElementsByName("topic")[0];

// results from content1.js 
let getDetailsOfArticle = async ()=>{
    let response = await fetch('/api/content',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            heading:articleHeading
        })
    });
    article = await response.json();
    article = article.details[0];
    heading.value = article.heading
    content1.value = article.content1
    content2.value = article.content2
    topic.value = article.topic
}
if(requestType=="edit"){
    getDetailsOfArticle();
}


let emailId = localStorage.getItem("codingBlocksEmail");
const forEmail = document.getElementById("forEmail");
forEmail.innerHTML = `<input type="text" name="email" value="${emailId}">`


