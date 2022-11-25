function submitPost(){
    axios.request({
        url: `https://jsonplaceholder.typicode.com/posts`,
        method: `POST`,
        data: {
            title: document.getElementById(`postTitleBox`).value,
            body: document.getElementById(`postBodyBox`).value,
            user: document.getElementById(`userIdBox`).value,
        }
    }).then(postSuccess).catch(postFailure);
}

function postSuccess(response){
    let data = response.data;
    document.body.insertAdjacentHTML(`beforeend`, `<h3>Post ${data.id} has been successfully created.</h3>`);
    console.log(data);
}

function postFailure(error){
    document.body.insertAdjacentHTML(`beforeend`, `<h3>Post failed, please try again.</h3>`);
    console.log(error);
}

// authentication slide deck first example:
function login(){
    axios.request({
        url: `https://reqres.in/api/login`,
        method: `POST`,
        data: {
            email: document.getElementById(`usernameBox`).value,
            password: document.getElementById(`passwordBox`).value
        }
    }).then(loginSuccess).catch(loginFailure);
}

function loginSuccess(response){
    Cookies.set(`sessionToken`, response.data.token);
    alert(`Login Successful, welcome!`)
}

// do not overuse Alert, they can be very annoying to user
function loginFailure(error){
    console.log(error.response.data.error);
    alert(error.response.data.error)
}

// it is more critical to have the Token deleted on the back end, but it needs to be deleted
// on the back end, then the front end (cookie)
// in this case, we don't have control over the back end, so we'll try doing a log out request
// in essense the idea is a delete operation, sent to the end point that handles the user Auth
// basically making a DELETE request instead of a POST request.
// REMEMBER THIS: Only deleting the front end token, is not safe, 
// only deleting the back end token is OK. Ultimately the back end will notify you it's not a valid
// token and try again/log in again. So always remove from back end so it doesn't get session high jacked


document.getElementById(`submitPost`).addEventListener(`click`, submitPost);
document.getElementById(`loginButton`).addEventListener(`click`, login);

