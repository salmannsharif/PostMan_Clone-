console.log('In this project we create postman clone --> by Salman'); // Sample text to see in browser , js file working or not...,

// Utility functions:
// 1. Utility functions to get DOM element from string..
function getElementFromString(string)
{
    let div= document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}


// initialize number of parameters 
let addedParamscount = 0;


// Hide the parameter box initialy
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

// If the user click on params box , hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';
})


// If the user click on json box , hide the params box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parameterBox').style.display = 'none';
})

// If the user click on plus button add more parameters (+)

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', (e) => {

    let params = document.getElementById('params');
    let string = `  <div class="row g-3 my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamscount + 2}</label>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterKey${addedParamscount + 2}" placeholder="Enter Parameter ${addedParamscount + 2} Key">
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterValue${addedParamscount + 2}" placeholder="Enter Parameter${addedParamscount + 2} Value">
    </div>
    <button  class="btn btn-primary deleteParam" style="width: 50px;">-</button>
  </div>`;


  // Convert the element String to DOM node 
  let paramElement= getElementFromString(string);
  params.appendChild(paramElement);

  // Add an event listener to remove the parameter on clicking - Button
  let deleteParam= document.getElementsByClassName('deleteParam');
  for ( item of deleteParam)
  {
      item.addEventListener('click',(e)=>{
          e.target.parentElement.remove();
        })
    }
    
    addedParamscount++;
})



let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    document.getElementById('responsePrism').innerHTML='Please Wait..fetching response';
    
    
    // fetch all the values user has entered
    
    let url=document.getElementById("url").value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;
    let contentType=document.querySelector("input[name='contentType']:checked").value;

    // If the user used params option instead of json , then collect all the parameters in an object

    if(contentType == 'params'){
        data={};

        for(let i=0 ; i<addedParamscount+1;i++)
        {
            if(document.getElementById('parameterKey'  +(i+1)) != undefined){
            let key =document.getElementById('parameterKey' +(i+1)).value;
            let value =document.getElementById('parameterValue'+(i+1)).value;
            data[key]=value;
            }

        }
        data= JSON.stringify(data);

    }
    else{
        data=document.getElementById('requestJsonText').value;
    }
        
    // Log all the values in the console for debugging 
    console.log('URL is' ,url);
    console.log('Request Type', requestType);
    console.log('content Type', contentType);
    console.log('data is', data);


    // If the request type is get invoke the fetch api to create a post request
    if(requestType =='GET'){
        fetch(url, {
            method:'GET'
        })
        .then(response => response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }
    else
    {
        fetch(url, {
            method:'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response => response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }

})
