

const tbody = document.querySelector("tbody");
// api request to get user details 
let adminDetailsArray = [];
const apiRequestTogetUserdata = async ()=>{
    try{
        // sending api request 
        const res = await fetch('/api/adminDetails',{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            }
        });
        if(res.status === 200){
            // if everything is ok then taking result from 
            let results = await res.json();

            // stroring the array of data in adminDetailsArray 
            adminDetailsArray = results.data;
            let adminDetails = ``;
            adminDetailsArray.forEach(element => {
                adminDetails +=`<tr>
                                    <td>${element.name}</td>
                                    <td>${element.email}</td>
                                </tr>`
            });
            tbody.innerHTML = adminDetails;

            // if teh data is empty means empty array then showing nothing 
            if(adminDetailsArray.length ==0){
                nothing.innerHTML = "<p>Nothing to show</p>"
            }
            console.log(adminDetailsArray)
        }else{
            // if error occurs then also showing nothing in html file 
            nothing.innerHTML = "<p>Nothing to show</p>"
            throw new Error(res.error);
        }
    }catch(err){
        console.log(err);
    }
}
// run function whenever page reload 
apiRequestTogetUserdata();


// making new user admin

// getting all alerts 
const alertInternalError = document.getElementById("alertInternalError")
const alertIncomplete = document.getElementById("alertIncomplete");
const alertUserExist = document.getElementById("alertUserExist");
// displaying them initially none 
alertIncomplete.style.display = 'none';
alertInternalError.style.display = 'none';
alertUserExist.style.display = 'none';


let password,email,name;

// making function which will fire on button which is in adminDetails.html file 
const makeAdmin = async ()=>{
    // taking values of the inputs 
    name = document.getElementsByName("name")[0].value;
    email = document.getElementsByName("email")[0].value;
    password = document.getElementsByName("password")[0].value;
    // sending api request and getting response 
    const response = await fetch('/api/adminDetails/makeAdmin',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name:name,email:email,password:password
        })
    });

    // rendering results according to different status codes 
    if(response.status == 200){
        window.location.reload();
        alertIncomplete.style.display = 'none';
        alertInternalError.style.display = 'none';
        alertUserExist.style.display = 'none';
    }else if(response.status == 203){
        alertIncomplete.style.display = 'block';
        alertInternalError.style.display = 'none';
        alertUserExist.style.display = 'none';
    }else if(response.status == 401){
        alertIncomplete.style.display = 'none';
        alertInternalError.style.display = 'none';
        alertUserExist.style.display = 'block';
    }else{
        alertIncomplete.style.display = 'none';
        alertInternalError.style.display = 'block';
        alertUserExist.style.display = 'none';
    }
}