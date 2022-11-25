//NOTE for project writing errors is IMPORTANT
// CHROME EXTENSION - JSON VIEWER

// Dog API functions

// Mark says he usually specifies GET request method so it's easier to read even though GET is the default method
function getDog(){
    axios.request({
        url: `https://dog.ceo/api/breeds/image/random`,
        method: `GET`
    }).then(dogSuccess).catch(dogFailure);
}

function dogFailure(error){
    console.log(error);
    insertResult(null);
}

function dogSuccess(response){
    let dogData = response.data;
    insertResult(dogData.message);
}


// Stock photo API functions

function getStockPhotos(){
    apiResult.innerHTML = `Pictures are loading..`;
    axios.request({
        url: `https://picsum.photos/v2/list`
    }).then(stockSuccess).catch(stockFailure);
}

function stockSuccess(response){
    // clear results (function we declared) resets the innerHTML after we added the "loading" message
    clearResults();
    let photos = response.data;
    for(let photo of photos){
        let src = photo.download_url;
        // insertResult is a FUNCTION see below, this is how to make a function call inside a function
        insertResult(src);
    }
}

// EXAMPLE OF JUST DISPLAYING 1 OF THE ARRAY ELEMENTS
// function stockSuccess(response){
//     let photos = response.data;
//     let src = photos[0].download_url;
//     apiResult.insertAdjacentHTML(`beforeend`,
//                                 `<img src="${src}" alt="Stock Photo">`)
// }



// Result container manipulation:

// a function to make it less DRY - then replace the code with this function INSIDE the other functions
function insertResult(src){
    if(src != null){
        apiResult.insertAdjacentHTML(`beforeend`,
        `<img src="${src}" alt="Stock Photo">`)
    } else{
        apiResult.innerHTML = `Error fetching images.`;
    }

}

function stockFailure(error){
    insertResult(null);
}

function clearResults(){
    apiResult.innerHTML = ``;
}

// execute on load
const apiResult = document.getElementById(`apiResult`);

document.getElementById(`getDog`).addEventListener(`click`, getDog);
document.getElementById(`clearResults`).addEventListener(`click`, clearResults);
document.getElementById(`getPhotos`).addEventListener(`click`, getStockPhotos);