const learn = document.getElementById("learn");
learn.innerHTML = `<div class="container my-4">
<center><h2 class="font1 basicText">Don't Learn Alone</h2></center>
<center><h5 class="font1">Be the 'Pro' in the Programming</h5></center>
<div class="row">
    <div class="col-md d-flex align-items-center justify-content-center flex-column mt-5">
        <img src="../images/home1.png" alt="">
        <h4 class="text-center">Prepare with us</h4>
        <div class="text-center" style="color: gray;">Prepare for an interview with millions of articles and courses designed by experts.</div>
    </div>
    <div class="col-md d-flex align-items-center justify-content-center flex-column mt-5">
        <img src="../images/home2.png" alt="">
        <h4 class="text-center">Get Hired With Us</h4>
        <div class="text-center" style="color: gray;">Don’t know where to apply? Stop by GeeksforGeeks where we offer multiple opportunities for you to get hired</div>
    </div>
    <div class="col-md d-flex align-items-center justify-content-center flex-column mt-5">
        <img src="../images/home3.png" alt="">
        <h4 class="text-center">Grow With Us</h4>
        <div class="text-center" style="color: gray;">Gain and share your knowledge & skills with a variety of learning platforms offered by GeeksforGeeks.</div>
    </div>
</div>
</div>`


let adminHome = localStorage.getItem("admin");
let tokenHome = localStorage.getItem("codingBlocksToken");
const introButton = document.getElementById("introButton");

if(adminHome && tokenHome){
    introButton.innerHTML = ` <a href="/articleDetails"><div class="solidBtn btn">Admin Section</div></a>`
}else if(tokenHome){
    introButton.innerHTML = ` <a href="/addArticle"><div class="solidBtn btn">Write Article</div></a>`
}else{
    introButton.innerHTML = ` <a href="/login"><div class="solidBtn btn">Get Started</div></a>`
}