//  show and  function of password 
const passInput = document.getElementsByName('password')[0];
const showHide = document.getElementById("showHide");
showHide.addEventListener('click',()=>{
    if(passInput.type == 'password'){
        passInput.type = 'text';
        showHide.innerHTML = `<i class="far fa-eye"></i>`;
    }else{
        passInput.type = 'password';
        showHide.innerHTML =  `<i class="fas fa-eye-slash"></i>`;
    }
})


// gettign all alerts 
const alertInternalError = document.getElementById("alertInternalError")
const alertInvalidCredentials = document.getElementById("alertInvalidCredentials")
const alertIncomplete = document.getElementById("alertIncomplete")

alertIncomplete.style.display = 'none';
alertInvalidCredentials.style.display = 'none';
alertInternalError.style.display = 'none';


// sending api requst 
const sendDetails = async ()=>{
    const password = document.getElementsByName('password')[0].value;
    const email  = document.getElementsByName('email')[0].value;
    const response = await fetch('/api/adminLogin',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            email:email,password:password
        })
    });
    if(response.status == 203){ 
        alertIncomplete.style.display = 'block';
        alertInvalidCredentials.style.display = 'none';
        alertInternalError.style.display = 'none';
        console.log("incomp")

    }else if(response.status == 404){ 
        alertIncomplete.style.display = 'none';
        alertInvalidCredentials.style.display = 'block';
        alertInternalError.style.display = 'none';  

    }else if(response.status == 200){
        // if everything is ok then making all alerts none and stroign information in local storage 
        alertIncomplete.style.display = 'none';
        alertInvalidCredentials.style.display = 'none';
        alertInternalError.style.display = 'none';
        let data = await response.json();
        data = (data.data)[0];
        localStorage.setItem("codingBlocksToken",email+Date.now());
        localStorage.setItem("codingBlocksName",data.name);
        localStorage.setItem("codingBlocksEmail",email);
        localStorage.setItem("admin","yes"+email);
        document.cookie = `codingBlocksToken=${email+Date.now()}`
        document.cookie = `codingBlocksAdmin=yes`
        location.replace('/articleDetails');
    }else{
        alertIncomplete.style.display = 'none';
        alertInvalidCredentials.style.display = 'none';
        alertInternalError.style.display = 'block';
    }
}

// getting submit button of login page  and running function to send api request 
const submit = document.getElementById("submit");
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    sendDetails();
})
