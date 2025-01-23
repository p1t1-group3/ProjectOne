// Retrieve the orders from localStorage or initialize a new array
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Retrieve the order from localStorage or initialize a new order object
let order = JSON.parse(localStorage.getItem('order')) || {
    items: [],
    itemTotal: 0,    
    tax: 0,
    total: 0
};

let Products = [
            {
                imgUrl: 'https://images.pexels.com/photos/8165239/pexels-photo-8165239.jpeg',
                title: 'Cheese',
                quantity: 1,
                price: 25.00
            },
            {
                imgUrl:'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                title:'Pepperoni',
                quantity: 1,
                price:  28.00
            },
            {
                imgUrl: 'https://images.pexels.com/photos/2471171/pexels-photo-2471171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                title: 'Margarita',
                quantity: 1,
                price: 28.00
            },
            {
                imgUrl: 'https://media.istockphoto.com/id/1330984367/photo/soft-and-chewy-parmesan-garlic-knots.jpg?s=2048x2048&w=is&k=20&c=0n_Pdiz__d98DfcVe45fWAgrE3IPwIFs2o7vCcnDSNk=',
                title:'Knots',
                quantity: 1,
                price: 15.00
            },
            {
                imgUrl: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg',
                title:'Drink',
                quantity: 1,
                price: 8.00
            }
            ];


if(document.readystate == 'loading'){
    document.addEventListener('DOMContentloaded',ready)
} else {    
    ready();
    renderProducts();
    renderOrder();
}

function renderProducts () {   

    const productsDiv = document.querySelector(".products");
    
    if (!productsDiv) {
        console.error("productsDiv is null");
        return;
    }

    Products.forEach(function(product, index) {

        productHtml = `<div id="product${index}" class="col product">
        <span class="productTitle" >${product.title}</span>
        <img class="productImg" src="${product.imgUrl}">
        <div class="productDetails">
            <Span class="productPrice">$${product.price}.00</Span><br>
            <button data-index="${index}" class="btn btn-secondary productbutton">Order</button>
        </div>
    </div>`
        productsDiv.innerHTML+= productHtml;
    })

    productsDiv.addEventListener("click", addToOrder)
}



function renderOrder () {
    
    const orderItemsElement = document.querySelector(".orderItems");
    orderItemsElement.innerHTML = "";
    order.items.forEach(function(item) {
        let orderItemElement = createOrderItemElement(item.title, item.price, item.imgUrl, item.quantity);
        orderItemsElement.appendChild(orderItemElement)
    })
    document.querySelector('.orderTotalPrice').textContent = `$${(order.total).toFixed(2)}`
    document.querySelector('.orderTax').textContent = `$${(order.tax).toFixed(2)}`
}

function ready() {
    
    let removeOrderItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeOrderItemButtons.length; i++) {
        let button = removeOrderItemButtons[i]
        button.addEventListener('click',removeOrderItem)
    }

    let quantityInputs = document.getElementsByClassName('orderQuantityInput')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }

    let addToOrderButtons = document.getElementsByClassName('product')
    for (let i = 0; i < addToOrderButtons.length; i++){
        let button = addToOrderButtons[i] 
        button.addEventListener('click',addToOrderClicked)
    }

    document.getElementsByClassName('check')[0].addEventListener('click',checkoutClicked);
    
}



function checkoutClicked(event) {
    // Assign an order number
    order.orderNumber = orders.length + 1;

    // Save the current order to the orders array in localStorage
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Reset the order object for a new order
    order = {
        items: [],
        itemTotal: 0,
        tax: 0,
        total: 0
    };

    // Save the new order to localStorage
    localStorage.setItem('order', JSON.stringify(order));

    // Clear the order items from the UI
    let orderItems = document.getElementsByClassName('orderItems')[0];
    while (orderItems.hasChildNodes()) {
        orderItems.removeChild(orderItems.firstChild);
    }

    // Update the UI
    calculateTotalsTaxes();
    renderOrder();
}

function removeOrderItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    calculateTotalsTaxes();
}

function removeOrderItem(event){
    let buttonClicked = event.target
    let orderRow = buttonClicked.closest('.orderRow');
    let title = orderRow.querySelector('.orderItemTitle').textContent;
    
    // Remove the item from the order.items array
    order.items = order.items.filter(item => item.title !== title);

    // Update the localStorage
    localStorage.setItem('order', JSON.stringify(order));
    
    // Remove the item from the UI
    orderRow.remove();

    // Recalculate totals and update the UI
    calculateTotalsTaxes();
    renderOrder();
}
    
function quantityChanged(event) {
    
    let input = event.target
    
    if ( isNaN (input.value) || input.value <= 0) {
        input.value = 1
    } else {
        order.items[0].quantity = input.value;
        
    }

    calculateTotalsTaxes()
 }

function addToOrder(event){
    
    if (event.target.matches("button")) {
        const productIndex = event.target.dataset.index;
        
        const product = Products[productIndex];
        

        if (order.items.some(function(item) {
            return item.title == product.title;
        })) {
             // update quantity
             const sameItem = order.items.find(function(item) {
                return item.title == product.title;
            });
            sameItem.quantity++;
        } else {
            // add to order
            const newItem = {
                title: product.title,
                price: product.price,
                quantity: 1,
                imgUrl: product.imgUrl
            }
            order.items.push(newItem)
        }
        // save to local storage
        calculateTotalsTaxes();
        renderOrder();
    }
}

function calculateTotalsTaxes() {
    // Calculate the item total
    
    let itemTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Calculate tax (10%)
    let tax = itemTotal * 0.10;
    
    // Calculate total
    let total = itemTotal + tax;
    
    // Update the order object
    order.itemTotal = itemTotal;
    order.tax = tax;
    
    order.total = total;
    
    // Save the updated order to localStorage
    localStorage.setItem('order', JSON.stringify(order));
    
    // Update the UI
    document.querySelector('.orderTotalPrice').textContent = `$${total.toFixed(2)}`;
    document.querySelector('.orderTax').textContent = `$${tax.toFixed(2)}`;
    
}

// Call the function to ensure the calculations are done
calculateTotalsTaxes();
calculateTotalsTaxes()
function createOrderItemElement(title, price, imgUrl, quantity) {
    let itemRow = document.createElement('div')
    itemRow.classList.add('orderRow')
    let orderItems = document.getElementsByClassName('orderItems')[0]
    let orderItemNames = orderItems.getElementsByClassName('orderItemTitle')
    let orderRowContents = `
                <div class="orderItem orderColumn">
                    <img class="orderItemImg" src="${imgUrl}" width="50" height="50">
                    <span class="orderItemTitle">${title}</span>
                </div>
                    <span class="itemPrice orderColumn">$${price}.00</span>
                <div class="orderQuantity orderColumn">
                    <input class="orderQuantityInput" type="number" value="${quantity}">
                    <button class="btn-danger" type="button">🛇</button>
                </div>`       
    itemRow.innerHTML = orderRowContents
    // orderItems.append(orderRow)
    itemRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeOrderItem)
    itemRow.getElementsByClassName('orderQuantityInput')[0].addEventListener('change', quantityChanged)
    return itemRow;
}


