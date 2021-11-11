
const tbody = document.querySelector("tbody");
// api request to get user details 
let userInfoArray = [];
const apiRequestTogetUserdata = async ()=>{
    try{
        const res = await fetch('/api/userDetails',{
            method:"GET",
            headers:{
                "content-Type":"application/json"
            }
        });
        if(res.status === 200){
            let results = await res.json();
            userInfoArray = results.data;
            let userDetails = ``;
            userInfoArray.forEach(element => {
                userDetails +=`<tr>
                                    <td>${element.name}</td>
                                    <td>${element.email}</td>
                                </tr>`
            });
            tbody.innerHTML = userDetails;
            if(userInfoArray.length ==0){
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

