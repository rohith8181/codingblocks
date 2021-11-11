let tokenCookie,isAdmin
tokenCookie = localStorage.getItem("codingBlocksToken");
isAdmin = localStorage.getItem("admin");

if(!isAdmin){
    isAdmin = null;
}
if(!tokenCookie){
    tokenCookie = null
}

const sendInfo = ()=>{
    let response = fetch('/api/authenticate',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            admin:isAdmin,token:tokenCookie
        })
    });
}

sendInfo();