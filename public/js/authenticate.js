// getting all tags 
const navAuth = document.getElementById("navAuth");
const toggleNavAuth = document.getElementById("toggleNavAuth");
const token = localStorage.getItem("codingBlocksToken");
const name = localStorage.getItem("codingBlocksName");
const email = localStorage.getItem("codingBlocksEmail");
const admin = localStorage.getItem('admin');
// const introButton = document.getElementById("introButton");

// logout function clearing local storage items stored like email name and token 
const logout = async ()=>{
    localStorage.removeItem("codingBlocksToken")
    localStorage.removeItem("codingBlocksName")
    localStorage.removeItem("codingBlocksEmail");
    const lout = await fetch('/api/logout',{
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-Type":"application/json"
        },
        Credentials:'include'
    });
    console.log(lout);
    // if user is admin deleteing admin from local storage 
    if(admin){
        localStorage.removeItem('admin');
    }

    // redirecting to home page 
    location.replace('/');
}



// if user regester as admin then  navbar and navbar when website is responsive 
if(token && !admin){
    // introButton.innerHTML = ` <a href="/addArticle"><div class="solidBtn btn">Write Article</div></a>`
    navAuth.innerHTML = `<div class="profile d-flex align-items-center justify-content-center">
                            <div class="dropdown d-flex align-items-center justify-content-center h-100 w-100">
                                <a class="dropdown-toggle h-100 w-100 d-flex align-items-center justify-content-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-user"></i>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li class="my-1 text-center basicText">${name}</li>
                                    <li class="my-1 text-center">${email}</li>
                                    <li><hr class="dropdown-divider mt-4 mb-3"></li>
                                    <li class="my-1"><a href="/addArticle?requestType=new">Write Article</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li onclick="logout()">Logout</li>
                                </ul>
                            </div>
                        </div>`
    toggleNavAuth.innerHTML = ` <div class="profile mx-auto d-flex align-items-center justify-content-center" style="cursor:default">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="my-1 text-center basicText">${name}</div>
                                <div class="my-1 text-center">${email}</div>
                                <div class="btn solidBtn bgBtn" onclick="logout()">Logout</div>
                                <hr>
                                <div class="my-2 px-4"><a href="/addArticle?requestType=new">Write Article</a></div>`

   
//    if user regester then the navbar and navbar for mobile size site                            
}else if(token && admin){
    // introButton.innerHTML = ` <a href="/articleDetails"><div class="solidBtn btn">Admin Section</div></a>`
    navAuth.innerHTML = `<div class="profile d-flex align-items-center justify-content-center">
                            <div class="dropdown d-flex align-items-center justify-content-center h-100 w-100">
                                <a class="dropdown-toggle h-100 w-100 d-flex align-items-center justify-content-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-user"></i>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li class="my-1 text-center basicText">${name}</li>
                                    <li class="my-1 text-center">${email}</li>
                                    <li><hr class="dropdown-divider mt-4 mb-3"></li>
                                    <a href="/articleDetails">Admin Section</a>
                                    <li><hr class="dropdown-divider"></li>
                                    <li onclick="logout()">Logout</li>
                                </ul>
                            </div>
                        </div>`
    toggleNavAuth.innerHTML = ` <div class="profile mx-auto d-flex align-items-center justify-content-center" style="cursor:default">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="my-1 text-center basicText">${name}</div>
                                <div class="my-1 text-center">${email}</div>
                                <div class="align-items-center justify-content-between">
                                    <a href="/articleDetails"><div class="btn outlineBtn bgBtn mt-3 mb-2">Admin Section</div></a>
                                    <div class="btn solidBtn bgBtn" onclick="logout()">Logout</div>
                                </div>`
// if user not regesterd 
}else{
    navAuth.innerHTML = ` <a href="/login"><div class="ms-1 btn outlineBtn">Get Started</div></a>`;
    toggleNavAuth.innerHTML = ` <a href="/login"><div class="ms-1 btn solidBtn bgBtn">Get Started</div></a>`
    // introButton.innerHTML = ` <a href="/login"><div class="solidBtn btn">Get Started</div></a>`
}






// For admin section 
