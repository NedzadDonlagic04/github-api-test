// Using the querySelector method on the document to get the 
// input and button element needed to get the url for the 
// github user
const input = document.querySelector('input');
const button = document.querySelector('button');

// Using the querySelector method on the document to get the
// 2 divs which represent the users profile and the error message
// if the url given is correct it will display the profile div
// if it isn't correct it will display the error message div
const profile = document.querySelector('#profile');
const error = document.querySelector('#error');

// Using the querySelector method and the querySelectorAll
// method on the document to get the img element for the user's
// avatar and the spans which will contain the basic information
// about the user
const img = document.querySelector('img');
const spans = document.querySelectorAll('span');

// By default both the profile div and error message div will be hidden
profile.classList.add('hidden');
error.classList.add('hidden');

// Defining the function validateURL which will take as an argument an
// url (which will be inside the input element), and then using the try
// and catch method we will return either true or false based on the 
// url being correct or not
// This part Boolean(new URL(url)) is doing the following
// -first we are creating an object of the URL class and passing it
//  the url as a constructor argument
// -then it will check is the passed url correct or not
// -if it isn't it will throw an error and we will enter the catch
//  block where it will return false, if it is correct it will take
//  that object and convert it into a Boolean which will be true
const validateURL = url => {
    try{
        return Boolean(new URL(url));
    }
    catch(e)
    {
        return false;
    }
}

// Adding an event listener to the button for the click event
// Passing it an async arrow function which will
// take the current value of the input element (which should be
// a valid url) and checking is it valid, if so it will then
// make a fetch request, which if also ok will then convert the
// info the api gives into a json and properly display it on screen
// If the url isn't valid the correct error message will be displayed
button.addEventListener('click' , async () => {
    const url = input.value;

    if(validateURL(url))
    {
        const json = await fetch(url)
            .then( response => {
                if(response.ok)
                {
                    return response.json();
                }
                return Promise.reject();
            })
            .catch( errorMsg => {
                console.log(`Error: ${errorMsg}`);
            })
        
        if(json!==undefined)
        {
            const spanInfo = [];
            spanInfo.push(json['login']);
            spanInfo.push(json['public_repos']);
            spanInfo.push(json['followers']);
            spanInfo.push(json['following']);

            img.setAttribute('src',json['avatar_url'])

            for(let i=0;i<spanInfo.length;i++)
            {
                spans[i].innerText = spanInfo[i];
            }

            profile.classList.remove('hidden');
            if(error.classList.contains('hidden')===false)
            {
                error.classList.add('hidden');
            }

            return;
        }
    }
    error.classList.remove('hidden');
    if(profile.classList.contains('hidden')===false)
    {
        profile.classList.add('hidden');
    }
});