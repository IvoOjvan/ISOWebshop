const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

const btnSubmit = document.getElementById("btnSubmit");

const signIn = (event) => {
    event.preventDefault();
    let user = {
        email: inputEmail.value,
        password: inputPassword.value
    }
    
    fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('There is no such user');
            }
            return response.json();
        })
        .then(function (data) {
            // Request was successful, handle response here
            console.log(data)
            if(data.isAdmin == 1){
                console.log("Admin")
                window.location.href = "http://127.0.0.1:5500/Pages/admin.html";
            }else{
                window.location.href = "http://127.0.0.1:5500/Pages/main.html";
                console.log("Not admin")
            }
            window.localStorage.setItem("user", JSON.stringify(data));
            //console.log(localStorage.getItem("user"));
        })
        .catch(function (error) {
            // Handle errors here
            document.getElementById('loginError').innerHTML = "Incorrect Credentials!"
            setTimeout(function (){
                document.getElementById('loginError').innerHTML = ""
            }, 3000)

            console.error("Fetch error:", error);
        });
}

btnSubmit.addEventListener('click', signIn);