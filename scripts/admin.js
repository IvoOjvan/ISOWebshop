window.onload = () =>{
    if(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).isAdmin){

        let currentUser = JSON.parse(localStorage.getItem("user"));
        let usersContainer = document.getElementById("userContainer");

        document.getElementById("pUser").innerHTML += `${currentUser.lastname} ${currentUser.firstname}`
        //document.getElementById("ordersContainer").style.display = "none";
        //document.getElementById("productContainer").style.display = "none";

        fetch("http://localhost:8080/users/all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('There is no users');
            }
            return response.json();
        })
        .then(function (data) {
            // Request was successful, handle response here

            usersContainer.innerHTML = `
                <table class="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody id="userTable">`;

            let userTable = document.getElementById("userTable");
            console.log(data)
            data.forEach( user => {
                if(user.isAdmin == 0){
                    userTable.innerHTML += `
                        <tr id=user-${user.id}>
                        <th scope="row">${user.id}</th>
                        <td>${user.firstname}</td>
                        <td>${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>
                            <button type="button" class="btn btn-danger" id="btnSubmit" onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-success" id="btnEdit" onclick="openEditUserModal(${user.id})">Edit</button>
                        </td>
                        </tr>`;
                }
            })

            usersContainer.innerHTML += `
                </tbody>
                </table>
            `;
            usersContainer.innerHTML += `
                <tr>
                <td colspan = 4></td>
                <td>
                    <button type="button" class="btn btn-primary" id="addUserBtn" onclick="openUserModal()">Add user</button>
                </td>
                </tr>`;

        })
        .catch(function (error) {
            // Handle errors here
            console.error("Fetch error:", error);
        });


        // ###########################################################
        /*let productContainer = document.getElementById("productContainer");
        //productContainer.style.display = "none";
        productContainer.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Name</th>
                        <th scope="col" class='col-md-5'>Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="productTable">
        `;

        let productTable = document.getElementById("productTable");

        fetch("http://localhost:8080/products/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('There is no products');
            }
            return response.json();
        })
        .then(function(data){
            console.log(data)
            data.forEach(product => {
                productTable.innerHTML += 
                `<tr id=product-${product.id}>
                    <th scope="row">${product.id}</th>
                    <td>${product.brand}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.price} $</td>
                    <td>
                    <button type="button" class="btn btn-danger" id="btnDeleteProduct" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-success" id="btnEditProduct" onclick="openEditProductModal(${product.id})">Edit</button>
                    </td>
                </tr>`;
            })
            
            productContainer.innerHTML += `
                <tr>
                <td colspan = 4></td>
                <td>
                    <button type="button" class="btn btn-primary" id="addProductBtn" onclick="openProductModal()">Add Product</button>
                </td>
                </tr>`;
                
            productContainer.innerHTML += `
                </tbody>
                </table>
            `;
        })
        .catch(function (error) {
            // Handle errors here
            console.error("Fetch error:", error);
        });*/

        let productContainer = document.getElementById("productContainer");

fetch("http://localhost:8080/products/all", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('There is no products');
    }
    return response.json();
})
.then(function(data) {
    console.log(data);
    
    let tableContent = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Name</th>
                    <th scope="col" class='col-md-5'>Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="productTable">
    `;

    data.forEach(product => {
        tableContent += 
        `<tr id=product-${product.id}>
            <th scope="row">${product.id}</th>
            <td>${product.brand}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price} $</td>
            <td>
                <button type="button" class="btn btn-danger" id="btnDeleteProduct" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
            <td>
                <button type="button" class="btn btn-success" id="btnEditProduct" onclick="openEditProductModal(${product.id})">Edit</button>
            </td>
        </tr>`;
    });

    tableContent += `
        </tbody>
        </table>
    `;
    let tableContainer = document.getElementById('tblContainer');
    tableContainer.innerHTML = tableContent
    //productContainer.innerHTML = tableContent;
    productContainer.innerHTML += `
    <div class="add-product-button-container text-end mt-3">
        <button type="button" class="btn btn-primary" id="addProductBtn" onclick="openProductModal()">Add Product</button>
    </div>
`;
})
.catch(function(error) {
    console.error("Fetch error:", error);
});

        

        // ####################################################
        let ordersContainer = document.getElementById('ordersContainer');
        ordersContainer.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User</th>
                        <th scope="col" class='col-md-5'>Description</th>
                        <th scope="col">Total</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="ordersTable">
        `;

        let ordersTable = document.getElementById("ordersTable");
        fetch("http://localhost:8080/orders/all", {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('There is no products');
            }
            return response.json();
        })
        .then(function(orders){
            console.log(orders)
            orders.forEach(order => {
                ordersTable.innerHTML += `
                    <tr id=order-${order.id}>
                        <th scope="row">${order.id}</th>
                        <td>${order.userId}</td>
                        <td>${order.description}</td>
                        <td>${order.total} $</td>
                        <td>${order.date}</td>
                        <td>
                        <button type="button" class="btn btn-danger" id="btnDeleteOrder" onclick="deleteOrder(${order.id})">Delete</button>
                        </td>
                    </tr>`;
            })

            productContainer.innerHTML += `
                </tbody>
                </table>`;
            
        })
        .catch(function (error) {
            // Handle errors here
            console.error("Fetch error:", error);
        });


    } else {
        window.location.href = "http://127.0.0.1:5500/Pages/login.html";
    }
}

