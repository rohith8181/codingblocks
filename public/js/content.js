let heading = new URL(location.href).searchParams.get('article')
heading = heading.replace("%20"," ");



const contentPart = document.getElementById("contentPart");
const commentPart = document.getElementById("commentPart");

let article,html,key,articleImage;
const sendDetails = async ()=>{
    let response = await fetch('/api/content',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            heading:heading
        })
    });
    article = await response.json();
    article = article.details[0];
    key = article.emailHeadingDate;
    html = `<div class="d-flex justify-content-between align-items-center">
                <h1 class="font1">${article.heading}</h1>
                <a href="/editArticle?requestType=edit&article=${article.heading}" type="button" id="edit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Improve article">
                    <i class="fas fa-pencil-alt"></i>
                </a>
            </div>
            <div class="ms-3">Last Updated : ${article.date}</div>
            <div class="ms-3">- By ${article.name}</div>
            <br>
            <p>
               ${article.content1}
            </p>
            <img src="../images/${article.image}" id="articleImage">
            <p>
                ${article.content2}
            </p>
            <hr>
            <div>
                <textarea placeholder="add a comment"></textarea>
                <button class="btn solidBtn" onclick="addComment(key)">Submit</button>
            </div>
            <hr>
            <br>`
    contentPart.innerHTML = html;
    articleImage = document.getElementById("articleImage");
    if(article.image == null){
        articleImage.style.display = 'none';
    }
}
sendDetails();

let time,date;
const month = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
const dateFunction = ()=>{
    time = new Date();
    date = time.getDate()+" "+month[time.getMonth()]+" "+time.getFullYear()
}
const emailUser = localStorage.getItem('codingBlocksEmail');
let addComment;
if(!emailUser){
    addComment = (key)=>{
        location.replace("/login")
    }
}else{
    addComment = async (key)=>{
        let comment = document.querySelector("textarea").value;
        dateFunction();
        let res = await fetch('/api/content/addComment',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                key:key,email:emailUser,comment:comment,time:time
            })
        });
        if(res.status == 200){
            comment = "";
            window.location.reload();
        }
    }
}


let commentArray,commentHtml = ``;
const getComments = async()=>{
    let res = await fetch('/api/content/getComments',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            heading:heading
        })
    });
    commentArray = await res.json();
    commentArray = commentArray.data;
    commentArray.forEach(element => {
        commentHtml +=`<div class="mb-3">
                            <div class="d-flex align-items-center">
                                <div class="userCommentPhoto">
                                    <i class="fas fa-user"></i>
                                </div>
                                <b>${element.email}</b>
                            </div>
                            ${element.comment}
                        </div>`
    });
    commentPart.innerHTML = commentHtml;

}
getComments();

