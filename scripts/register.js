const inputFirstname = document.getElementById("inputFirstname");
const inputLastname = document.getElementById("inputLastname");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

const firstnameError = document.getElementById('firstname-error');
const lastnameError = document.getElementById('lastname-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

const btnSubmit = document.getElementById("btnSubmit");

const validateData = () => {
    let email = inputEmail.value;
    let password = inputPassword.value;
    let firstname = inputFirstname.value;
    let lastname = inputLastname.value;

    if(!isFirstnameValid(firstname)){
        return false;
    }
    else if(!isLastnameValid(lastname)){
        return false;
    }
    else if(!isEmailValid(email)){
        return false;
    }
    else if(!isPasswordValid(password)){
        return false;
    }
    else {
       return true; 
    }
}

const isPasswordValid = (password) => {
    if(password.length < 8){
        passwordError.innerHTML = "Password have atleast 8 characters!"
        setTimeout(function(){
            passwordError.innerHTML = ""
        }, 2500)
        return false;
    }
    else if(password.search(/[a-z]/) < 0){
        passwordError.innerHTML = "Password must contain at least one lower case letter!"
        setTimeout(function(){
            passwordError.innerHTML = ""
        }, 2500)
        return false;
    }
    else if(password.search(/[A-Z]/) < 0){
        passwordError.innerHTML = "Password must contain at least one upper case letter!"
        setTimeout(function(){
            passwordError.innerHTML = ""
        }, 2500)
        return false;
    }
    else if(password.search(/[0-9]/) < 0){
        passwordError.innerHTML = "Password must contain at least one digit!"
        setTimeout(function(){
            passwordError.innerHTML = ""
        }, 2500)
        return false;
    }
    else{
        return true;
    }
}

const isEmailValid = (email) => {
    if(email.length == 0){
        inputEmail.focus();
        emailError.innerHTML = "Email can't be left empty!"
        setTimeout(function(){
            emailError.innerHTML = ""
        }, 2500)
        return false;
    } 
    else if(!email.includes('@')){
        emailError.innerHTML = "This is not a valid email address!"
        setTimeout(function(){
            emailError.innerHTML = ""
        }, 2500)
        return false;
    } 
    else if(!(email.endsWith('.hr') || email.endsWith('.com') || email.endsWith('.net'))){
        emailError.innerHTML = "This is not a valid email address domain!"
        setTimeout(function(){
            emailError.innerHTML = ""
        }, 2500)
        return false;
    }
   
    return true;
}

const isFirstnameValid = (firstname) => {
    if(firstname.length == 0){
        inputFirstname.focus();
        firstnameError.innerHTML = "Firstname can't be empty!"
        setTimeout(function(){
            firstnameError.innerHTML = ""
        }, 2500)
        return false;
    }
    return true;
}

const isLastnameValid = (lastname) => {
    if(lastname.length == 0){
        inputLastname.focus();
        lastnameError.innerHTML = "Lastname can't be empty!"
        setTimeout(function(){
            lastnameError.innerHTML = ""
        }, 2500)
        return false;
    }
    return true;
}

const registerUser = (event) => {
    event.preventDefault();
    console.log("Start validation")
    if(validateData()){
        user = {
            firstname: inputFirstname.value,
            lastname: inputLastname.value,
            email: inputEmail.value,
            password: inputPassword.value,
            isAdmin: false
        };

        console.log(JSON.stringify(user))
        
        fetch('http://localhost:8080/users/create/0', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('User already exists');
            }
            return response.json();
        })
        .then(function (data) {
            // Request was successful, handle response here
            //console.log(data);
            inputFirstname.value = "";
            inputLastname.value = "";
            inputEmail.value = "";
            inputPassword.value = "";
            window.location.href = "http://127.0.0.1:5500/Pages/login.html"
        })
        .catch(function (error) {
            // Handle errors here
            emailError.innerHTML = "This email is taken!"
            setTimeout(function(){
                emailError.innerHTML = ""
            }, 2500)
            console.error("Fetch error:", error);
        });
    }
    else {
        console.log("Data not valid")
    }
}

btnSubmit.addEventListener('click', registerUser);

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#inputPassword');

togglePassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    // Toggle the icon
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
});