let logoutBtn = document.getElementById("logoutBtn");

const logOut = () => {
    localStorage.removeItem('user');
    if(!localStorage.getItem('user')){
        window.location.href = "http://127.0.0.1:5500/Pages/login.html";
    }
}

const deleteUser = (userId) => {
    fetch('http://localhost:8080/users/delete/'+userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.status === 204){
            document.getElementById(`user-${userId}`).remove();
            localStorage.removeItem(`cart-${userId}`);
        }else{
            throw new Error("Failed to delete user");
        }
    })
    .catch(error => {
        console.log("Delete error: ", error);
    })
}

const deleteProduct = (productId) => {
    fetch('http://localhost:8080/products/delete/'+productId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.status === 204){
            document.getElementById(`product-${productId}`).remove();
        }else{
            throw new Error("Failed to delete product");
        }
    })
    .catch(error => {
        console.log("Delete error: ", error);
    })
}

const deleteOrder = (orderId) => {
    fetch(`http://localhost:8080/orders/delete/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.status === 204){
            document.getElementById(`order-${orderId}`).remove();
        }else{
            throw new Error("Failed to delete order");
        }
    })
    .catch(error => {
        console.log("Delete error: ", error);
    })
}

const openUserModal = () => {
    let modal = new bootstrap.Modal(document.getElementById("addUserModal"));
    inputLastname.value = ""
    inputFirstname.value = ""
    inputEmail.value = ""
    inputPassword.value = ""
    modal.show();
}

const openProductModal = () => {
    let modal = new bootstrap.Modal(document.getElementById("productModal"));

    let btnEditProduct = document.getElementById("btnSaveEditProduct");
    let btnCreateProduct = document.getElementById("btnCreateProduct");
    btnCreateProduct.style.display = "block";
    btnEditProduct.style.display = "none";

    inputBrand.value = "";
    inputName.value = "";
    inputDescription.value = "";
    inputPrice.value = "";
    modal.show();
}

const openEditProductModal = (productID) => {
    let modal = new bootstrap.Modal(document.getElementById("productModal"));
    const inputBrand = document.getElementById("inputBrand");
    const inputName = document.getElementById("inputName");
    const inputDescription = document.getElementById("inputDescription");
    const inputPrice = document.getElementById("inputPrice");

    let btnEditProduct = document.getElementById("btnSaveEditProduct");
    let btnCreateProduct = document.getElementById("btnCreateProduct");
    btnCreateProduct.style.display = "none";
    btnEditProduct.style.display = "block";

    fetch("http://localhost:8080/products/product/"+productID, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('There is no product');
        }
        return response.json();
    })
    .then(function(data){
        inputBrand.value = data.brand;
        inputName.value = data.name;
        inputDescription.value = data.description;
        inputPrice.value = data.price;

        modal.show();

        btnEditProduct.addEventListener('click', function(){

            if(
                inputBrand.value != "" &&
                inputName.value != "" &&
                inputDescription.value != "" && 
                inputPrice.value != ""
            ){
                let changedProduct = {
                    id: data.id,
                    brand: inputBrand.value,
                    name: inputName.value,
                    description: inputDescription.value,
                    price: inputPrice.value
                };
                
                fetch("http://localhost:8080/products/create/"+productID, {
                    method: 'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(changedProduct)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('There is no product');
                    }
                    return response.json();
                })
                .then(function(product){
                    let productRow = document.getElementById("product-"+product.id);
                    productRow.innerHTML = `
                    <th scope="row">${product.id}</th>
                    <td>${product.brand}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.price} $</td>
                    <td>
                    <button type="button" class="btn btn-danger" id="btnDeleteProduct" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-success" id="btnEditProduct" onclick="openEditProductModal(${product.id})">Edit</button>
                    </td>
                    `
                    modal.hide();
                })
                .catch(error => {
                    console.log("Update error: ", error);
                })
            }
        })
    })
    .catch(error => {
        console.log("Get error: ", error);
    })
}

const openEditUserModal = (userID) => {
    let modal = new bootstrap.Modal(document.getElementById("editUserModal"));
    let inputFirstnameEdit = document.getElementById("inputFirstnameEdit");
    let inputLastnameEdit = document.getElementById("inputLastnameEdit");
    let inputEmailEdit = document.getElementById("inputEmailEdit");
    let btnSaveEditUser = document.getElementById("btnSaveEditUser");

    fetch("http://localhost:8080/users/user/"+userID, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('There is no users');
        }
        return response.json();
    })
    .then(function (data) {
        inputFirstnameEdit.value = data.firstname;
        inputLastnameEdit.value = data.lastname;
        inputEmailEdit.value = data.email;

        btnSaveEditUser.addEventListener('click', function() {
            changedUser = {
                id: data.id,
                password: data.password,
                isAdmin: data.isAdmin,
                firstname: inputFirstnameEdit.value,
                lastname: inputLastnameEdit.value,
                email: inputEmailEdit.value,
            }

            if(
                inputFirstnameEdit.value != "" &&
                inputLastnameEdit.value != "" &&
                (inputEmailEdit.value != "" && isEmailValid(inputEmailEdit.value))
            ){

                fetch("http://localhost:8080/users/create/"+userID, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(changedUser)
                })
                .then(response => {
                    if (!response.ok) {
                        editUserEmailError.innerHTML = "Email is already taken!";
                        setTimeout(() => {
                            editUserEmailError.innerHTML = "";
                        }, 2500);
                        throw new Error('Error updating user');
                    }
                    return response.json();
                })
                .then(function(data){
                    let userRow = document.getElementById("user-"+data.id);
                    userRow.innerHTML = `
                    <th scope="row">${data.id}</th>
                        <td>${data.firstname}</td>
                        <td>${data.lastname}</td>
                        <td>${data.email}</td>
                        <td>
                        <button type="button" class="btn btn-danger" id="btnSubmit" onclick="deleteUser(${data.id})">Delete</button>
                        </td>
                        <td>
                        <button type="button" class="btn btn-success" id="btnEdit" onclick="openEditUserModal(${data.id})">Edit</button>
                        </td>`;
                    modal.hide();
                })
                .catch(error => {
                    console.log("Update error: ", error);
                })
            } else {
                if(inputFirstnameEdit.value == ""){
                    editUserFirstNameError.innerHTML = "Firstname can't be empty!";
                    setTimeout(function(){
                        editUserFirstNameError.innerHTML = "";
                    }, 2500)
                }
                if(inputLastnameEdit.value == ""){
                    editUserLastNameError.innerHTML = "Lastname can't be empty!";
                    setTimeout(function(){
                        editUserLastNameError.innerHTML = "";
                    }, 2500)
                }
                if(inputEmailEdit.value == ""){
                    editUserEmailError.innerHTML = "Email can't be empty!";
                    setTimeout(function(){
                        editUserEmailError.innerHTML = "";
                    }, 2500)
                } 
                else if (!isEmailValid(inputEmailEdit.value)) {
                    editUserEmailError.innerHTML = "This is not valid email!";
                    setTimeout(function(){
                        editUserEmailError.innerHTML = "";
                    }, 2500)
                }
            }
        })
    
        modal.show();
    })
    .catch(error => {
        console.log("Get error: ", error);
    })
}

const productBrandError = document.getElementById("productBrand-error");
const productNameError = document.getElementById("productName-error");
const productDescriptionError = document.getElementById("productDescription-error");
const productPriceError = document.getElementById("productPrice-error");

const createProduct = () => {
    const inputBrand = document.getElementById("inputBrand");
    const inputName = document.getElementById("inputName");
    const inputDescription = document.getElementById("inputDescription");
    const inputPrice = document.getElementById("inputPrice");

    if(inputBrand.value.length > 0 && 
        inputName.value.length > 0 && 
        inputDescription.value.length > 0 &&
        inputPrice.value > 0
    ){
        product = {
            brand: inputBrand.value,
            name: inputName.value,
            description: inputDescription.value,
            price: inputPrice.value
        };

        fetch("http://localhost:8080/products/create/0", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => {
            if (!response.ok) {
                productNameError.innerHTML = "This product already exists!";
                setTimeout(function(){
                    productNameError.innerHTML = ""
                }, 2500)
                throw new Error('Product already exists');
            }
            return response.json();
        })
        .then(function(product){
            productTable.innerHTML += 
            `<tr id=product-${product.id}>
                <th scope="row">${product.id}</th>
                <td>${product.brand}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price} $</td>
                <td>
                <button type="button" class="btn btn-danger" id="btnDeleteProduct" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
                <td>
                <button type="button" class="btn btn-success" id="btnEditProduct" onclick="openEditProductModal(${product.id})">Edit</button>
                </td>
            </tr>`;
            
            let modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
            modal.hide();
        })
        .catch(function (error) {
            // Handle errors here
            console.error("Fetch error:", error);
        });
    } else {
        if(inputBrand.value == ""){
            productBrandError.innerHTML = "Brand can't be empty!";
            setTimeout(function(){
                productBrandError.innerHTML = ""
            }, 2500)
        }
        if(inputName.value == ""){
            productNameError.innerHTML = "Name can't be empty!";
            setTimeout(function(){
                productNameError.innerHTML = ""
            }, 2500)
        }
        if(inputDescription.value == ""){
            productDescriptionError.innerHTML = "Description can't be empty!";
            setTimeout(function(){
                productDescriptionError.innerHTML = ""
            }, 2500)
        }
        if(inputPrice.value <= 0){
            productPriceError.innerHTML = "Price must be greater than 0$!";
            setTimeout(function(){
                productPriceError.innerHTML = ""
            }, 2500)
        }
    }
}


const inputFirstname = document.getElementById("inputFirstname");
const inputLastname = document.getElementById("inputLastname");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

const firstnameError = document.getElementById('firstname-error');
const lastnameError = document.getElementById('lastname-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

const editUserFirstNameError = document.getElementById("editUserFirstName-error")
const editUserLastNameError = document.getElementById("editUserLastName-error")
const editUserEmailError = document.getElementById("editUserEmail-error")

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


const createUser = () => {
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
                document.getElementById("email-error").innerHTML = "Email is already taken!";
                setTimeout(() => {
                    document.getElementById("email-error").innerHTML = "";
                }, 2500);
                throw new Error('User already exists');
            }
            return response.json();
        })
        .then(function (user) {
            // Request was successful, handle response here
            //console.log(data);
            inputFirstname.value = "";
            inputLastname.value = "";
            inputEmail.value = "";
            inputPassword.value = "";

            let userTable = document.getElementById("userTable");
            userTable.innerHTML += `
            <tr id=user-${user.id}>
                <th scope="row">${user.id}</th>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
                <td>
                <button type="button" class="btn btn-danger" id="btnSubmit" onclick="deleteUser(${user.id})">Delete</button>
                </td>
                <td>
                <button type="button" class="btn btn-success" id="btnEdit" onclick="openEditUserModal(${user.id})">Edit</button>
                </td>
            </tr>`;

            let modal = bootstrap.Modal.getInstance(document.getElementById("addUserModal"));
            modal.hide();
        })
        .catch(function (error) {
            // Handle errors here
            console.error("Fetch error:", error);
        });
    }
}


const showUsers = () => {
    productContainer.style.display = "none";
    ordersContainer.style.display = "none";
    document.getElementById("userContainer").style.display = "block";

    document.getElementById("linkUsers").classList.add("active")
    document.getElementById("linkProducts").classList.remove("active")
    document.getElementById("linkOrders").classList.remove("active")
}

const showProducts = () => {
    document.getElementById("userContainer").style.display = "none";
    document.getElementById("productContainer").style.display = "block";
    document.getElementById("ordersContainer").style.display = "none";
    
    document.getElementById("linkUsers").classList.remove("active")
    document.getElementById("linkOrders").classList.remove("active")
    document.getElementById("linkProducts").classList.add("active")
}

const showOrders = () => {
    document.getElementById("userContainer").style.display = "none";
    document.getElementById("productContainer").style.display = "none";
    document.getElementById("ordersContainer").style.display = "block";
    document.getElementById("linkUsers").classList.remove("active")
    document.getElementById("linkProducts").classList.remove("active")
    document.getElementById("linkOrders").classList.add("active")
}


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