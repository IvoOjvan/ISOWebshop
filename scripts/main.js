let cart = []
let cartTotal = 0.0;

const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');

const cartModal = document.getElementById("cartModal");
const cartContent = document.getElementById("cartContent");

let getCartSize = () => {
    const cartSize = cart.reduce((size, item) => size + item.amount, 0);
    return cartSize;
}

window.onload = () => {
    if(localStorage.getItem('user')){
        
        let currentUser = JSON.parse(localStorage.getItem('user'));

        if(localStorage.getItem('cart-'+currentUser.id)){
            console.log(cart);
            cart = JSON.parse(localStorage.getItem('cart-'+currentUser.id));

            if(cart.length > 0){
                // Testiranje
                //cartBadge.innerHTML = cart.length;
                cartBadge.innerHTML = getCartSize(); 
            }
           

            cart.forEach(item => {
                cartTotal += item.price * item.amount;
            })

            //document.getElementById("cartTotalTd");

        }
       
       

        let userDiv = document.getElementById("currentUser");
        userDiv.innerHTML = `${currentUser.lastname} ${currentUser.firstname}`

        let productsContainer = document.getElementById('products');

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
                    //let imageSrc = "../images/"+product.name.toLowerCase().replace(" ", "_")+".jpg";
                    let imageSrc = "../images/"+product.name.toLowerCase().replace(/ /g, '_')+".jpg";
                   
                    /*
                    productsContainer.innerHTML += `
                    <div class="col-md-2 mb-4">
                        <div class="card" style="width:90%;">
                            <img src="${imageSrc}" class="card-img-top" alt="...">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h5 class="card-title text-center">${product.name}</h5>
                                <p class="card-text text-center">${product.price}$</p>
                                <button type="button" id="btnAddToCart" class="btn btn-primary" onclick="addToCart(${product.id})">Add to cart</button>
                            </div>
                        </div>
                    </div>`;*/


                    
                    productsContainer.innerHTML += `
                    <div class='col-md-3 mb-4'>
                    <div class="card" style="width:90%;">
                        <div class="position-relative">
                            <img src="${imageSrc}" class="card-img-top" alt="Product Image">
                            <div class="card-description">
                                <h4 class="me-2 ms-3">
                                    ${product.description}
                                </h4>
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title text-center">Product Name</h5>
                            <p class="card-text text-center">${product.price}$</p>
                            <button type="button" id="btnAddToCart" class="btn btn-primary" onclick="addToCart(${product.id})">Add to cart</button>
                        </div>
                    </div>
                </div>

                    `
                    
                })
            })
            .catch(function (error) {
                // Handle errors here
                console.error("Fetch error:", error);
            });
    } else {
        window.location.href = "http://127.0.0.1:5500/Pages/login.html";
    }
}

const addToCart = (itemId) => {
    fetch("http://localhost:8080/products/product/"+itemId, {
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
    .then(function(data){
        if(cart.some(item => item.id === data.id)){
            let itemIndex = cart.findIndex(item => item.id === data.id);
            cart[itemIndex].amount++;

            cartTotal += data.price;

            // cartBadge.innerHTML = cart.length;
            cartBadge.innerHTML = getCartSize()
    
            document.getElementById('cartTotalTd').innerHTML = `${cartTotal} $`;

            let itemRow = document.getElementById("item-"+data.id);
            itemRow.innerHTML = `
                <td>${data.name}</td>
                <td>${data.price} $</td>
                <td>${cart[itemIndex].amount}</td>
                <td>${data.price * cart[itemIndex].amount} $</td>
                <td>
                    <button type="button" class="btn btn-success" onclick="addToCart(${data.id})">Add</button>
                </td>
                <td>
                    <button "type="button" class="btn btn-danger" onclick="removeFromCart(${data.id})">Remove</button>
                </td>
            `;
           
            console.log(cartTotal);
            console.log(cart);
        }else{
            cart.push({ ...data,amount: 1})
            cartTotal += data.price;

            // cartBadge.innerHTML = cart.length;
            cartBadge.innerHTML = getCartSize()
    
            document.getElementById('cartTotalTd').innerHTML = `${cartTotal} $`;
        }
        /*
        cartTotal += data.price;

        // cartBadge.innerHTML = cart.length;
        cartBadge.innerHTML = getCartSize()

        document.getElementById('cartTotalTd').innerHTML = `${cartTotal} $`;
        console.log(cartTotal);
        console.log(cart);*/
    })
    .catch(function (error) {
        // Handle errors here
        console.error("Fetch error:", error);
    });
}

const removeFromCart = (itemId) => {
    let itemIndex = cart.findIndex(item => item.id === itemId);
    if(cart[itemIndex].amount > 1){
        cart[itemIndex].amount--;
        cartTotal -= cart[itemIndex].price;
        document.getElementById('cartTotalTd').innerHTML = `${cartTotal}`;
        let itemRow = document.getElementById("item-"+itemId);
            itemRow.innerHTML = `
                <td>${cart[itemIndex].name}</td>
                <td>${cart[itemIndex].price} $</td>
                <td>${cart[itemIndex].amount}</td>
                <td>${cart[itemIndex].price * cart[itemIndex].amount} $</td>
                <td>
                    <button type="button" class="btn btn-success" onclick="addToCart(${cart[itemIndex].id})">Add</button>
                </td>
                <td>
                    <button "type="button" class="btn btn-danger" onclick="removeFromCart(${cart[itemIndex].id})">Remove</button>
                </td>
            `;
    }else{
        cartTotal -= cart[itemIndex].price;
        document.getElementById('cartTotalTd').innerHTML = `${cartTotal} $`;

        document.getElementById(`item-${itemId}`).remove();
        cart.splice(itemIndex, 1);
        
        console.log(cart);
        console.log(cartTotal);

       // cartBadge.innerHTML = cart.length;
       cartBadge.innerHTML = getCartSize()
    }
    if(cart.length == 0){
        cartContent.innerHTML = "Cart is empty";
        btnGoToCheckout.disabled = true;
    }
    cartBadge.innerHTML = getCartSize()
}

const showCart = () => {
    let modal = new bootstrap.Modal(cartModal);
    
    if(cart.length == 0){
        cartContent.innerHTML = "Cart is empty!";
        btnGoToCheckout.disabled = true;
    } else {
        btnGoToCheckout.disabled = false;
    
        cartContent.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Sum</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="cartTable">`;

        let cartTable = document.getElementById("cartTable");
        cart.forEach(item => {
            cartTable.innerHTML += `
                    <tr id="item-${item.id}">
                        <td>${item.name}</td>
                        <td>${item.price} $</td>
                        <td>${item.amount}</td>
                        <td>${item.price * item.amount} $</td>
                        <td>
                            <button type="button" class="btn btn-success" onclick="addToCart(${item.id})">Add</button>
                        </td>
                        <td>
                            <button "type="button" class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                        </td>
                    </tr>`;
        })

        cartTable.innerHTML += `
            <tr>
                <td colspan="3">Total</td>
                <td id="cartTotalTd">${cartTotal} $</td>
            </tr>`;

        cartContent.innerHTML += `
                </tbody>
            </table>
        `;
    }
    modal.show();
}


const logOut = () => {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('cart-'+currentUser.id, JSON.stringify(cart));
    localStorage.removeItem('user');
 
    window.location.href = "http://127.0.0.1:5500/Pages/login.html"
}

let checkoutFirstname = document.getElementById('firstName');
let checkoutLastname = document.getElementById('lastName');
let checkoutEmail = document.getElementById('email');
let checokoutAddress = document.getElementById('street');
let checkoutCity = document.getElementById('city');
let checkoutState = document.getElementById('state');
let checkoutPostalCode = document.getElementById('postalCode');
let ccNumber = document.getElementById('ccNumber');
let ccExpiration = document.getElementById('ccExpiration');
let cvv = document.getElementById('cvv');
let btnPay = document.getElementById('btnPay');
let btnGoToCheckout = document.getElementById('btnGoToCheckout');

const goToCheckout = () => {
    if(cart.length > 0) {
        
        let modal = new bootstrap.Modal(document.getElementById('checkoutModal'))
        let crtModal = bootstrap.Modal.getInstance(cartModal);

        let checkoutForm = document.getElementById('checkout-form');
        let cartDescription = document.getElementById('cart-description');

        checkoutForm.style.display = "none";
        cartDescription.style.display = "block";

    
        cartDescription.innerHTML = `
            <div class="row mb-3">
                <div class="col-md-2">
                    Item
                </div>
                <div class="col-md-4">
                    Description
                </div>
                <div class="col-md-2">
                    Price
                </div>
                <div class="col-md-2">
                    Amount
                </div>
                <div class="col-md-2">
                    Subtotal
                </div>
            </div>`;

        cart.forEach( product => {
            console.log(product)
            cartDescription.innerHTML += `
                <div class="row mb-3">
                    <div class="col-md-2">
                        ${product.name}
                    </div>
                    <div class="col-md-4">
                        ${product.description}
                    </div>
                    <div class="col-md-2">
                        ${product.price} $
                    </div>
                    <div class="col-md-2">
                        ${product.amount}
                    </div>
                    <div class="col-md-2">
                        ${product.price * product.amount} $
                    </div>
                </div>`;
        })

        cartDescription.innerHTML += `
            <div class="row mb-3">
                <div class="col-10">
                    
                </div>
                <div class="col">
                ${cartTotal} $
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <button type="button" class="btn btn-success" onclick="showCheckoutForm()">Next</button>
                </div>
            </div>`;

        let currentUser = JSON.parse(localStorage.getItem('user'));

        checkoutFirstname.value = currentUser.firstname;
        checkoutLastname.value = currentUser.lastname;
        checkoutEmail.value = currentUser.email;

        checokoutAddress.value = "";
        checkoutCity.value = "";
        checkoutState.value = "";
        checkoutPostalCode.value = "";
        ccNumber.value = "";
        ccExpiration.value = "";
        cvv.value = "";


        crtModal.hide();
        modal.show();
    } else {
        btnGoToCheckout.disabled = true;
    }
}

const formatCardNumber = (input) => {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');

    // Split the digits into batches of 4 and join them with spaces
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Set the formatted value back to the input
    input.value = value;
}

const formatExpirationDate = (input) => {
    // Remove all non-digit characters except for the slash
    let value = input.value.replace(/[^\d\/]/g, '');
      
    // Add the slash after the month (second character)
    if (value.length >= 2 && value.indexOf('/') === -1) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    // Ensure the value doesn't exceed the MM/YY format
    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    // Validate the month part
    const parts = value.split('/');
    if (parts[0] && (parts[0].length == 2)) {
      const month = parseInt(parts[0], 10);
      if (month < 1 || month > 12) {
        value = '';
      }
    }
    
    // Set the formatted value back to the input
    input.value = value;
}

const enforceNumericInput = (event) => {
    const input = event.target;
    input.value = input.value.replace(/[^\d\s]/g, '')
}

const showCheckoutForm = () => {
    let checkoutForm = document.getElementById('checkout-form');
    let cartDescription = document.getElementById('cart-description');
    checkoutForm.style.display = "block";
    cartDescription.style.display = "none";
}

window.onbeforeunload = () => {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('cart-'+currentUser.id, JSON.stringify(cart));
}

const createOrder = () => {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    let userID = currentUser.id;

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const year = today.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    let description = "";

    cart.forEach(product => {
        description += `${product.name} ${product.price}$ x${product.amount},\n`;
    })

    //let total = cartTotal;

    let order = {
        userId: userID,
        date: formattedDate,
        description: description,
        total: cartTotal
    }

    console.log(order);

    fetch("http://localhost:8080/orders/create/0", {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create order');
        }
        return response.json();
    })
    .then(function(data){
        cart = []
        localStorage.setItem('cart', cart);
        cartTotal = 0.0;
        cartBadge.innerHTML = '0';
        window.location.href = "http://127.0.0.1:5500/Pages/main.html"
    })
    .catch(function (error) {
        // Handle errors here
        console.error("Fetch error:", error);
    });
    
}

let ordersContainer = document.getElementById('orders');
let productsContainer = document.getElementById('products');
let linkOrders = document.getElementById('linkOrders');
let linkProducts = document.getElementById('linkProducts');

const showOrders = () => {
    productsContainer.style.display = "none";
    linkProducts.classList.remove('active');

    ordersContainer.style.display = "block";
    linkOrders.classList.add('active');
    ordersContainer.innerHTML = "";

    let currentUser = JSON.parse(localStorage.getItem('user'));
    let userID = currentUser.id;

    fetch(`http://localhost:8080/orders/user/${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed fetech orders');
        }
        return response.json();
    })
    .then(function(orders){
        orders.forEach(order => {
            ordersContainer.innerHTML += `
                <div class="row mb-3">
                    <div class="col">
                        <div class="card">
                            <div class="card-header">
                                Date: ${order.date}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"> Order ${order.id}</h5>
                                <p class="card-text">
                                    ${order.description}
                                </p>
                                <p class="card-text">
                                   Total: ${order.total} $
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            `;
        })
    })
    .catch(function (error) {
        // Handle errors here
        console.error("Fetch error:", error);
    });
}

const showProducts = () => {
    productsContainer.style.display = "flex";
    linkProducts.classList.add('active');

    ordersContainer.style.display= "none";
    linkOrders.classList.remove('active');
}